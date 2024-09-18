import { connectToDB } from "@/utils/databse"
import Marca from "@/models/inventario/marca";

export const GET = async (req, context) => {
  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');

      if (q !== null) {
        if (q === "") {
          // Si q es un espacio vacío, retorna todas las especificaciones
          const allMarca = await Marca.find({});
          return new Response(JSON.stringify(allMarca), { status: 200 });
        } else {
          // Buscar por nombre de especificación que coincide con q
          const marcas = await Marca.find({
            $or: [
              { nombreMarca: { $regex: q, $options: "i" } },
              { desc: { $regex: q, $options: "i" } }
            ]
          });
          
          return new Response(JSON.stringify(marcas), { status: 200 });
        }
      } else {
        return new Response("ERROR 400: Missing query parameter 'q'", {
          status: 400
        });
      }
    }

    return new Response("ERROR 405: Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Error fetching categorias:", error);
    return new Response("ERROR 500: Failed to fetch marcas", { status: 500 });
  }
};