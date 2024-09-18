import { connectToDB } from "@/utils/databse"

import Usuario from "@/models/core/usuario";

export const GET = async (request) => {
    try {
        await connectToDB()

        const usuarios = await Usuario.find({})
            .sort({ createdAt: -1 })
            .exec();

        return new Response(JSON.stringify(usuarios), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch all usuarios", { status: 500 })
    }
} 
