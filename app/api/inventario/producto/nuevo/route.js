import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto"
import Contador from "@/models/core/contador"

export const POST = async (req, res) => {
    const { 
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
    } = await req.json()

    let nroProducto = undefined

    try {
        await connectToDB()
        let verificaCombo = false
        if (productosCombo.length > 0){
            verificaCombo = true
        }else{
            verificaCombo = false
        }
        
        if (!nroProducto) {
            const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorProducto: 1 } }, { new: true });
        
            if (!contador) {
            // Si no existe un documento de Contadores, créalo con valores iniciales
                const contador = await Contador.create({});
                nroProducto = 1;
                contador.contadorProducto = nroProducto
                contador.save()
            
            } else {
                nroProducto = contador.contadorProducto;
            }
        }

        const newProducto = new Producto({ 
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
            esCombo: verificaCombo,
            productosCombo,
            imagenUrl,
          //  imagenesRelacionadas,
            skuEquivalentes,
            nroProducto,
        });
        
        const savedProducto =  await newProducto.save()
        return new Response(JSON.stringify(savedProducto), { status: 201 })
    } catch (error) {
        return new Response("Failed to craete new producto", { status: 500 })
    }

}