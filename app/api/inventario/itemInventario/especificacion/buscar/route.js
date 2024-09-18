import { connectToDB } from "@/utils/databse"
import Especificacion from "@/models/inventario/especificacion";


export const GET = async (req, context) => {
  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');

      if (q !== null) {
        if (q === "") {
          // Si q es un espacio vacío, retorna todas las especificaciones
          const allEspecs = await Especificacion.find({});
          return new Response(JSON.stringify(allEspecs), { status: 200 });
        } else {
          // Buscar por nombre de especificación que coincide con q
          const especs = await Especificacion.find({
            $or: [
              { nombreEspecificacion: { $regex: q, $options: "i" } }
            ]
          });
          
          return new Response(JSON.stringify(especs), { status: 200 });
        }
      } else {
        return new Response("ERROR 400: Missing query parameter 'q'", {
          status: 400
        });
      }
    }

    return new Response("ERROR 405: Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Error fetching especs:", error);
    return new Response("ERROR 500: Failed to fetch especs", { status: 500 });
  }
};