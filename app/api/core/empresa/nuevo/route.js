import { connectToDB } from "@/utils/databse"
import Empresa from "@/models/core/empresa"
import Contador from "@/models/core/contador"
//import { actualizaContador } from "@/utils/core/utils"

//import Prompt from "@models/prompt"

export const POST = async (req, res) => {
    const { razonSocial, nombreComercial, representante, siglas, url1, url2, url3, url4, url5, numeroDoc, docId, email, ubigeo, telefono, direccion, cuentas, imagenUrl} = await req.json()
    
    try {
        await connectToDB()
        const newEmpresa = new Empresa({ razonSocial, nombreComercial, representante, siglas, url1, url2, url3, url4, url5, numeroDoc, docId, email, ubigeo, telefono, direccion, cuentas, imagenUrl });
        const savedEmpresa = await newEmpresa.save(); // Guardar y obtener el objeto guardado
        
        return new Response(JSON.stringify(savedEmpresa), { status: 201 })
    } catch (error) {
        return new Response("Failed to craete new Empresa", { status: 500 })
    }

}