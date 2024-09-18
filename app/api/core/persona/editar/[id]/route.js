import { connectToDB } from "@/utils/databse"
import Persona from "@/models/core/persona"

export const PATCH = async (request, { params }) => {
    const { 
        id,
        razonSocial,
        representante,
        numeroDoc,
        docId,
        email,
        ubigeo,
        telefono,
        direccion,
        cuentas,
        mkp,
        imagenUrl,  
    } = await request.json()
  try {
      await connectToDB()
      const existingPersona = await Persona.findById(id)
      if(!existingPersona) return new Response("Persona not found", {status:404})
      existingPersona.razonSocial =  razonSocial
      existingPersona.representante = representante
      existingPersona.numeroDoc =  numeroDoc
      existingPersona.docId = docId
      existingPersona.email = email
      existingPersona.ubigeo = ubigeo
      existingPersona.telefono = telefono
      existingPersona.direccion = direccion
      existingPersona.cuentas = cuentas
      existingPersona.mkp = mkp
      existingPersona.imagenUrl = imagenUrl
      await existingPersona.save()
      return new Response(JSON.stringify(existingPersona), {status: 200})

  } catch (error) {
      return new Response("Fail to retrieve Persona", {status: 500})
  }
}



// //DELETE

// export const DELETE = async (request, {params}) => {

//     try {
//         await connectToDB()

//         await Prompt.findByIdAndRemove(params.id)
//         return new Response("Prompt Deleted", {status: 200})    
//     } catch (error) {
//         return new Response("Failed to delete prompt", {status: 500})
        
//     }

    
// }