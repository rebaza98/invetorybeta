import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto"

export const PATCH = async (request, { params }) => {
    const { 
        id,
        esProducto,
        nombreProducto,
        sku,
        modelo,
        marca,
        categoria,
        desc,
        codigo,
        barCode,
        garantia,
        anio,
        stock,
        stockMinimo,
        especificaciones,
        categoriaRelacionadas,
        usaSerie,
        esCombo,
        productosCombo,
        imagenUrl,
        //imagenesRelacionadas,
        skuEquivalentes,
    } = await request.json()
  try {
      await connectToDB()
      let verificaCombo = false
        if (productosCombo.length > 0){
            verificaCombo = true
        }else{
            verificaCombo = false
        }
      const existingProducto = await Producto.findById(id)
      if(!existingProducto) return new Response("Producto not found", {status:404})
      existingProducto.esProducto = esProducto
      existingProducto.nombreProducto = nombreProducto
      existingProducto.sku = sku
      existingProducto.marca = marca
      existingProducto.modelo = modelo
      existingProducto.categoria = categoria
      existingProducto.desc = desc
      existingProducto.codigo = codigo
      existingProducto.barCode = barCode
      existingProducto.garantia = garantia
      existingProducto.anio = anio
      existingProducto.stock = stock
      existingProducto.stockMinimo = stockMinimo
      existingProducto.especificaciones = especificaciones
      existingProducto.usaSerie = usaSerie
      existingProducto.esCombo = verificaCombo
      existingProducto.productosCombo = productosCombo
      existingProducto.imagenUrl = imagenUrl
      existingProducto.skuEquivalentes = skuEquivalentes
      
      await existingProducto.save()
      return new Response(JSON.stringify(existingProducto), {status: 200})

  } catch (error) {
      return new Response("Fail to retrieve Producto", {status: 500})
  }
}
