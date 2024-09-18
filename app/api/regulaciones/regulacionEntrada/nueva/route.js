import { connectToDB } from "@/utils/databse"
import RegulacionEntrada from "@/models/regulaciones/regulacionEntrada"
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
        const newRegulacionEntrada = new RegulacionEntrada({ 
            empresa,
            usuario: { 
                usuarioRef: currentUsuario._id,
                user: currentUsuario.user
            },
            regulacionEntradaEmpresa: currentEmpresa.contadores.get('regulacionEntrada') + 1,
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
        

        const savedRegulacionEntrada = await newRegulacionEntrada.save(); // Guardar y obtener el objeto guardado
        //ACTUALIZAR CONTADORES
        const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorRegulacionEntrada: 1 } }, { new: true });
        
        if (!contador) {
        // Si no existe un documento de Contadores, créalo con valores iniciales
            const contador = await Contador.create({});
            re = 1;
            contador.contadorRegulacionEntrada = re
            contador.save()
        
        } else {
            re = contador.contadorRegulacionEntrada;
        }

        const empresaContadorActualizado = await Empresa.findOneAndUpdate({_id: currentEmpresa._id}, { $inc: { "contadores.regulacionEntrada": 1 } }, { new: true });

        

        savedRegulacionEntrada.regulacionEntrada = re
        savedRegulacionEntrada.regulacionEntradaEmpresa = empresaContadorActualizado.contadores.get('regulacionEntrada')
        savedRegulacionEntrada.flujo = [
            {
                procesoId: savedRegulacionEntrada._id,
                tipoProceso: "ERF",
            }
        ]
        savedRegulacionEntrada.save()

        //currentEmpresa.contadores.set('ordenCompra', currentEmpresa.contadores.get('ordenCompra') + 1),
        //currentEmpresa.save()
        // let savedOrdenCompra = null
        return new Response(JSON.stringify(savedRegulacionEntrada), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new savedRegulacionEntrada", { status: 500 })
    }

}