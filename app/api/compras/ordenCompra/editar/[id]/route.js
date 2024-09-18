import { connectToDB } from "@/utils/databse"
import OrdenCompra from "@/models/compras/ordenCompra"
import Empresa from "@/models/core/empresa"
import Usuario from "@/models/core/usuario"
import { auth } from "@/auth" 
import { retornaCantidadItemsProductosOc } from "@/utils/core/utils"

export const PATCH = async (request, { params }) => {
    console.log("KLEGA AQUI VBIRRAR")
    const { user } = await auth()
    const { 
        id,
        empresa, 
        proveedor,
        productos,
        alias,
        fechaCompra,
        fechaEntrega,
        ingresadoAlmacen,
        pagada,
        pagos,
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

        const existingOC = await OrdenCompra.findById(id)
        if(!existingOC) return new Response("OC not found", {status:404})
        existingOC.empresa = empresa
        existingOC.usuario = {
            usuarioRef: currentUsuario._id,
            user: currentUsuario.user
        }
        existingOC.proveedor = proveedor
        existingOC.productos = productos
        existingOC.alias = alias
        existingOC.fechaCompra = fechaCompra
        existingOC.fechaEntrega = fechaEntrega
        existingOC.documentos = documentos
        existingOC.obs = obs
        existingOC.impuesto = impuesto
        existingOC.subTotal = subTotal
        existingOC.total = total
        existingOC.cantidadItems = contadorItems
      
      await existingOC.save()
      return new Response(JSON.stringify(existingOC), {status: 200})

  } catch (error) {
    console.log("ERROR = ", error)
      return new Response("Fail to retrieve OC", {status: 500})
  }
}
