import { connectToDB } from "@/utils/databse"
import Especificacion from "@/models/inventario/especificacion"

export const GET = async (request) => {
    try {
        await connectToDB()

        const especs = await Especificacion.find({})
            .sort({ createdAt: -1 })
            .exec();

        return new Response(JSON.stringify(especs), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch all especs", { status: 500 })
    }
} 
