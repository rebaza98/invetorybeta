import { connectToDB } from "@/utils/databse"
import Almacen from "@/models/core/almacen"


export const PATCH = async (request, { params }) => {
    const { 
        id,
        alias,
        encargado,
        email,
        prioridad,
        ubigeo,
        telefono,
        direccion,
    } = await request.json()
  try {

    await connectToDB()
    const existingAlmacen = await Almacen.findById(id)
    if(!existingAlmacen) return new Response("Almacen not found", {status:404})
    existingAlmacen.alias = alias
    existingAlmacen.encargado = encargado
    existingAlmacen.email = email
    existingAlmacen.prioridad = prioridad
    existingAlmacen.ubigeo = ubigeo
    existingAlmacen.telefono = telefono
    existingAlmacen.direccion = direccion
    await existingAlmacen.save()
    return new Response(JSON.stringify(existingAlmacen), {status: 200})

  } catch (error) {
      return new Response("Fail to retrieve Almacen", {status: 500})
  }
}

