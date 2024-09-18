import { connectToDB } from "@/utils/databse"
import ItemInventario from "@/models/inventario/itemInventario"
import Producto from "@/models/inventario/producto"


export const GET = async (request, { params }) => {
  try {
      await connectToDB()

      const itemsInventarioPorProducto = await ItemInventario.find({
        "producto.productoId" : params.productoId
      });
      
      return new Response(JSON.stringify(itemsInventarioPorProducto), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch itemsInventarioPorProducto", { status: 500 })
  }
} 

