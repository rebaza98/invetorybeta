import { connectToDB } from "@/utils/databse"
import OrdenVentaRegular from "@/models/ventas/ordenVentaRegular"
import Empresa from "@/models/core/empresa"
import Usuario from "@/models/core/usuario"
import { auth } from "@/auth" 
import { retornaCantidadItemsProductosOc } from "@/utils/core/utils"
import { actualizaStockProducto } from "@/app/actions/inventario"

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

        const existingRS = await RegulacionSalida.findById(id)
        if(!existingRS) return new Response("RS not found", {status:404})
        existingRS.empresa = empresa
        existingRS.usuario = {
            usuarioRef: currentUsuario._id,
            user: currentUsuario.user
        }
        existingRS.productos = productos
        existingRS.alias = alias
        existingRS.fechaRegulacion = fechaRegulacion
        existingRS.documentos = documentos
        existingRS.obs = obs
        existingRS.impuesto = impuesto
        existingRS.subTotal = subTotal
        existingRS.total = total
        existingRS.cantidadItems = contadorItems
      
      await existingRS.save()
      for (const producto of existingRS.productos){
        await actualizaStockProducto(producto.productoId, currentEmpresa._id, "R", producto.cantidad)
      }
      return new Response(JSON.stringify(existingRS), {status: 200})

  } catch (error) {
    console.log("ERROR = ", error)
      return new Response("Fail to retrieve RS", {status: 500})
  }
}
