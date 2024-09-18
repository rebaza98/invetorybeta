import { connectToDB } from "@/utils/databse"
import RegulacionSalida from "@/models/regulaciones/regulacionSalida"
import Contador from "@/models/core/contador"
import Empresa from "@/models/core/empresa"
import Usuario from "@/models/core/usuario"

import { auth } from "@/auth" 
import { retornaCantidadItemsProductosOc } from "@/utils/core/utils"
import { actualizaStockProducto } from "@/app/actions/inventario"
import OrdenVentaRegular from "@/models/ventas/ordenVentaRegular"

//import Prompt from "@models/prompt"

export const POST = async (req, res) => {

    const { user } = await auth()
    
    

    const {
        empresa,
        cliente,
        clienteFinal, 
        productos,
        alias,
        fechaVenta,
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
        const newOVR = new OrdenVentaRegular({ 
            empresa,
            usuario: { 
                usuarioRef: currentUsuario._id,
                user: currentUsuario.user
            },
            ovrEmpresa: currentEmpresa.contadores.get('ordenVentaRegular') + 1,
            cliente,
            clienteFinal,
            productos: productos,
            alias,
            fechaVenta,
            ingresadoAlmacen,
            documentos,
            obs,
            impuesto: impuesto2Decimal,
            subTotal: subTotal2Decimal,
            total: total2Decimal,
            cantidadItems: contadorItems,
        });
        

        const savedOVR = await newOVR.save(); // Guardar y obtener el objeto guardado
        //ACTUALIZAR CONTADORES
        const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorOrdenVentaRegular: 1 } }, { new: true });
        let ovr = 0
        if (!contador) {
        // Si no existe un documento de Contadores, créalo con valores iniciales
            const contador = await Contador.create({});
            ovr = 1;
            contador.contadorOrdenVentaRegular = ovr
            contador.save()
        
        } else {
            ovr = contador.contadorOrdenVentaRegular;
        }

        const empresaContadorActualizado = await Empresa.findOneAndUpdate({_id: currentEmpresa._id}, { $inc: { "contadores.ordenVentaRegular": 1 } }, { new: true });

        

        savedOVR.ovr = ovr
        savedOVR.ovrEmpresa = empresaContadorActualizado.contadores.get('ordenVentaRegular')
        savedOVR.flujo = [
            {
                procesoId: savedOVR._id,
                tipoProceso: "VNC",
            }
        ]
        

        savedOVR.save()
        for (const producto of savedOVR.productos){
            await actualizaStockProducto(producto.productoId, currentEmpresa._id, "R", producto.cantidad)
        }

        //currentEmpresa.contadores.set('ordenCompra', currentEmpresa.contadores.get('ordenCompra') + 1),
        //currentEmpresa.save()
        // let savedOrdenCompra = null
        return new Response(JSON.stringify(savedOVR), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new savedRegulacionSalida", { status: 500 })
    }

}