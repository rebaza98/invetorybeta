import { connectToDB } from "@/utils/databse"
import Categoria from "@/models/inventario/categoria"


export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const categoriaUnica = await Categoria.findOne({ _id: params.id });
      return new Response(JSON.stringify(categoriaUnica), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch categoriaUnica", { status: 500 })
  }
} 

