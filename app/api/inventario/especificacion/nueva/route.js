import { connectToDB } from "@/utils/databse"
import Especificacion from "@/models/inventario/especificacion"

export const POST = async (req, res) => {
    const { nombreEspecificacion, desc } = await req.json()

    try {
        await connectToDB()
        const newEspec = new Especificacion({ nombreEspecificacion, desc });
        await newEspec.save()
        return new Response(JSON.stringify(newEspec), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new Espec", { status: 500 })
    }

}