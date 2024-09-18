import { connectToDB } from "@/utils/databse"
import Ubigeo from "@/models/core/ubigeo";

export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const ubigeoUnico = await Ubigeo.findOne({ ubigeoInei: params.ubigeoInei });

      return new Response(JSON.stringify(ubigeoUnico), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch ubigeoUnico", { status: 500 })
  }
} 

