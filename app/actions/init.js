'use server'
import Usuario from "@/models/core/usuario"
import { connectToDB } from "@/utils/databse"
import { redirect } from "next/navigation" 
import bcrypt from 'bcrypt'

export const initMaster = async (formData) => {
    console.log("SERVER ONLY")
    const token = formData.get('inputToken')
    let state = 0

    if (token == process.env.MASTER_PASSWORD){
        try {
            await connectToDB()
        
            const usuarios = await Usuario.find({})
              .sort({ createdAt: -1 })
              .exec();
        
            state = usuarios.length
            console.log("state = ", state)
            if (state == 0){
                const masterUser = process.env.MASTER_USER
                const masterMail = process.env.MASTER_EMAIL
                const masterPass = await bcrypt.hash(process.env.MASTER_PASSWORD, 10)  
                const masterROle = process.env.MASTER_ROLE
                const newUsuario = new Usuario({ user: masterUser, password: masterPass,nombre: masterUser, apellidoPaterno: masterUser, apellidoMaterno: masterUser, role: masterROle, email: masterMail });
                const savedUsuario = await newUsuario.save(); // Guardar y obtener el objeto guardado
            }else{
              console.log("Ya existe Usuario Master")
            }
            
        
          } catch (error) {
          }
        
    }

    



    redirect('/')
    
}