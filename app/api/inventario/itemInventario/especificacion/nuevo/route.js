import { connectToDB } from "@/utils/databse"
//import Producto from "@/models/producto"
import Especificacion from "@/models/inventario/especificacion"

export const POST = async (req, res) => {
    const { nombreEspecificacion, desc } = await req.json()

    try {
        await connectToDB()
        const newEspecificacion = new Especificacion({ nombreEspecificacion: nombreEspecificacion, desc: desc });
        await newEspecificacion.save()

        return new Response(JSON.stringify(newEspecificacion), { status: 201 })
        
    } catch (error) {
        return new Response("Failed to craete new especificacion", { status: 500 })
    }

}