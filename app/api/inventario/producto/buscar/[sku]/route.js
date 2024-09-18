import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto"


export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const productoUnico = await Producto.findOne({ sku: params.sku });
      return new Response(JSON.stringify(productoUnico), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch productoUnico", { status: 500 })
  }
} 

