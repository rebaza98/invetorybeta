import { connectToDB } from "@/utils/databse"
import ItemInventario from "@/models/inventario/itemInventario"
import Producto from "@/models/inventario/producto"


export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const itemsInventarioMovimientoAlmacenEntrada = await ItemInventario.find(
        {
          "movimientoAlmacenEntrada.movimientoAlmacenEntradaId": params.id
        }).
        
        populate('producto.productoRef').
        sort({ createdAt: -1 }).
        exec();
        ;
      return new Response(JSON.stringify(itemsInventarioMovimientoAlmacenEntrada), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch itemsInventarioMovimientoAlmacenEntrada", { status: 500 })
  }
} 

