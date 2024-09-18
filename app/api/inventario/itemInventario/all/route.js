import { connectToDB } from "@/utils/databse"
import ItemInventario from "@/models/inventario/itemInventario";

export const GET = async (request) => {
    try {
        await connectToDB()

        const itemsInventario = await ItemInventario.find({})
            .sort({ createdAt: -1 })
            .exec();

        return new Response(JSON.stringify(itemsInventario), { status: 200 })
        
    } catch (error) {
        return new Response("Failed to fetch all items Inventario", { status: 500 })
    }
} 
