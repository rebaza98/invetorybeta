'use server'

import Producto from "@/models/inventario/producto"
import Empresa from "@/models/core/empresa"
import ItemInventario from "@/models/inventario/itemInventario"
import { connectToDB } from "@/utils/databse"
import RegulacionSalida from "@/models/regulaciones/regulacionSalida"


//OJO CREAR INDICE DE ESTADO DE REGULACION COMPRAS VEDNTAS Y TODO LO QUE PUEDA MUTAR ESTADO EJEM SELECCION PENDIENTE ETC


export const actualizaStockProducto = async (productoId, empresaId, modo, cantidad) => {
    
    try{
        await connectToDB()

        


        const currentProducto = await Producto.findById(productoId)
//        const empresas = await Empresa.find({})
        const currentEmpresa = await Empresa.findById(empresaId)

        // INCREMENTA STOCK DE ALMACEN EN LA CANTIDAD INGRESADA 
        if (modo == "E" && cantidad > 0) {
            let stockDetalleActualizado = false
            for (let stockDetalle of currentProducto.stockDetalle) {
                if (stockDetalle.empresa.empresaRef.equals(empresaId)) {
                    stockDetalle.ingresoEmpresa += cantidad;
                    stockDetalleActualizado = true;
                    break;
                }
            }
            // Si no se encuentra el detalle de stock para la empresa, agregar uno nuevo
            if (!stockDetalleActualizado) {
                currentProducto.stockDetalle.push({
                    empresa: {
                        empresaRef: currentEmpresa._id,
                        nombreEmpresa: currentEmpresa.nombreComercial,
                        nroDocEmpresa: currentEmpresa.numeroDoc
                    },
                    ingresoEmpresa: cantidad,
                    reservasEmpresa: [],
                });
                //currentProducto.save()
            }
            currentProducto.cantidadIngresos += cantidad
        }

        //INCREMENTA SALIDAS
        if (modo == "S" && cantidad > 0) {
            let stockDetalleActualizado = false
            for (let stockDetalle of currentProducto.stockDetalle) {
                if (stockDetalle.empresa.empresaRef.equals(empresaId)) {
                    stockDetalle.salidaEmpresa += cantidad;
                    stockDetalleActualizado = true;
                    break;
                }
            }
            // Si no se encuentra el detalle de stock para la empresa, agregar uno nuevo
            if (!stockDetalleActualizado) {
                currentProducto.stockDetalle.push({
                    empresa: {
                        empresaRef: currentEmpresa._id,
                        nombreEmpresa: currentEmpresa.nombreComercial,
                        nroDocEmpresa: currentEmpresa.numeroDoc
                    },
                    salidaEmpresa: cantidad,
                    reservasEmpresa: [],
                });
                //currentProducto.save()
            }
            currentProducto.cantidadSalidas += cantidad
        }

        //RESERVA POR SI SE INICIA CON REGULACION DE SALIDA
        if (modo == "R" && cantidad > 0) {
            let stockDetalleActualizado = false
            for (let stockDetalle of currentProducto.stockDetalle) {
                if (stockDetalle.empresa.empresaRef.equals(empresaId)) {
                    stockDetalleActualizado = true;
                    break;
                }
            }
            // Si no se encuentra el detalle de stock para la empresa, agregar uno nuevo
            if (!stockDetalleActualizado) {
                currentProducto.stockDetalle.push({
                    empresa: {
                        empresaRef: currentEmpresa._id,
                        nombreEmpresa: currentEmpresa.nombreComercial,
                        nroDocEmpresa: currentEmpresa.numeroDoc
                    },
                    reservasEmpresa: [],
                });
                //currentProducto.save()
            }
        }

        //CANTIDAD DE ITEMS PARA CUBRIR SALIDA DE REGULACION ESTADO DEFAULT SELECCION
        let cantidadReservada = 0
        let cantidadReservadaEmpresa = 0

        let cantidadReservadaRegulacion = 0
        let cantidadReservadaEmpresaRegulacion = 0
        console.log("ESTO DEBE CAUSAR ALGUN ERROR")
        const resultadoRegulacion = await RegulacionSalida.aggregate([
            // Filtro por estado y productoId
            {
                $match: {
                    estado: "SELECCION",
                    'productos.productoId': currentProducto._id
                }
            },
            {
                $unwind: '$productos'
            },
            {
                $match: {
                    'productos.productoId': currentProducto._id
                }
            },
            {
                $group: {
                    _id: null,
                    totalCantidad: { $sum: '$productos.cantidad' },
                    totalCantidadPorEmpresa: {
                        $sum: {
                            $cond: [
                                { $eq: ['$empresa.nroDocEmpresa', currentEmpresa.numeroDoc] },
                                '$productos.cantidad',
                                0
                            ]
                        }
                    }
                }
            }
        ]);




        if (resultadoRegulacion.length > 0) {
            cantidadReservadaRegulacion = resultadoRegulacion[0].totalCantidad
            cantidadReservadaEmpresaRegulacion = resultadoRegulacion[0].totalCantidadPorEmpresa

        }

        //ATENDER RESERVAS

        let reservasPorEmpresa = []

        const reservaRegulacion = {
            tipoProceso: "SRF",
            cantidadReservada: cantidadReservadaEmpresaRegulacion

        }

        reservasPorEmpresa.push(reservaRegulacion) //PUSH OTROS PROCESO COMO VENTAS OJO




        const listaItemsFisico = await ItemInventario.find({ "producto.productoRef": productoId, fisico: true })
        const listaItemsFisicosLibres = listaItemsFisico.filter(item => item.libre === true);
        const listaItemsFisicosAsignados = listaItemsFisico.filter(item => item.libre === false);

        //FILTRAR POR EMPRESA 
        const listaItemsFisicoEmpresa = listaItemsFisico.filter(item => item.empresa.nroDocEmpresa === currentEmpresa.numeroDoc);

        const listaItemsFisicosLibresEmpresa = listaItemsFisicoEmpresa.filter(item => item.libre === true);
        const listaItemsFisicosAsignadosEmpresa = listaItemsFisicoEmpresa.filter(item => item.libre === false);


        const cantidadItemsFisco = listaItemsFisico.length
        const cantidadItemsFisicosLibres = listaItemsFisicosLibres.length
        const cantidadItemsFisicosAsignados = listaItemsFisicosAsignados.length

        const cantidadItemsFisicoEmpresa = listaItemsFisicoEmpresa.length
        const cantidadItemsFisicosLibresEmpresa = listaItemsFisicosLibresEmpresa.length
        const cantidadItemsFisicosAsignadosEmpresa = listaItemsFisicosAsignadosEmpresa.length

        //FALTA CONFIGURAR RESERVA ESTA QUEDANDO PAJA OJO

        // for (const detalleEmpresa of currentProducto.stockDetalle) {
        //     //cantidadReservada += reserva.proceso.cantidadReservada 
        //     if (detalleEmpresa.empresa.empresaRef == currentEmpresa._id) {
        //         detalleEmpresa.reservaTotalEmpresa = cantidadReservadaEmpresa
        //     }
        //     for (reserva of detalleEmpresa.reservasEmpresa) {
        //         cantidadReservada += reserva.proceso.cantidadReservada
        //     }

        // }

        let reposicion = 0
        let disponible = 0

        let reposicionEmpresa = 0
        let disponibleEmpresa = 0

        let stock = 0
        let stockEmpresa = 0



        //LOGICA DE SINCRONIZACION

        cantidadReservada = cantidadReservadaRegulacion + 0  // OJO AGREGAR VENTAS
        cantidadReservadaEmpresa = cantidadReservadaEmpresaRegulacion + 0 //AGREGAR VENTAS OTROS PROCESOS X EMPRESA


        stock = cantidadItemsFisicosLibres - cantidadReservada
        if (stock >= 0) {
            reposicion = 0
        } else {
            stock = 0
            reposicion = cantidadReservada - cantidadItemsFisicosLibres
        }
        stockEmpresa = cantidadItemsFisicosLibresEmpresa - cantidadReservadaEmpresa
        if (stockEmpresa >= 0) {
            reposicionEmpresa = 0
        } else {
            stockEmpresa = 0
            reposicionEmpresa = cantidadReservadaEmpresa - cantidadItemsFisicosLibresEmpresa
        }


        //ACTUALIZA TOTAL 
        currentProducto.stock = stock
        currentProducto.stockReservado = cantidadReservada
        currentProducto.reposicion = reposicion
        currentProducto.stockFisico = cantidadItemsFisco

        //actualiza Empresa
        const index = currentProducto.stockDetalle.findIndex(detalle =>
            detalle.empresa.empresaRef.equals(currentEmpresa._id)
        );
        if (index !== -1) {
            // Actualizar stock existente EMPRESA
            currentProducto.stockDetalle[index].stockEmpresa = stockEmpresa
            currentProducto.stockDetalle[index].reposicionEmpresa = reposicionEmpresa
            currentProducto.stockDetalle[index].stockFisicoEmpresa = cantidadItemsFisicoEmpresa
            currentProducto.stockDetalle[index].reservaTotalEmpresa = cantidadReservadaEmpresa
            currentProducto.stockDetalle[index].reservasEmpresa = reservasPorEmpresa
        }

        

        currentProducto.save()


        


        console.log("SE ACTUALIZA STOCK DE PRODUCTO")
        
    }
    catch (error){
        console.log("OCURRIO ERROR AL ACTUALIZAR  PRODUCTO", error)
    }

}


