import { connectToDB } from "@/utils/databse"
import Especificacion from "@/models/inventario/especificacion"

export const PATCH = async (request, { params }) => {
    const { 
        id,
        nombreEspecificacion,
        desc,
    } = await request.json()
  try {
      await connectToDB()
      const existingEspec = await Especificacion.findById(id)
      if(!existingEspec) return new Response("Espec not found", {status:404})
      existingEspec.nombreEspecificacion = nombreEspecificacion
      existingEspec.desc = desc
      await existingEspec.save()
      return new Response(JSON.stringify(existingEspec), {status: 200})

  } catch (error) {
      return new Response("Fail to retrieve Especs", {status: 500})
  }
}

