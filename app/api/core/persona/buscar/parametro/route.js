import { connectToDB } from "@/utils/databse"
import Persona from "@/models/core/persona";

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
          const personas = await Persona.find({ [campo]: valor });
          return new Response(JSON.stringify(personas), { status: 200 })
        } catch (error) {
          return new Response("Failed to fetch personas", { status: 500 })
        }
      } else {
        console.log("Missing query parameter 'q'");
        return new Response("ERROR 400: Missing query parameter 'q'", {
          status: 400
        });
      }
    }

    console.log("Method not allowed");
    return new Response("ERROR 405: Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Error fetching personas:", error);
    return new Response("ERROR 500: Failed to fetch personas", { status: 500 });
  }
};


