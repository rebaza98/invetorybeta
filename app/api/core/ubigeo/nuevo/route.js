import { connectToDB } from "@/utils/databse"
import Ubigeo from "@/models/core/ubigeo"

//import Prompt from "@models/prompt"

export const POST = async (req, res) => {
    const { ubigeoInei, ubigeoReniec} = await req.json()
    
    try {
        await connectToDB()
        const newUbigeo = new Ubigeo({ ubigeoInei, ubigeoReniec });
        
        await newUbigeo.save()
        return new Response(JSON.stringify(newUbigeo), { status: 201 })
    } catch (error) {
        console.log("ERROR=", error)
        return new Response("Failed to craete new Ubigeo", { status: 500 })
    }

}