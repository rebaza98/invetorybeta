import { connectToDB } from "@/utils/databse"
import Almacen from "@/models/core/almacen"


export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const almacenUnico = await Almacen.findOne({ _id: params.id });
      return new Response(JSON.stringify(almacenUnico), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch alamcenUnico", { status: 500 })
  }
} 

