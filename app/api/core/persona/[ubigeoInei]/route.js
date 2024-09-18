//import { connectToDB } from "@utils/databse"
import { connectToDB } from "@/utils/databse"
import Ubigeo from "@/models/core/ubigeo"


export const GET = async (request, context) => {

    const { ubigeoInei } = context.params

    try {
        await connectToDB()

        const ubigeo = await Ubigeo.findById(ubigeoInei)

        return new Response(JSON.stringify(ubigeo), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch this ubigeo", { status: 500 })
    }
} 