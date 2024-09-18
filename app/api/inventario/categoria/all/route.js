import { connectToDB } from "@/utils/databse"

import Categoria from "@/models/inventario/categoria"
export const GET = async (request) => {
    try {
        await connectToDB()

        const categorias = await Categoria.find({})
            .sort({ createdAt: -1 })
            .exec();

        return new Response(JSON.stringify(categorias), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch all categorias", { status: 500 })
    }
} 
