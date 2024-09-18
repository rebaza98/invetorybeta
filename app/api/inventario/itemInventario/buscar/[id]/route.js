import { connectToDB } from "@/utils/databse"
import ItemInventario from "@/models/inventario/itemInventario"


export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const itemInventarioUnico = await ItemInventario.findById(params.id);
      return new Response(JSON.stringify(itemInventarioUnico), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch itemInventarioUnico", { status: 500 })
  }
} 

