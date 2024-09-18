'use client'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { formOrdenCompraInit } from '@/utils/compras/utils'
import LoadingComponent from '../LoadingComponent'
import ListaFlujo from './ListaFlujo'




const ModalVerFlujo = ({ open, setOpen, flujo }) => {

    console.log("EL FLUJO ES = ", flujo)
    
    const [flujos, setFlujos] = useState([])
    //asyncs
    const fetchPopulateData = async () => {
        const arrayFlujo = await Promise.all(flujo.map(async (current) => {
            console.log("CUERENT = ", current);
            if (current.tipoProceso === "ECP") {
                const response = await fetch(`/api/compras/ordenCompra/buscar/${current.procesoId}`);
                const data = await response.json();
                console.log("CUERENT EECPP = ", current);
                return {
                    tipo: "ECP",
                    data: data,
                };
            }
            if (current.tipoProceso === "MEA") {
                const response = await fetch(`/api/inventario/movimientoAlmacen/buscar/${current.procesoId}`);
                const data = await response.json();
                console.log("CUERENT MEAMEA = ", current);
                return {
                    tipo: "MEA",
                    data: data,
                };
            }
            if (current.tipoProceso === "MSA") {
                const response = await fetch(`/api/inventario/movimientoAlmacen/buscar/${current.procesoId}`);
                const data = await response.json();
                console.log("CUERENT MSA = ", current);
                return {
                    tipo: "MSA",
                    data: data,
                };
            }
            if (current.tipoProceso === "ERF") {
                const response = await fetch(`/api/regulaciones/regulacionEntrada/buscar/${current.procesoId}`);
                const data = await response.json();
                console.log("CUERENT ERF = ", current);
                return {
                    tipo: "ERF",
                    data: data,
                };
            }
            if (current.tipoProceso === "SRF") {
                const response = await fetch(`/api/regulaciones/regulacionSalida/buscar/${current.procesoId}`);
                const data = await response.json();
                console.log("CUERENT SRF = ", current);
                return {
                    tipo: "SRF",
                    data: data,
                };
            }

        }));
        console.log("FLUJO AHORA ES = ", arrayFlujo)
        setFlujos(arrayFlujo);
    };
    


    useEffect(() => {
        fetchPopulateData()
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">

                                <div className='border-2' >
                                    <div className="mt-3  sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                            FLUJO
                                            
                                        </Dialog.Title>
                                        <div className="px-4 sm:px-6 lg:px-8">
                                            {flujos.length > 0 ? (
                                                <ListaFlujo flujos={flujos} />
                                            ) : (
                                                <LoadingComponent mensaje="Cargando..." />
                                            )}
                                            
                                          
                                            
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

export default ModalVerFlujo
