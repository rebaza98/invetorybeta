import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from '@headlessui/react'
import LoadingComponent from "../../LoadingComponent"
import { formatearFecha } from "@/utils/core/utils"

const ModalListaItemsMovimientoAlmacen = ({ open, setOpen, movimiento }) => {


    const [itemsInventario, setItemsInventario] = useState([])

    const fechaMovimiento = formatearFecha(movimiento.fechaMovimiento)

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const fetchData = async () => {
        console.log("MOVIMIANTO = MODAL = ", movimiento)
        if (movimiento.esEntrada){
            const response = await fetch(`/api/inventario/itemInventario/buscar/movimientoAlmacen/entrada/${movimiento._id}`)
            const data = await response.json()
            setItemsInventario(data)
        }else{
            const response = await fetch(`/api/inventario/itemInventario/buscar/movimientoAlmacen/salida/${movimiento._id}`)
            const data = await response.json()
            setItemsInventario(data)
        }
        
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4 text-center sm:items-start sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            {/* <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"> */}
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl sm:p-6">

                                <div className='border-2' >
                                    <div className="mt-3  sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                            {movimiento.movimiento ? (
                                                `Movimiento Almacen: ${String(movimiento.movimiento).padStart(5, '0')}`
                                            ) : (
                                                <LoadingComponent mensaje={"Cargando..."} />
                                            )}
                                            
                                        </Dialog.Title>
                                        <div className="px-4 sm:px-6 lg:px-8">
                                            <div className="sm:flex sm:items-center">
                                                <div className="sm:flex-auto">
                                                    <h1 className="text-base font-semibold leading-6 text-gray-900">Empresa</h1>
                                                    <p className="mt-2 text-sm text-gray-700">
                                                        {movimiento.empresa?.nombreEmpresa}
                                                    </p>
                                                </div>
                                                <div className="sm:flex-auto">
                                                    <h1 className="text-base font-semibold leading-6 text-gray-900">Total Items</h1>
                                                    <p className="mt-2 text-sm text-gray-700">
                                                        {movimiento.totalItems}
                                                    </p>
                                                </div>
                                                <div className="sm:flex-auto">
                                                    <h1 className="text-base font-semibold leading-6 text-gray-900">Total Valor</h1>
                                                    <p className="mt-2 text-sm text-gray-700">
                                                        {movimiento.totalValor}
                                                    </p>
                                                </div>
                                                <div className="sm:flex-auto">
                                                    <h1 className="text-base font-semibold leading-6 text-gray-900">Fecha Movimiento</h1>
                                                    <p className="mt-2 text-sm text-gray-700">
                                                        {fechaMovimiento}
                                                    </p>
                                                </div>
                                                
                                               
                                            </div>
                                            <div className="mt-8 flow-root max-h-[300px] overflow-y-auto">
                                                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                                                    <div className="inline-block min-w-full py-2 align-middle">
                                                        <table className="min-w-full border-separate border-spacing-0">
                                                            <thead>
                                                                <tr>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                                                    >
                                                                        Nombre
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                                                    >
                                                                        SKU
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                                                    >
                                                                        Modelo
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                                                    >
                                                                        Marca
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        Precio
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                    >
                                                                        Serie
                                                                    </th>
                                                                    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                               
                                                                {itemsInventario?.map((item, idx) => (
                                                                    <tr key={idx}>
                                                                        
                                                                        <td
                                                                            className={classNames(
                                                                                idx !== item.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            )}
                                                                        >
                                                                            {item.producto.productoRef.nombreProducto}
                                                                        </td>
                                                                        <td
                                                                            className={classNames(
                                                                                idx !== item.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                                                                            )}
                                                                        >
                                                                            {item.producto.productoRef.sku}
                                                                        </td>
                                                                        <td
                                                                            className={classNames(
                                                                                idx !== item.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                                                                            )}
                                                                        >
                                                                            {item.producto.productoRef.modelo}
                                                                        </td>
                                                                        <td
                                                                            className={classNames(
                                                                                idx !== item.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                                                                            )}
                                                                        >
                                                                            {item.producto.productoRef.marca.nombreMarca}
                                                                        </td>
                                                                        <td
                                                                            className={classNames(
                                                                                idx !== item.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                                                                            )}
                                                                        >
                                                                            S/.{parseFloat(item.precioEntrada).toFixed(2)}
                                                                        </td>
                                                                        <td
                                                                            className={classNames(
                                                                                idx !== item.length - 1 ? 'border-b border-gray-200' : '',
                                                                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                                                                            )}
                                                                        >
                                                                            {item.nroSerie}   
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='flex justify-end mt-2 w-full' >
                                                <div className='w-1/4 flex justify-between items-center' >
                                                    <h1 className="text-sm font-semibold  text-gray-900">Total: </h1>
                                                    <div className="  text-gray-700">
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex mt-1 sm:mt-6  mb-4">
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Cerrar
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalListaItemsMovimientoAlmacen
