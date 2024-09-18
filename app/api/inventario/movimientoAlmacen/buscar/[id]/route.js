import { connectToDB } from "@/utils/databse"

import MovimientoAlmacen from "@/models/inventario/movimientoAlmacen";

export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const movAlmacenUnico = await MovimientoAlmacen.findById( params.id )
      return new Response(JSON.stringify(movAlmacenUnico), { status: 200 })
  } catch (error) {
      console.log(error)
      return new Response("Failed to fetch movAlmacenUnico", { status: 500 })
  }
} 

