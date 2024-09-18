import { connectToDB } from "@/utils/databse"
import Contador from "@/models/core/contador"
import Almacen from "@/models/core/almacen"

export const POST = async (req, res) => {
    const { 
        alias,
        encargado,
        email,
        prioridad,
        ubigeo,
        telefono,
        direccion,
    } = await req.json()
    let nroAlmacen = undefined

    try {
        await connectToDB()
        if (!nroAlmacen) {
            const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorAlmacen: 1 } }, { new: true });
        
            if (!contador) {
            // Si no existe un documento de Contadores, créalo con valores iniciales
                const contador = await Contador.create({});
                nroAlmacen = 1;
                contador.contadorAlmacen = nroAlmacen
                contador.save()
            
            } else {
                nroAlmacen = contador.contadorAlmacen;
            }
        }


        const newAlmacen = new Almacen({ alias, encargado, email, prioridad, ubigeo, telefono, direccion });
        
        await newAlmacen.save()
        return new Response(JSON.stringify(newAlmacen), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new almacen", { status: 500 })
    }

}