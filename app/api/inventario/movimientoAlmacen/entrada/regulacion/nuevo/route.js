import { connectToDB } from "@/utils/databse"
import RegulacionEntrada from "@/models/regulaciones/regulacionEntrada"
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
    
    const tipoMovimiento = "ERF"
    const naturalezaMovimiento = "MEA"
    

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
            let current = await RegulacionEntrada.findById(proceso.idProceso)
            const fechaDB = new Date(current.updatedAt).toISOString(); // Convertir a formato ISO
            const fechaProceso = new Date(proceso.updatedAt).toISOString(); //
            
            if ( (fechaDB != fechaProceso) ) {
                currentProcesoObj = {
                    id: proceso.idProceso,
                    regulacionEntradaEmpresa: proceso.regulacionEntradaEmpresa
                }
                procesosModificados.push(currentProcesoObj)
            }


        }
        if(procesosModificados.length > 0){
            let cadena = ""
            for (let i = 0; i < procesosModificados.length; i++){
                cadena +=`${procesosModificados[i].regulacionEntradaEmpresa}`
                if (i < procesosModificados.length - 1){
                    cadena += " "
                }
            }
            const responseObjError = {
                mensaje: cadena
            }
            return new Response(JSON.stringify(responseObjError), { status: 500 });

        }
        const newMovimientoAlmacenRegulacionEntrada = new MovimientoAlmacen({
            almacen, 
            empresa,
            usuario: { 
                usuarioRef: currentUsuario._id,
                user: currentUsuario.user
            },
            tipoMovimiento: tipoMovimiento,
            proceso: movimiento.proceso, 
            fechaMovimiento: retornaFechaHoraSistema(),
            esEntrada: true,
            totalValor: totalValor,
            totalItems,

        })


        const savedMovimientoAlmacenRegulacionEntrada = await newMovimientoAlmacenRegulacionEntrada.save(); // Guardar y obtener el objeto guardado
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

        

        savedMovimientoAlmacenRegulacionEntrada.movimiento = nroMovimientoAlmacen
        savedMovimientoAlmacenRegulacionEntrada.movimientoEmpresa = empresaContadorActualizado.contadores.get('movAlmacen')
        savedMovimientoAlmacenRegulacionEntrada.flujo = [
            {
                procesoId: savedMovimientoAlmacenRegulacionEntrada._id,
                tipoProceso: naturalezaMovimiento,
            }
        ],
        savedMovimientoAlmacenRegulacionEntrada.save()


        //ACTUALIZA ORDENES RE COMO INGRESADAS
        //CREA ITEMS INVENTARIO POR CADA PRODUCTO

       

        //await Promise.all(savedMovimientoAlmacenCompra.proceso.map(async (proceso) => {
        for (const proceso of savedMovimientoAlmacenRegulacionEntrada.proceso){
            
            try {

                // Encuentra y actualiza la RE por su ID
                const updatedRE = await RegulacionEntrada.findOneAndUpdate(
                    { _id: proceso.idProceso }, // Filtro para encontrar la RE por su ID
                    {
                        $set: {
                            ingresadoAlmacen: true,
                            estado: "INGRESADA",
                            movAlmacen: {
                                movimientoRef: savedMovimientoAlmacenRegulacionEntrada._id,
                                movimientoId: savedMovimientoAlmacenRegulacionEntrada._id,

                            }
                        }, // Actualiza el campo ingresadoAlmacen a true
                        $push: { flujo: { procesoId: savedMovimientoAlmacenRegulacionEntrada._id, tipoProceso: naturalezaMovimiento } } // Agrega un elemento al arreglo flujo
                    },
                    { new: true } // Opción para devolver la versión actualizada del documento
                );
               

                //CREA ITEMS INVENTARIO
                
                //await Promise.all(proceso.productos.map(async (currentProducto) => {
                for (const currentProducto of proceso.productos){
                    let detalle = []
                    for(let i = 0; i < currentProducto.cantidad; i++ ){
                        // let index = 0
                        // let serie = ""
                        // let currentObjDetalle = {}
                        // if (currentProducto.detalle.length > 0){
                        //     index = i,
                        //     serie = currentProducto.detalle[i].serie
                        // }
                         //ACTUALIZAR CONTADORES
                        const contador = await Contador.findOneAndUpdate({}, { $inc: { contadorItemInventario: 1 } }, { new: true });
                        let contInventario = 0
                        if (!contador) {
                        // Si no existe un documento de Contadores, créalo con valores iniciales
                            const contador = await Contador.create({});
                            contInventario = 1;
                            contador.contadorItemInventario = contInventario
                            contador.save()
                        
                        } else {
                            contInventario = contador.contadorItemInventario;
                        }
                        

                        const newItemInventario = new ItemInventario({
                            nroItem: contInventario,
                            empresa,
                            movimientoAlmacenEntrada: {
                                movimientoAlmacenEntradaRef: savedMovimientoAlmacenRegulacionEntrada._id,
                                movimientoAlmacenEntradaId: savedMovimientoAlmacenRegulacionEntrada._id,
                            },
                            fechaEntrada: savedMovimientoAlmacenRegulacionEntrada.fechaMovimiento,
                            precioEntrada: currentProducto.precio,
                            nroSerie: currentProducto.detalle[i].serie,
                            indice: currentProducto.detalle[i].index,
                            producto: {
                                productoRef: currentProducto.productoRef,
                                productoId: currentProducto.productoId
                            },
                            flujo : [
                                {
                                    procesoId: proceso.idProceso,
                                    tipoProceso: tipoMovimiento,
                                },
                                {
                                    procesoId: savedMovimientoAlmacenRegulacionEntrada._id,
                                    tipoProceso: naturalezaMovimiento,
                                }
                            ],
                        })
                        const savedItemInventario = await newItemInventario.save()
                        //ESTE ACTUALIZA RE CON LOS SERIES  QUE SE ASIGNARON 
                        //OJO MEJORAR ESTE ALGORITMO ITERANDO EN PRODUCTOS DE OC PROCESO
                        for (let j = 0; j < updatedRE.productos.length; j++){
                            if (updatedRE.productos[j].productoId == currentProducto.productoId){
                                updatedRE.productos[j].detalle[i].serie = currentProducto.detalle[i].serie
                                updatedRE.productos[j].detalle[i].nroItem = contInventario
                                updatedRE.productos[j].detalle[i].itemId = savedItemInventario._id
                            }
                        }
                        // currentObjDetalle = {
                        //     index,
                        //     nroItem: contInventario,
                        //     serie,
                        //     itemId: savedItemInventario._id

                        // }
                        // detalle.push(currentObjDetalle)
                    }
                    // //ESTE ACTUALIZA RE CON LOS SERIES  QUE SE ASIGNARON 
                    // for (let i = 0; i < updatedRE.productos.length; i++){
                    //     if (updatedRE.productos[i].productoId == currentProducto.productoId){
                    //         updatedRE.productos[i].detalle = detalle
                    //     }
                    // }

                   
                    await actualizaStockProducto(currentProducto.productoId, currentEmpresa._id, "E", currentProducto.cantidad)
                    
                } 

                updatedRE.save()

                
        
            } catch (error) {
                console.error("Error al actualizar la Regulacion de Entrada:", error);
            }
        };

        



        return new Response(JSON.stringify(savedMovimientoAlmacenRegulacionEntrada), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new MEA", { status: 500 })
    }

}