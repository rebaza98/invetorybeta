import { connectToDB } from "@/utils/databse"
import OrdenCompra from "@/models/compras/ordenCompra"
import Contador from "@/models/core/contador"
import Empresa from "@/models/core/empresa"
import Usuario from "@/models/core/usuario"
import ItemInventario from "@/models/inventario/itemInventario"
import mongoose from "mongoose";

import { auth } from "@/auth" 
import { retornaCantidadItemsProductosOc, retornaFechaHoraSistema } from "@/utils/core/utils"
import MovimientoAlmacen from "@/models/inventario/movimientoAlmacen"
import Producto from "@/models/inventario/producto"
import { actualizaStockProducto } from "@/app/actions/inventario"

//import Prompt from "@models/prompt"

export const POST = async (req, res) => {

    const { user } = await auth()
    
    const tipoMovimiento = "ECP"
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


        //verifica que los procesos OC no se hayan modificado en el transucrso de la creacion del movimiento de almacen ECP
        let procesosModificados = []
        for (const proceso of movimiento.proceso){
            let currentProcesoObj = {}
            let current = await OrdenCompra.findById(proceso.idProceso)
            const fechaDB = new Date(current.updatedAt).toISOString(); // Convertir a formato ISO
            const fechaProceso = new Date(proceso.updatedAt).toISOString(); //
            
            if ( (fechaDB != fechaProceso) ) {
                currentProcesoObj = {
                    id: proceso.idProceso,
                    ocEmpresa: proceso.ocEmpresa
                }
                procesosModificados.push(currentProcesoObj)
            }


        }
        if(procesosModificados.length > 0){
            let cadena = ""
            for (let i = 0; i < procesosModificados.length; i++){
                cadena +=`${procesosModificados[i].ocEmpresa}`
                if (i < procesosModificados.length - 1){
                    cadena += " "
                }
            }
            const responseObjError = {
                mensaje: cadena
            }
            return new Response(JSON.stringify(responseObjError), { status: 500 });

        }
        const newMovimientoAlmacenCompra = new MovimientoAlmacen({
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


        const savedMovimientoAlmacenCompra = await newMovimientoAlmacenCompra.save(); // Guardar y obtener el objeto guardado
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

        

        savedMovimientoAlmacenCompra.movimiento = nroMovimientoAlmacen
        savedMovimientoAlmacenCompra.movimientoEmpresa = empresaContadorActualizado.contadores.get('movAlmacen')
        savedMovimientoAlmacenCompra.flujo = [
            {
                procesoId: savedMovimientoAlmacenCompra._id,
                tipoProceso: naturalezaMovimiento,
            }
        ],
        savedMovimientoAlmacenCompra.save()


        //ACTUALIZA ORDENES DE COMPRA COMO INGRESADAS
        //CREA ITEMS INVENTARIO POR CADA PRODUCTO

       

        //await Promise.all(savedMovimientoAlmacenCompra.proceso.map(async (proceso) => {
        for (const proceso of savedMovimientoAlmacenCompra.proceso){
            
            try {

                // Encuentra y actualiza la Orden de Compra por su ID
                const updatedOC = await OrdenCompra.findOneAndUpdate(
                    { _id: proceso.idProceso }, // Filtro para encontrar la orden de compra por su ID
                    {
                        $set: {
                            ingresadoAlmacen: true,
                            estado: "INGRESADA",
                            movAlmacen: {
                                movimientoRef: savedMovimientoAlmacenCompra._id,
                                movimientoId: savedMovimientoAlmacenCompra._id,

                            }
                        }, // Actualiza el campo ingresadoAlmacen a true
                        $push: { flujo: { procesoId: savedMovimientoAlmacenCompra._id, tipoProceso: naturalezaMovimiento } } // Agrega un elemento al arreglo flujo
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
                                movimientoAlmacenEntradaRef: savedMovimientoAlmacenCompra._id,
                                movimientoAlmacenEntradaId: savedMovimientoAlmacenCompra._id,
                            },
                            fechaEntrada: savedMovimientoAlmacenCompra.fechaMovimiento,
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
                                    procesoId: savedMovimientoAlmacenCompra._id,
                                    tipoProceso: naturalezaMovimiento,
                                }
                            ],
                        })
                        
                        const savedItemInventario = await newItemInventario.save()
                        //ESTE ACTUALIZA OC CON LOS SERIES  QUE SE ASIGNARON 
                        //OJO MEJORAR ESTE ALGORITMO ITERANDO EN PRODUCTOS DE OC PROCESO
                        for (let j = 0; j < updatedOC.productos.length; j++){
                            if (updatedOC.productos[j].productoId == currentProducto.productoId){
                                updatedOC.productos[j].detalle[i].serie = currentProducto.detalle[i].serie
                                updatedOC.productos[j].detalle[i].nroItem = contInventario
                                updatedOC.productos[j].detalle[i].itemId = savedItemInventario._id
                            }
                        }

                    
                    }


                    
                    await actualizaStockProducto(currentProducto.productoId, currentEmpresa._id, "E", currentProducto.cantidad)
                } 

                updatedOC.save()

                
        
            } catch (error) {
                console.error("Error al actualizar la Orden de Compra:", error);
            }
        };

        

        //OJO AQUI ACTUALIZAR STOCK CON FUNCION ; ATOMIZAR PROCESOS

        return new Response(JSON.stringify(savedMovimientoAlmacenCompra), { status: 201 })
    } catch (error) {
        console.log("ERROR 500 = ", error)
        return new Response("Failed to craete new MEA", { status: 500 })
    }

}