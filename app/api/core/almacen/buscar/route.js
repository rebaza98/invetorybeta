import { connectToDB } from "@/utils/databse"
import Almacen from "@/models/core/almacen";

export const GET = async (req, context) => {
  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');

      if (q !== null) {
        if (q === "") {
          // Si q es un espacio vacío, retorna todas las especificaciones
          const allAlmacen = await Almacen.find({});
          return new Response(JSON.stringify(allAlmacen), { status: 200 });
        } else {
          // Buscar por nombre de especificación que coincide con q
          const almacenes = await Almacen.find({
            $or: [
              { alias: { $regex: q, $options: "i" } },
              //{ desc: { $regex: q, $options: "i" } }
            ]
          });
          
          return new Response(JSON.stringify(almacenes), { status: 200 });
        }
      } else {
        return new Response("ERROR 400: Missing query parameter 'q'", {
          status: 400
        });
      }
    }

    return new Response("ERROR 405: Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Error fetching almacenes:", error);
    return new Response("ERROR 500: Failed to fetch almacenes", { status: 500 });
  }
};