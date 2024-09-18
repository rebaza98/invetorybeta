import { connectToDB } from "@/utils/databse"
import Categoria from "@/models/inventario/categoria";

export const GET = async (req, context) => {
  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');

      if (q !== null) {
        if (q === "") {
          // Si q es un espacio vacío, retorna todas las especificaciones
          const allcategoria = await Categoria.find({});
          return new Response(JSON.stringify(allcategoria), { status: 200 });
        } else {
          // Buscar por nombre de especificación que coincide con q
          const categorias = await Categoria.find({
            $or: [
              { nombreCategoria: { $regex: q, $options: "i" } },
              { desc: { $regex: q, $options: "i" } }
            ]
          });
          
          return new Response(JSON.stringify(categorias), { status: 200 });
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
    return new Response("ERROR 500: Failed to fetch categorias", { status: 500 });
  }
};