import { connectToDB } from "@/utils/databse"
import Empresa from "@/models/core/empresa"

export const PATCH = async (request, { params }) => {
    const { 
        id,
        razonSocial,
        nombreComercial,
        representante,
        siglas,
        url1,
        url2,
        url3,
        url4,
        url5,
        numeroDoc,
        docId,
        email,
        ubigeo,
        telefono,
        direccion,
        cuentas,
        imagenUrl,  
    } = await request.json()
  try {
      await connectToDB()
      const existingEmpresa = await Empresa.findById(id)
      if(!existingEmpresa) return new Response("Empresa not found", {status:404})
      existingEmpresa.razonSocial =  razonSocial
      existingEmpresa.nombreComercial =  nombreComercial
      existingEmpresa.representante = representante
      existingEmpresa.siglas = siglas
      existingEmpresa.url1 = url1
      existingEmpresa.url2 = url2
      existingEmpresa.url3 = url3
      existingEmpresa.url4 = url4
      existingEmpresa.url5 = url5
      existingEmpresa.numeroDoc =  numeroDoc
      existingEmpresa.docId = docId
      existingEmpresa.email = email
      existingEmpresa.ubigeo = ubigeo
      existingEmpresa.telefono = telefono
      existingEmpresa.direccion = direccion
      existingEmpresa.cuentas = cuentas
      existingEmpresa.imagenUrl = imagenUrl
      await existingEmpresa.save()
      return new Response(JSON.stringify(existingEmpresa), {status: 200})

  } catch (error) {
      return new Response("Fail to retrieve Empresa", {status: 500})
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