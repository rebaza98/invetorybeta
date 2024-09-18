import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto";

export const GET = async (req, context) => {
  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');

      if (q !== null) {
        const productos = await Producto.find({ modelo: q }); 
        return new Response(JSON.stringify(productos), { status: 200 });
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