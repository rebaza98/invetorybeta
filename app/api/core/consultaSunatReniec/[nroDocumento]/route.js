import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto"
import ApiUrl from "@/public/static/apiUrl"

export const GET = async (request, context) => {
    const { nroDocumento } = context.params
    let url = ""
    if (nroDocumento.length === 8){
        url = `${ApiUrl().DNI.url}${nroDocumento}?token=${process.env.TOKEN_DNI}` 
    }else if(nroDocumento.length === 11){
        url = `${ApiUrl().RUC.url}${nroDocumento}?token=${process.env.TOKEN_RUC}` 
    }
    try {
        const response = await fetch(url)
        console.log("11")
        if (response.ok) {
            console.log("112")
            const data = await response.json()
            console.log("113")
            return new Response(JSON.stringify(data), { status: 200 })
        } else {
            // En lugar de retornar un response con status 404, retornamos un objeto JSON con el mensaje de recurso no encontrado.
            return new Response(JSON.stringify({ message: "Recurso no encontrado" }), { status: 404 });
        }
        

    } catch (error) {
        return new Response("Failed to fetch all nroDocumento", { status: 500 })
    }
} 
