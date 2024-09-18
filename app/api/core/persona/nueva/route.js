import { connectToDB } from "@/utils/databse"
import Persona from "@/models/core/persona"
import Contador from "@/models/core/contador"
//import { actualizaContador } from "@/utils/core/utils"

//import Prompt from "@models/prompt"

export const POST = async (req, res) => {
    console.log("THIS AAA1")
    const { razonSocial, representante, numeroDoc, docId, email, ubigeo, telefono, direccion, cuentas, mkp, imagenUrl} = await req.json()
    console.log("THIS AAA2")
    let nroPersona = undefined
    
    try {
        await connectToDB()
        if (!nroPersona) {
            const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorPersona: 1 } }, { new: true });
            console.log("THIS AAA3")
            if (!contador) {
            // Si no existe un documento de Contadores, créalo con valores iniciales
                const contador = await Contador.create({});
                nroPersona = 1;
                contador.contadorPersona = nroPersona
                contador.save()
            
            } else {
                nroPersona = contador.contadorPersona;
            }
            //nroPersona = await actualizaContador(Contador, "contadorPersona", "nroPersona")
        }
        console.log("THIS AAA4")
        const newPersona = new Persona({ razonSocial, representante, numeroDoc, docId, email, ubigeo, telefono, direccion, cuentas, mkp, imagenUrl, nroPersona });
        console.log("THIS AAA5")
        const savedPersona = await newPersona.save(); // Guardar y obtener el objeto guardado
        console.log("THIS AAA")
        return new Response(JSON.stringify(savedPersona), { status: 201 })
    } catch (error) {
        console.log("TRIGGERED CATCH API NUEVA")
        return new Response("Failed to craete new Persona", { status: 500 })
    }

}