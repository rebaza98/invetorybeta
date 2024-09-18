import { connectToDB } from "@/utils/databse"
import Categoria from "@/models/inventario/categoria"

export const PATCH = async (request, { params }) => {
    const { 
        id,
        nombreCategoria,
        desc,
        especs,
        imagenUrl,
    } = await request.json()
  try {
      await connectToDB()
      const existingCategoria = await Categoria.findById(id)
      if(!existingCategoria) return new Response("Categoria not found", {status:404})
      existingCategoria.nombreCategoria = nombreCategoria
      existingCategoria.desc = desc
      existingCategoria.especs = especs
      existingCategoria.imagenUrl = imagenUrl
      await existingCategoria.save()
      return new Response(JSON.stringify(existingCategoria), {status: 200})

  } catch (error) {
      return new Response("Fail to retrieve Categoria", {status: 500})
  }
}

