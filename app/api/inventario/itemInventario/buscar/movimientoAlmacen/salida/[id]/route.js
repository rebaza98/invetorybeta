import { connectToDB } from "@/utils/databse"
import ItemInventario from "@/models/inventario/itemInventario"
import Producto from "@/models/inventario/producto"


export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const itemsInventarioMovimientoAlmacenSalida = await ItemInventario.find(
        {
          "movimientoAlmacenSalida.movimientoAlmacenSalidaId": params.id
        }).
        
        populate('producto.productoRef').
        sort({ createdAt: -1 }).
        exec();
        ;
      return new Response(JSON.stringify(itemsInventarioMovimientoAlmacenSalida), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch itemsInventarioMovimientoAlmacenSalida", { status: 500 })
  }
} 

