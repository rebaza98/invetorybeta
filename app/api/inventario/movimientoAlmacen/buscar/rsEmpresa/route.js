import { connectToDB } from "@/utils/databse"


import RegulacionSalida from "@/models/regulaciones/regulacionSalida";

export const GET = async (req, context) => {
  
  try {
    await connectToDB();
    
    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');
      const idEmpresa = queryParams.get('idempresa');
      const isNumeric = !isNaN(parseFloat(q)) && isFinite(q);

      if (q !== null) {
        if (q == " ") {
          // Si q es un espacio vacío, retorna todas las especificaciones
          const allRsNoIngresada = await RegulacionSalida.find({ 'empresa.empresaRef': idEmpresa, estado: "PENDIENTE",  ingresadoAlmacen: false }).sort({ createdAt: -1 })
          .exec();
          return new Response(JSON.stringify(allRsNoIngresada), { status: 200 });
        } else {
          // Buscar por nombre de especificación que coincide con q
          
          const rss = await RegulacionSalida.find({
            $and: [
              { 'empresa.empresaRef': idEmpresa }
            ],
            $or: [
              { regulacionSalidaEmpresa: isNumeric ? Number(q) : null },
              { obs: { $regex: q, $options: "i" } },
            ]
            
          }).sort({ createdAt: -1 })
          .exec();
          return new Response(JSON.stringify(rss), { status: 200 });
        }
      } else {
        return new Response("ERROR 400: Missing query parameter 'q'", {
          status: 400
        });
      }
    }

    return new Response("ERROR 405: Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Error fetching res:", error);
    return new Response("ERROR 500: Failed to fetch rss", { status: 500 });
  }
};