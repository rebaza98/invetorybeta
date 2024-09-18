import { connectToDB } from "@/utils/databse"
import RegulacionSalida from "@/models/regulaciones/regulacionSalida"
import Contador from "@/models/core/contador"
import Empresa from "@/models/core/empresa"
import Usuario from "@/models/core/usuario"
import ItemInventario from "@/models/inventario/itemInventario"
import mongoose from "mongoose";

import { auth } from "@/auth" 
import { retornaCantidadItemsProductosOc, retornaFechaHoraSistema } from "@/utils/core/utils"
import MovimientoAlmacen from "@/models/inventario/movimientoAlmacen"
import { actualizaStockProducto } from "@/app/actions/inventario"
import Producto from "@/models/inventario/producto"

//import Prompt from "@models/prompt"

export const POST = async (req, res) => {

    const { user } = await auth()
    
    const tipoMovimiento = "SRF"
    const naturalezaMovimiento = "MSA"
    

    const {
        movimiento,
        empresa, 
        almacen,
        totalValor,
        totalItems,
    } = await req.json()
    let nroMovimientoAlmacen = undefined
    // const impuesto2Decimal = parseFloat(impuesto).toFixed(2)
    // const subTotal2Decimal = parseFloat(subTotal).toFixed(2)
    // const total2Decimal = parseFloat(total).toFixed(2)

    try {
        await connectToDB()
        const currentEmpresa = await Empresa.findById(empresa.empresaRef)
        const currentUsuario = await Usuario.findOne({ user: user.name });

        //session = await mongoose.startSession();
        //session.startTransaction();
        

        if(!currentUsuario){
            throw new Error    
        }


        //verifica que los procesos RE no se hayan modificado en el transucrso de la creacion del movimiento de almacen ERF
        let procesosModificados = []
        for (const proceso of movimiento.proceso){
            let currentProcesoObj = {}
            let current = await RegulacionSalida.findById(proceso.idProceso)
            const fechaDB = new Date(current.updatedAt).toISOString(); // Convertir a formato ISO
            const fechaProceso = new Date(proceso.updatedAt).toISOString(); //
            
            if ( (fechaDB != fechaProceso) ) {
                currentProcesoObj = {
                    id: proceso.idProceso,
                    regulacionSalidaEmpresa: proceso.regulacionSalidaEmpresa
                }
                procesosModificados.push(currentProcesoObj)
            }


        }
        if(procesosModificados.length > 0){
            let cadena = ""
            for (let i = 0; i < procesosModificados.length; i++){
                cadena +=`${procesosModificados[i].regulacionSalidaEmpresa}`
                if (i < procesosModificados.length - 1){
                    cadena += " "
                }
            }
            const responseObjError = {
                mensaje: cadena
            }
            return new Response(JSON.stringify(responseObjError), { status: 500 });

        }
        const newMovimientoAlmacenRegulacionSalida = new MovimientoAlmacen({
            almacen, 
            empresa,
            usuario: { 
                usuarioRef: currentUsuario._id,
                user: currentUsuario.user
            },
            tipoMovimiento: tipoMovimiento,
            proceso: movimiento.proceso, 
            fechaMovimiento: retornaFechaHoraSistema(),
            esEntrada: false, //ES SALIDA
            totalValor: totalValor,
            totalItems,

        })


        const savedMovimientoAlmacenRegulacionSalida = await newMovimientoAlmacenRegulacionSalida.save(); // Guardar y obtener el objeto guardado
        //ACTUALIZAR CONTADORES
        const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorMovimientoAlmacen: 1 } }, { new: true });
        
        if (!contador) {
        // Si no existe un documento de Contadores, créalo con valores iniciales
            const contador = await Contador.create({});
            nroMovimientoAlmacen = 1;
            contador.contadorMovimientoAlmacen = nroMovimientoAlmacen
            contador.save()
        
        } else {
            nroMovimientoAlmacen = contador.contadorMovimientoAlmacen;
        }

        const empresaContadorActualizado = await Empresa.findOneAndUpdate({_id: currentEmpresa._id}, { $inc: { "contadores.movAlmacen": 1 } }, { new: true });

        

        savedMovimientoAlmacenRegulacionSalida.movimiento = nroMovimientoAlmacen
        savedMovimientoAlmacenRegulacionSalida.movimientoEmpresa = empresaContadorActualizado.contadores.get('movAlmacen')
        savedMovimientoAlmacenRegulacionSalida.flujo = [
            {
                procesoId: savedMovimientoAlmacenRegulacionSalida._id,
                tipoProceso: naturalezaMovimiento,
            }
        ],
        savedMovimientoAlmacenRegulacionSalida.save()


        //ACTUALIZA ORDENES RE COMO INGRESADAS
        //CREA ITEMS INVENTARIO POR CADA PRODUCTO

       

        //await Promise.all(savedMovimientoAlmacenCompra.proceso.map(async (proceso) => {
        for (const proceso of savedMovimientoAlmacenRegulacionSalida.proceso){
            
            try {

                // Encuentra y actualiza la RE por su ID
                const updatedRS = await RegulacionSalida.findOneAndUpdate(
                    { _id: proceso.idProceso }, // Filtro para encontrar la RE por su ID
                    {
                        $set: {
                            ingresadoAlmacen: true,
                            estado: "INGRESADA",
                            movAlmacen: {
                                movimientoRef: savedMovimientoAlmacenRegulacionSalida._id,
                                movimientoId: savedMovimientoAlmacenRegulacionSalida._id,

                            }
                        }, // Actualiza el campo ingresadoAlmacen a true
                        $push: { flujo: { procesoId: savedMovimientoAlmacenRegulacionSalida._id, tipoProceso: naturalezaMovimiento } } // Agrega un elemento al arreglo flujo
                    },
                    { new: true } // Opción para devolver la versión actualizada del documento
                );
               

                //Actualiza ITEMS INVENTARIO
                
                //await Promise.all(proceso.productos.map(async (currentProducto) => {
                for (const currentProducto of proceso.productos){
                    let detalle = []
                    // for(let i = 0; i < currentProducto.cantidad; i++ ){
                        for(const currentDetalle of currentProducto.detalle){ 
                        // let index = 0
                        // let serie = ""
                        // let currentObjDetalle = {}
                        // if (currentProducto.detalle.length > 0){
                        //     index = i,
                        //     serie = currentProducto.detalle[i].serie
                        // }
                         //ACTUALIZAR CONTADORES
                        // const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorItemInventario: 1 } }, { new: true });
                        // let contInventario = 0
                        // if (!contador) {
                        // // Si no existe un documento de Contadores, créalo con valores iniciales
                        //     const contador = await Contador.create({});
                        //     contInventario = 1;
                        //     contador.contadorItemInventario = contInventario
                        //     contador.save()
                        
                        // } else {
                        //     contInventario = contador.contadorItemInventario;
                        // }
                        
                        const actualItemInventario = await ItemInventario.findById(currentDetalle.itemId)
                            actualItemInventario.movimientoAlmacenSalida = {
                                movimientoAlmacenSalidaRef: savedMovimientoAlmacenRegulacionSalida._id,
                                movimientoAlmacenSalidaId: savedMovimientoAlmacenRegulacionSalida._id,
                            }
                            actualItemInventario.fechaSalida = savedMovimientoAlmacenRegulacionSalida.fechaMovimiento,
                            actualItemInventario.precioSalida = currentProducto.precio,
                            actualItemInventario.fisico = false //ITEM DEJA ALMACEN 
                            actualItemInventario.flujo.push({
                                procesoId: savedMovimientoAlmacenRegulacionSalida._id,
                                tipoProceso: naturalezaMovimiento
                            })

                        
                        actualItemInventario.save()
                        
                    }

                   
                    await actualizaStockProducto(currentProducto.productoId, currentEmpresa._id, "S", currentProducto.cantidad)
                    
                } 

                //updatedRS.save()

                
        
            } catch (error) {
                console.error("Error al Crear Movimiento:", error);
            }
        };

        



        return new Response(JSON.stringify(savedMovimientoAlmacenRegulacionSalida), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new MEA", { status: 500 })
    }

}