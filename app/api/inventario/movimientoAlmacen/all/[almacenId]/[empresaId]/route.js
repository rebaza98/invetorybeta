import { connectToDB } from "@/utils/databse"
import OrdenCompra from "@/models/compras/ordenCompra";
import MovimientoAlmacen from "@/models/inventario/movimientoAlmacen";
//import Producto from "@/models/inventario/producto";

export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        const movimientosAlmacen = await MovimientoAlmacen.find({'empresa.empresaRef': params.empresaId})
            .sort({ createdAt: -1 })
            .exec();

        return new Response(JSON.stringify(movimientosAlmacen), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch all movimientosAlmacen", { status: 500 })
    }
} 
