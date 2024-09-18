import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto";

export const GET = async (req, context) => {
  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');

      if (q !== null) {
        if (q === "") {
          // Si q es un espacio vacío, retorna todas las especificaciones
          const allProductos = await Producto.find({});
          return new Response(JSON.stringify(allProductos), { status: 200 });
        } else {
          // Buscar por nombre de especificación que coincide con q
          const productos = await Producto.find({
            $or: [
              { nombreProducto: { $regex: q, $options: "i" } },
              { sku: { $regex: q, $options: "i" } },
              { modelo: { $regex: q, $options: "i" } },
              //{ 'skuEquivalentes.equivalente': { $regex: q, $options: "i" } },
              { 'skuEquivalentes.equivalente': { $eq: q } },
            ]
            
          });
          
          return new Response(JSON.stringify(productos), { status: 200 });
        }
      } else {
        return new Response("ERROR 400: Missing query parameter 'q'", {
          status: 400
        });
      }
    }

    return new Response("ERROR 405: Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Error fetching Productos:", error);
    return new Response("ERROR 500: Failed to fetch productos", { status: 500 });
  }
};