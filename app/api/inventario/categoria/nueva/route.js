import { connectToDB } from "@/utils/databse"
import Contador from "@/models/core/contador"
import Categoria from "@/models/inventario/categoria"

export const POST = async (req, res) => {
    const { nombreCategoria, desc, especs } = await req.json()
    let nroCategoria = undefined

    try {
        await connectToDB()
        if (!nroCategoria) {
            const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorCategoria: 1 } }, { new: true });
        
            if (!contador) {
            // Si no existe un documento de Contadores, créalo con valores iniciales
                const contador = await Contador.create({});
                nroCategoria = 1;
                contador.contadorCategoria = nroCategoria
                contador.save()
            
            } else {
                nroCategoria = contador.contadorCategoria;
            }
        }


        const newCategoria = new Categoria({ nombreCategoria, desc, especs, nroCategoria });
        
        await newCategoria.save()
        return new Response(JSON.stringify(newCategoria), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new categoria", { status: 500 })
    }

}