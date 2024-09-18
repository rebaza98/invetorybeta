import { connectToDB } from "@/utils/databse"
import OrdenCompra from "@/models/compras/ordenCompra";
//import Producto from "@/models/inventario/producto";

export const GET = async (request) => {
    console.log("THIS IS ")
    try {
        await connectToDB()

        const ocs = await OrdenCompra.find({})
            .sort({ createdAt: -1 })
            .exec();

        return new Response(JSON.stringify(ocs), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch all ocs", { status: 500 })
    }
} 
