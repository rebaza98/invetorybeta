import { connectToDB } from "@/utils/databse"

import OrdenCompra from "@/models/compras/ordenCompra";

export const GET = async (req, context) => {
  
  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');
      const idEmpresa = queryParams.get('idempresa');
      const isNumeric = !isNaN(parseFloat(q)) && isFinite(q);

      if (q !== null) {
        if (q === "") {
          // Si q es un espacio vacío, retorna todas las especificaciones
          const allOcNoIngresada = await OrdenCompra.find({ 'empresa.empresaRef': idEmpresa, ingresadoAlmacen: false }).sort({ createdAt: -1 })
          .exec();
          return new Response(JSON.stringify(allOcNoIngresada), { status: 200 });
        } else {
          // Buscar por nombre de especificación que coincide con q
          const ocs = await OrdenCompra.find({
            $and: [
              { 'empresa.empresaRef': idEmpresa }
            ],
            $or: [
              //{ ocEmpresa: { $regex: q, $options: "i" } },
              { ocEmpresa: isNumeric ? Number(q) : null },
              //{ ocEmpresa: { $eq: Number(q) } },
              { "proveedor.razonSocial" : { $regex: q, $options: "i" } },
              { "proveedor.numeroDoc" : { $regex: q, $options: "i" } },
            ]
            
          }).sort({ createdAt: -1 })
          .exec();
          
          return new Response(JSON.stringify(ocs), { status: 200 });
        }
      } else {
        return new Response("ERROR 400: Missing query parameter 'q'", {
          status: 400
        });
      }
    }

    return new Response("ERROR 405: Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Error fetching ocs:", error);
    return new Response("ERROR 500: Failed to fetch ocs", { status: 500 });
  }
};