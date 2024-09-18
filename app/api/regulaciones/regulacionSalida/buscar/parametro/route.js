import { connectToDB } from "@/utils/databse"
import RegulacionSalida from "@/models/regulaciones/regulacionSalida";

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
          const regulacionesSalida = await RegulacionSalida.find({ [campo]: valor })
            .sort({ createdAt: -1 })
            .exec();
          return new Response(JSON.stringify(regulacionesSalida), { status: 200 })
        } catch (error) {
          return new Response("Failed to fetch regulacionesSalida", { status: 500 })
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
    console.error("Error fetching regulacionesEntrada:", error);
    return new Response("ERROR 500: Failed to fetch regulacionesSalida", { status: 500 });
  }
};


