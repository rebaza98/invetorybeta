import { connectToDB } from "@/utils/databse"
import Marca from "@/models/inventario/marca"

export const GET = async (request) => {
    try {
        await connectToDB()

        const marcas = await Marca.find({})

        return new Response(JSON.stringify(marcas), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all marcas", { status: 500 })
    }
} 