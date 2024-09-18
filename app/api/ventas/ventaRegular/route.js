import { connectToDB } from "@/utils/databse"

import RegulacionSalida from "@/models/regulaciones/regulacionSalida"
export const GET = async (request) => {
    try {
        await connectToDB()

        const regulacionesSalida = await RegulacionSalida.find({})

        return new Response(JSON.stringify(regulacionesSalida), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all RSs", { status: 500 })
    }
} 
