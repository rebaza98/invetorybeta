import { connectToDB } from "@/utils/databse"
import OrdenCompra from "@/models/compras/ordenCompra";
import Producto from "@/models/inventario/producto";
import MovimientoAlmacen from "@/models/inventario/movimientoAlmacen";

export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const ocUnico = await OrdenCompra.findById( params.id ).      
      populate('productos.productoRef').
      populate('movAlmacen.movimientoRef').
      exec();
      const productosPopulado = ocUnico.productos.map((producto) => {
        return {
          productoRef: producto.productoRef._id,
          productoId: producto.productoRef._id,
          nombreProducto: producto.productoRef.nombreProducto,
          sku: producto.productoRef.sku,
          marca: producto.productoRef.marca,
          modelo: producto.productoRef.modelo,
          imagenUrl: producto.productoRef.imagenUrl,
          stock: producto.productoRef.stock,
          cantidad: producto.cantidad,
          precio: producto.precio,
          usaSerie: producto.productoRef.usaSerie,
          detalle: producto.detalle,
          errorPrecio: false,
          errorCantidad: false,
        }
      })
      const ocPoblado = {
        ...ocUnico.toObject(),
        productos: productosPopulado
      }
      //console.log("RETORNA ESTO POBLADO = ", ocPoblado)
      return new Response(JSON.stringify(ocPoblado), { status: 200 })
  } catch (error) {
      console.log(error)
      return new Response("Failed to fetch ocUnico", { status: 500 })
  }
} 

