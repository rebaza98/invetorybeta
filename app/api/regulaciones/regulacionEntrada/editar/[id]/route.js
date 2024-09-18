import { connectToDB } from "@/utils/databse"
import RegulacionEntrada from "@/models/regulaciones/regulacionEntrada"
import Empresa from "@/models/core/empresa"
import Usuario from "@/models/core/usuario"
import { auth } from "@/auth" 
import { retornaCantidadItemsProductosOc } from "@/utils/core/utils"

export const PATCH = async (request, { params }) => {
    const { user } = await auth()
    const { 
        id,
        empresa, 
        productos,
        alias,
        fechaRegulacion,
        ingresadoAlmacen,
        documentos,
        obs,
        impuesto,
        subTotal,
        total,
    } = await request.json()
  try {
        await connectToDB()
        const currentEmpresa = await Empresa.findById(empresa.empresaRef)
        const currentUsuario = await Usuario.findOne({ user: user.name });  
      
        if(!currentUsuario){
            throw new Error    
        }
        for (const currentProducto of productos ){
          let detalle = []
          for (let i = 0; i < currentProducto.cantidad; i++){
              let currentObj = {
                  index: i,
                  serie: "",
                  nroItem:"",
                  itemId: null
              }
              detalle.push(currentObj)
          }
          currentProducto.detalle = detalle

      }
        const contadorItems = retornaCantidadItemsProductosOc(productos)

        const existingRE = await RegulacionEntrada.findById(id)
        if(!existingRE) return new Response("RE not found", {status:404})
        existingRE.empresa = empresa
        existingRE.usuario = {
            usuarioRef: currentUsuario._id,
            user: currentUsuario.user
        }
        existingRE.productos = productos
        existingRE.alias = alias
        existingRE.fechaRegulacion = fechaRegulacion
        existingRE.documentos = documentos
        existingRE.obs = obs
        existingRE.impuesto = impuesto
        existingRE.subTotal = subTotal
        existingRE.total = total
        existingRE.cantidadItems = contadorItems
      
      await existingRE.save()
      return new Response(JSON.stringify(existingRE), {status: 200})

  } catch (error) {
    console.log("ERROR = ", error)
      return new Response("Fail to retrieve RE", {status: 500})
  }
}
