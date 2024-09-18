import { connectToDB } from "@/utils/databse"
import OrdenCompra from "@/models/compras/ordenCompra"
import Contador from "@/models/core/contador"
import Empresa from "@/models/core/empresa"
import Usuario from "@/models/core/usuario"

import { auth } from "@/auth" 
import { retornaCantidadItemsProductosOc } from "@/utils/core/utils"

//import Prompt from "@models/prompt"

export const POST = async (req, res) => {

    const { user } = await auth()
    
    

    const {
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
    } = await req.json()
    let oc = undefined
    const impuesto2Decimal = parseFloat(impuesto).toFixed(2)
    const subTotal2Decimal = parseFloat(subTotal).toFixed(2)
    const total2Decimal = parseFloat(total).toFixed(2)

    try {
        await connectToDB()
        const currentEmpresa = await Empresa.findById(empresa.empresaRef)
        const currentUsuario = await Usuario.findOne({ user: user.name });
        

        // const refProductos = productos.map((producto) => {
        //    // contadorItems += producto.cantidad
        //     return {
        //         productoRef: producto.productoRef,
        //         productoId:producto.productoId,
        //         cantidad: producto.cantidad,
        //         precio: producto.precio
        //     }
        // })

        if(!currentUsuario){
            throw new Error    
        }

        // if (!oc) {
        //     const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorOrdenCompra: 1 } }, { new: true });
        
        //     if (!contador) {
        //     // Si no existe un documento de Contadores, créalo con valores iniciales
        //         const contador = await Contador.create({});
        //         oc = 1;
        //         contador.contadorOrdenCompra = oc
        //         contador.save()
            
        //     } else {
        //         oc = contador.contadorOrdenCompra;
        //     }
        // }

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
        const newOrdenCompra = new OrdenCompra({ 
            empresa,
            usuario: { 
                usuarioRef: currentUsuario._id,
                user: currentUsuario.user
            },
            ocEmpresa: currentEmpresa.contadores.get('ordenCompra') + 1,
            proveedor,
            //productos: refProductos,
            productos: productos,
            alias,
            fechaCompra,
            fechaEntrega,
            ingresadoAlmacen,
            pagada,
            pagos,
            documentos,
            obs,
            impuesto: impuesto2Decimal,
            subTotal: subTotal2Decimal,
            total: total2Decimal,
            cantidadItems: contadorItems,
            //oc,
        });
        

        const savedOrdenCompra = await newOrdenCompra.save(); // Guardar y obtener el objeto guardado
        //ACTUALIZAR CONTADORES
        const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorOrdenCompra: 1 } }, { new: true });
        
        if (!contador) {
        // Si no existe un documento de Contadores, créalo con valores iniciales
            const contador = await Contador.create({});
            oc = 1;
            contador.contadorOrdenCompra = oc
            contador.save()
        
        } else {
            oc = contador.contadorOrdenCompra;
        }

        const empresaContadorActualizado = await Empresa.findOneAndUpdate({_id: currentEmpresa._id}, { $inc: { "contadores.ordenCompra": 1 } }, { new: true });

        

        savedOrdenCompra.oc = oc
        savedOrdenCompra.ocEmpresa = empresaContadorActualizado.contadores.get('ordenCompra')
        savedOrdenCompra.flujo = [
            {
                procesoId: savedOrdenCompra._id,
                tipoProceso: "ECP",
            }
        ]
        savedOrdenCompra.save()

        //currentEmpresa.contadores.set('ordenCompra', currentEmpresa.contadores.get('ordenCompra') + 1),
        //currentEmpresa.save()
        // let savedOrdenCompra = null
        return new Response(JSON.stringify(savedOrdenCompra), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new OC", { status: 500 })
    }

}