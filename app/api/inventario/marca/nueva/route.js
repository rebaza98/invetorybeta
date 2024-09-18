import { connectToDB } from "@/utils/databse"
import Contador from "@/models/core/contador"
import Marca from "@/models/inventario/marca"

export const POST = async (req, res) => {
    const { nombreMarca, desc, pais } = await req.json()

    try {
        await connectToDB()

        const newMarca = new Marca({ nombreMarca, pais, desc });
        
        await newMarca.save()
        return new Response(JSON.stringify(newMarca), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new marca", { status: 500 })
    }

}