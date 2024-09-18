//import { connectToDB } from "@utils/databse"
import { connectToDB } from "@/utils/databse"
import Especificacion from "@/models/inventario/especificacion"
//import Marca from "@/models/marca"
//import Producto from "@/models/producto"
//import Prompt from "@models/prompt"

export const GET = async (request) => {
    try {
        await connectToDB()

        const especificaciones = await Especificacion.find({})

        return new Response(JSON.stringify(especificaciones), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all especificaciones", { status: 500 })
    }
} 