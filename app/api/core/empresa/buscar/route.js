import { connectToDB } from "@/utils/databse"
import Empresa from "@/models/core/empresa";

export const GET = async (req, context) => {

  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');

      if (q) {

        const empresas = await Empresa.find({
          $or: [
            { numeroDoc: { $regex: q, $options: "i" } },
            { razonSocial: { $regex: q, $options: "i" } }
          ]
        });
        
        return new Response(JSON.stringify(empresas), { status: 200 });
        
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


