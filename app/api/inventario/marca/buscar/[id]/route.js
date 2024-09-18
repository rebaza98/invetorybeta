import { connectToDB } from "@/utils/databse"
import Marca from "@/models/inventario/marca"


export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const marcaUnica = await Marca.findOne({ _id: params.id });
      return new Response(JSON.stringify(marcaUnica), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch marcaUnica", { status: 500 })
  }
} 

