import { connectToDB } from "@/utils/databse"
import Usuario from "@/models/core/usuario";


export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const usuarioUnico = await Usuario.findOne({ user: params.user });
      return new Response(JSON.stringify(usuarioUnico), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch usuarioUnico", { status: 500 })
  }
} 

