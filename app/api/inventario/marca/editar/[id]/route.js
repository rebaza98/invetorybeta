import { connectToDB } from "@/utils/databse"
import Marca from "@/models/inventario/marca"

export const PATCH = async (request, { params }) => {
    const { 
        id,
        nombreMarca,
        pais,
        desc,
    } = await request.json()
  try {
      await connectToDB()
      console.log("LLEGAN DO ID = ", id)
      const existingMarca = await Marca.findById(id)
      console.log("EXISTING MARCA = ", existingMarca)
      if(!existingMarca) return new Response("Marca not found", {status:404})
      existingMarca.nombreMarca = nombreMarca
      existingMarca.pais = pais
      existingMarca.desc = desc
      await existingMarca.save()
      return new Response(JSON.stringify(existingMarca), {status: 200})

  } catch (error) {
      return new Response("Fail to retrieve Marca", {status: 500})
  }
}

