import { connectToDB } from "@/utils/databse"
import RegulacionSalida from "@/models/regulaciones/regulacionSalida"
import Contador from "@/models/core/contador"
import Empresa from "@/models/core/empresa"
import Usuario from "@/models/core/usuario"

import { auth } from "@/auth" 
import { retornaCantidadItemsProductosOc } from "@/utils/core/utils"
import { actualizaStockProducto } from "@/app/actions/inventario"

//import Prompt from "@models/prompt"

export const POST = async (req, res) => {

    const { user } = await auth()
    
    

    const {
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
    } = await req.json()
    let re = undefined
    const impuesto2Decimal = parseFloat(impuesto).toFixed(2)
    const subTotal2Decimal = parseFloat(subTotal).toFixed(2)
    const total2Decimal = parseFloat(total).toFixed(2)

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
        const newRegulacionSalida = new RegulacionSalida({ 
            empresa,
            usuario: { 
                usuarioRef: currentUsuario._id,
                user: currentUsuario.user
            },
            regulacionSalidaEmpresa: currentEmpresa.contadores.get('regulacionSalida') + 1,
            productos: productos,
            alias,
            fechaRegulacion,
            ingresadoAlmacen,
            documentos,
            obs,
            impuesto: impuesto2Decimal,
            subTotal: subTotal2Decimal,
            total: total2Decimal,
            cantidadItems: contadorItems,
        });
        

        const savedRegulacionSalida = await newRegulacionSalida.save(); // Guardar y obtener el objeto guardado
        //ACTUALIZAR CONTADORES
        const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorRegulacionSalida: 1 } }, { new: true });
        let rs = 0
        if (!contador) {
        // Si no existe un documento de Contadores, créalo con valores iniciales
            const contador = await Contador.create({});
            rs = 1;
            contador.contadorRegulacionSalida = rs
            contador.save()
        
        } else {
            rs = contador.contadorRegulacionSalida;
        }

        const empresaContadorActualizado = await Empresa.findOneAndUpdate({_id: currentEmpresa._id}, { $inc: { "contadores.regulacionSalida": 1 } }, { new: true });

        

        savedRegulacionSalida.regulacionSalida = rs
        savedRegulacionSalida.regulacionSalidaEmpresa = empresaContadorActualizado.contadores.get('regulacionSalida')
        savedRegulacionSalida.flujo = [
            {
                procesoId: savedRegulacionSalida._id,
                tipoProceso: "SRF",
            }
        ]
        

        savedRegulacionSalida.save()
        for (const producto of savedRegulacionSalida.productos){
            await actualizaStockProducto(producto.productoId, currentEmpresa._id, "R", producto.cantidad)
        }

        //currentEmpresa.contadores.set('ordenCompra', currentEmpresa.contadores.get('ordenCompra') + 1),
        //currentEmpresa.save()
        // let savedOrdenCompra = null
        return new Response(JSON.stringify(savedRegulacionSalida), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new savedRegulacionSalida", { status: 500 })
    }

}