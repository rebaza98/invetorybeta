import { connectToDB } from "@/utils/databse"

import Almacen from "@/models/core/almacen"

export const GET = async (request) => {
    try {
        await connectToDB()

        const almacenes = await Almacen.find({})

        return new Response(JSON.stringify(almacenes), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all almacenes", { status: 500 })
    }
} 