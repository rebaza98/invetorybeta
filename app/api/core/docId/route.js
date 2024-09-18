
import DocId from "@/public/static/documentoIdentidad"

export const GET = async (request) => {
    try {

        const documentos = DocId()

        return new Response(JSON.stringify(documentos), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all documentos", { status: 500 })
    }
} 
