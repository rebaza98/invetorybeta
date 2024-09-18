
import Ubigeo from "@/public/static/ubigeo"

export const GET = async (request) => {
    try {

        const ubigeos = Ubigeo()

        return new Response(JSON.stringify(ubigeos), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all ubigeos", { status: 500 })
    }
} 
