import { connectToDB } from "@/utils/databse"
import ItemInventario from "@/models/inventario/itemInventario";

export const GET = async (req, context) => {

  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      //const valor = queryParams.get('valor');
      //const campo = queryParams.get('campo');
      const productoId = queryParams.get('productoId');
      const empresaId = queryParams.get('empresaId');

      if ((productoId) && (empresaId)) {

        try {
          await connectToDB()
          const itemsInventario = await ItemInventario.find({ "empresa.empresaRef": empresaId, "producto.productoId": productoId, });
          return new Response(JSON.stringify(itemsInventario), { status: 200 })
        } catch (error) {
          return new Response("Failed to fetch itemsInventario", { status: 500 })
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

