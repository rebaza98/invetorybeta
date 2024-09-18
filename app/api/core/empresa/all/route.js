import { connectToDB } from "@/utils/databse"

//import Persona from "@/models/core/persona"
import Empresa from "@/models/core/empresa";

export const GET = async (request) => {
    try {
        await connectToDB()

        //const personas = await Persona.find({})
        const empresas = await Empresa.find({})
            .sort({ createdAt: -1 })
            .exec();

        return new Response(JSON.stringify(empresas), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch all Empresas", { status: 500 })
    }
} 
