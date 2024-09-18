import Comprobante from "@/public/static/comprobante"

export const GET = async (request) => {
    try {

        const comprobantes = Comprobante()

        return new Response(JSON.stringify(comprobantes), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all comprobantes", { status: 500 })
    }
} 
