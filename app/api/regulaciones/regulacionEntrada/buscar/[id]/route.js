import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto";
import RegulacionEntrada from "@/models/regulaciones/regulacionEntrada";
import MovimientoAlmacen from "@/models/inventario/movimientoAlmacen";

export const GET = async (request, { params }) => {
  try {
      await connectToDB()
      const reUnica = await RegulacionEntrada.findById( params.id ).
      populate('productos.productoRef').
      populate('movAlmacen.movimientoRef').
      exec();
      const productosPopulado = reUnica.productos.map((producto) => {
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
      const rePoblada = {
        ...reUnica.toObject(),
        productos: productosPopulado
      }
      return new Response(JSON.stringify(rePoblada), { status: 200 })
  } catch (error) {
      console.log(error)
      return new Response("Failed to fetch rePoblada", { status: 500 })
  }
} 

