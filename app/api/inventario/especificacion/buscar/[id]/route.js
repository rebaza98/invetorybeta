
import { connectToDB } from "@/utils/databse"
import Especificacion from "@/models/inventario/especificacion"


export const GET = async (request, context) => {

    const { id } = context.params

    try {
        await connectToDB()

        const espec = await Especificacion.findById(id)

        return new Response(JSON.stringify(espec), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch this espec", { status: 500 })
    }
} 