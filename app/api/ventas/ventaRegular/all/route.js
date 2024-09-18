import { connectToDB } from "@/utils/databse"
import RegulacionSalida from "@/models/regulaciones/regulacionSalida";
import OrdenVentaRegular from "@/models/ventas/ordenVentaRegular";

export const GET = async (request) => {
    try {
        await connectToDB()

        const ordenesVentaRegular = await OrdenVentaRegular.find({})
            .sort({ createdAt: -1 })
            .exec();

        return new Response(JSON.stringify(ordenesVentaRegular), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch all ordenesVenta Regular", { status: 500 })
    }
} 
