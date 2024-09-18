//import { connectToDB } from "@utils/databse"
import { connectToDB } from "@/utils/databse"
import Marca from "@/models/inventario/marca"
//import Producto from "@/models/producto"
//import Prompt from "@models/prompt"


// export async function GET(request, context) {
//     console.log("CONTEXT = ", context)
//   }

export const GET = async (request, context) => {

    const { id } = context.params

    try {
        await connectToDB()

        const marca = await Marca.findById(id)

        return new Response(JSON.stringify(marca), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch this marca", { status: 500 })
    }
} 