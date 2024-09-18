import { DocumentArrowUpIcon, EyeIcon, NoSymbolIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

import { formatearFecha } from '@/utils/core/utils'
import React, { useState } from 'react'
import ModalListaItemsMovimientoAlmacen from './ModalListaItemsMovimientoAlmacen'

const ItemMovAl = ({movAl}) => {

    const [modalVerItemsInventario, setModalVerItemsInventario] = useState(false)

    const estadoColor = {
        "PENDIENTE": "text-gray-900",
        "INGRESADA": "text-white",
        "ANULADA": "text-white"
    }
    const estadoColores = {
        //"PENDIENTE": "bg-yellow-200",
        "PENDIENTE": "bg-yellow-300",
        "INGRESADA": "bg-green-600",
        "ANULADA" : "bg-red-600"
    }

    const fechaFormateada = formatearFecha(movAl.fechaMovimiento);



    const handleVerItemsInventario = (movAl) => {
        setModalVerItemsInventario(true)
    }

    // const handleEditar = (id) => {
    //     router.push(`/compras/ordenesCompra/editar/${id}`)
    // }

    // const handleDetalle = (id) => {
    //     router.push(`/compras/ordenesCompra/detalle/${id}`)
    // }


    return (
        <>
        { modalVerItemsInventario && <ModalListaItemsMovimientoAlmacen open={modalVerItemsInventario} setOpen={setModalVerItemsInventario} movimiento={movAl} /> }
            <div className={`flex justify-between items-center p-1 ${movAl.esEntrada ? "bg-green-600": "bg-red-600"}  text-white`}>
                            <h3 className={`truncate text-sm `}><strong>{movAl.empresa.nombreEmpresa}</strong>  </h3>
                            <div className={` mt-1 truncate text-sm `} ><strong>Movimiento:{String(movAl.movimientoEmpresa).padStart(5, '0')}</strong>  </div>
                        </div>
            <div className="w-full p-4">
                
                <div className='' >
                    <div className="flex-1 truncate">
                    
                        {/* <div className="flex justify-between  items-center ">

                            <h3 className={`truncate text-sm font-medium text-gray-900`}>{oc.proveedor.razonSocial}</h3>
                            
                        </div> */}
                        
                        <div className={`flex justify-between  mt-1 truncate text-xs text-gray-900 `} >
                            <strong>Tipo Movimiento:</strong>
                            <strong>{movAl.tipoMovimiento}</strong>    
                            
                        </div>
                        <div className={`flex justify-between  mt-1 truncate text-xs text-gray-900 `} >
                            <strong>Fecha Movimiento:</strong>  
                            {fechaFormateada}
                        </div>
                        <div className={`flex justify-between  mt-1 truncate text-xs text-gray-900 `} >
                            <strong>Usuario:</strong>  
                            {movAl.usuario.user}
                        </div>
                        <div className={`flex justify-between  mt-1 truncate text-xs text-gray-900 `} >
                            <strong>Items:</strong>  
                            {movAl.totalItems}
                        </div>
                        {/* <div className={`flex justify-between  mt-1 truncate text-xs text-gray-900 `} >
                            <strong>Valor:</strong>  
                            {movAl.totalValor}
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="flex justify-between p-2"  >
                <div className='flex w-3/5' >
                    <div className="cursor-pointer px-1" onClick={() => handleVerItemsInventario(movAl._id)} >
                    {/* <div className="cursor-pointer px-1" onClick={() => handleDetalle(oc._id)} > */}
                        <EyeIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    </div>
                    {/* <div className="cursor-pointer px-1" onClick={() => handleEditar(movAl._id)} >
                        <DocumentArrowUpIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
                    </div> */}
                    {/* <div className={`cursor-pointer px-1`} onClick={() => handleEditar(oc._id)} >
                        <PencilSquareIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
                    </div> */}
                    {/* <div
                        
                        className={`px-1 ${oc.estado !== estadosOC["pendiente"] ? "cursor-not-allowed text-gray-300" : "cursor-pointer text-yellow-300"}`}
                        onClick={oc.estado === estadosOC["pendiente"] ? () => handleEditar(movAl._id) : undefined}
                    > 
                        <PencilSquareIcon className="h-5 w-5 " aria-hidden="true" />
                    </div>*/}
                    {/* <div className="cursor-pointer font-extrabold px-1" onClick={() => handleEditar(movAl.oc)} >
                        <NoSymbolIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                    </div> */}
                </div>

                <p className={`mt-1 truncate text-xs text-gray-900`}><strong>TOTAL:</strong> S/. {(movAl.totalValor).toFixed(2)}</p>
            </div>
        </>
    )
}

export default ItemMovAl
