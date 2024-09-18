import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto";

export const GET = async (req, context) => {

  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const valor = queryParams.get('valor');
      const campo = queryParams.get('campo');

      if ((valor) && (campo)) {

        try {
          await connectToDB()
          const productos = await Producto.find({ [campo]: valor });
          return new Response(JSON.stringify(productos), { status: 200 })
        } catch (error) {
          return new Response("Failed to fetch producto", { status: 500 })
        }
      } else {
        console.log("Missing query parameter ");
        return new Response("ERROR 400: Missing query parameter", {
          status: 400
        });
      }
    }

    console.log("Method not allowed");
    return new Response("ERROR 405: Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Error fetching personas:", error);
    return new Response("ERROR 500: Failed to fetch productos", { status: 500 });
  }
};


