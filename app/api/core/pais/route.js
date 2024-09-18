//import { connectToDB } from "@utils/databse"
import { connectToDB } from "@/utils/databse"
//import Pais from "@/models/core/pais"
//import Marca from "@/models/marca"
//import Producto from "@/models/producto"
//import Prompt from "@models/prompt"
import Pais from "@/public/static/pais"



export const GET = async (request) => {
    try {
        const paises = Pais()

        return new Response(JSON.stringify(paises), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all paises", { status: 500 })
    }
} 