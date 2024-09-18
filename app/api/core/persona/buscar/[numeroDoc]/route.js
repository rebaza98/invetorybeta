import { connectToDB } from "@/utils/databse"
import Persona from "@/models/core/persona"

export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const personaUnica = await Persona.findOne({ numeroDoc: params.numeroDoc });
      return new Response(JSON.stringify(personaUnica), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch personaUnica", { status: 500 })
  }
} 

// export const PATCH = async (request, { params }) => {
//   const { prompt, tag } = await request.json()

//   try {
//       await connectToDB()

//       const existingPrompt = await Prompt.findById(params.id)

//       if(!existingPrompt) return new Response("Prompt not found", {status:404})

//       existingPrompt.prompt = prompt
//       existingPrompt.tag = tag

//       await existingPrompt.save()
//       return new Response(JSON.stringify(existingPrompt), {status: 200})

//   } catch (error) {
//       return new Response("Fail to retrieve Prompt", {status: 500})
//   }
// }



// //DELETE

// export const DELETE = async (request, {params}) => {

//     try {
//         await connectToDB()

//         await Prompt.findByIdAndRemove(params.id)
//         return new Response("Prompt Deleted", {status: 200})    
//     } catch (error) {
//         return new Response("Failed to delete prompt", {status: 500})
        
//     }

    
// }