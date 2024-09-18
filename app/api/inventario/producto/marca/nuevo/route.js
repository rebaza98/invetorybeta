import { connectToDB } from "@/utils/databse"
//import Producto from "@/models/producto"
import Marca from "@/models/inventario/marca"

export const POST = async (req, res) => {
    const { nombreMarca, pais, desc } = await req.json()
    console.log("VALORES DE MARCA = ", nombreMarca, pais, desc)

    try {
        await connectToDB()
        const newMarca = new Marca({ nombreMarca: nombreMarca, pais: pais, desc: desc });
        
        await newMarca.save()
        return new Response(JSON.stringify(newMarca), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new marca", { status: 500 })
    }

}