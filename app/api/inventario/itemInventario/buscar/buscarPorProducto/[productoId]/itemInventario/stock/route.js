import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto";
import ItemInventario from "@/models/inventario/itemInventario";

export const GET = async (req, { params }) => {

  const { productoId }  = params

  try {
    await connectToDB();
    console.log("PRODUCTO ID DE INVENTARIO = ", productoId)
    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');
      const isNumeric = !isNaN(parseFloat(q)) && isFinite(q);

      if (q !== null) {
        if (q === "") {
          // Si q es un espacio vacío, retorna todas las especificaciones
          const allProductos = await ItemInventario.find({
            "producto.productoId": productoId,
            // libre: true,
          });
          return new Response(JSON.stringify(allProductos), { status: 200 });
        } else {
          // Buscar por nombre de especificación que coincide con q
          const productos = await ItemInventario.find({
            $and: [
              { 
                'producto.productoId': productoId ,
                  // libre: true,
              }
            ],
            $or: [
              { nroItem: isNumeric ? Number(q) : null },
              { nroSerie: { $regex: q, $options: "i" } },
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