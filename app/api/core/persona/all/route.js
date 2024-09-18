import { connectToDB } from "@/utils/databse"

import Persona from "@/models/core/persona"

export const GET = async (request) => {
    try {
        await connectToDB()

        //const personas = await Persona.find({})
        const personas = await Persona.find({})
            .sort({ createdAt: -1 })
            .exec();

        return new Response(JSON.stringify(personas), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch all personas", { status: 500 })
    }
} 
