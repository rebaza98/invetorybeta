import { connectToDB } from "@/utils/databse"
import RegulacionSalida from "@/models/regulaciones/regulacionSalida"
import Empresa from "@/models/core/empresa"
import Usuario from "@/models/core/usuario"
import { auth } from "@/auth" 
import { retornaCantidadItemsProductosOc } from "@/utils/core/utils"
import ItemInventario from "@/models/inventario/itemInventario"
import { actualizaStockProducto } from "@/app/actions/inventario"

export const PATCH = async (request, { params }) => {

    let productosTransferencia = []
    const naturalezaMovimiento = "SRF"
    const { user } = await auth()
    const { 
        id,
        productos,
        cantidadItems,
    } = await request.json()
  try {
        await connectToDB()
        const currentUsuario = await Usuario.findOne({ user: user.name });  
      
        if(!currentUsuario){
            throw new Error    
            
        }
        const listaProductosDisponibles = productos.flatMap((productoActual) => {
          return productoActual.detalle.map(detalle => detalle.itemId);
        });


        const itemsDisponibles = await ItemInventario.find({
          _id: { $in: listaProductosDisponibles },
          libre: true
        });

        if (!(cantidadItems == itemsDisponibles.length)){
          throw new Error("ALGUN ITEM YA NO ESTA DISPONIBLE PARA SELECCIONAR ")    
        }else{
          console.log("TODO OK CON ITEMS")
        }

        

      const existingRS = await RegulacionSalida.findById(id)
      if(!existingRS) return new Response("RS not found", {status:404})
      existingRS.productos = productos
      existingRS.estado = "PENDIENTE"
      existingRS.itemsSeleccionados = true
      await existingRS.save()

      for(const producto of productos){
        for(const detalle of producto.detalle){
          const currentItemInventario = await ItemInventario.findById(detalle.itemId)
          currentItemInventario.libre = false
          
          if (existingRS.empresa.nroDocEmpresa != currentItemInventario.empresa.nroDocEmpresa){
            currentItemInventario.reservaExterna = true
            currentItemInventario.empresaExterna = existingRS.empresa

          }
          const currentFlujoObj = {
            procesoId: existingRS._id,
            tipoProceso: naturalezaMovimiento,
          }
          currentItemInventario.precioSalida = producto.precio
          currentItemInventario.flujo.push(currentFlujoObj)
          currentItemInventario.save()

          
        }
        await actualizaStockProducto(producto.productoId, existingRS.empresa.empresaRef, "R", producto.cantidad)
        
      }
      
       
      return new Response(JSON.stringify(existingRS), {status: 200})

  } catch (error) {
    console.log("ERROR = ", error)
      return new Response("Fail to retrieve RS", {status: 500})
  }
}
