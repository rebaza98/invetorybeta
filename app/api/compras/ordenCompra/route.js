import { connectToDB } from "@/utils/databse"
import OrdenCompra from "@/models/compras/ordenCompra"

export const GET = async (request) => {
    try {
        await connectToDB()

        const ordenesCompra = await OrdenCompra.find({})

        return new Response(JSON.stringify(ordenesCompra), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all ocs", { status: 500 })
    }
} 
