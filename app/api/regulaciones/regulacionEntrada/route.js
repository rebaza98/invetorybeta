import { connectToDB } from "@/utils/databse"

import RegulacionEntrada from "@/models/regulaciones/regulacionEntrada"

export const GET = async (request) => {
    try {
        await connectToDB()

        const regulacionesEntrada = await RegulacionEntrada.find({})

        return new Response(JSON.stringify(regulacionesEntrada), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all REs", { status: 500 })
    }
} 
