import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto"

export const GET = async (request) => {
    try {
        await connectToDB()

        const productos = await Producto.find({})

        return new Response(JSON.stringify(productos), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all productos", { status: 500 })
    }
} 
