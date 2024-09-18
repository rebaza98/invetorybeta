import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'


const ModalResumenMovimientoAlmacenECP = ({params, movimiento, empresa, almacen, open, setOpen, totalItems, totalValor}) => {
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const router = useRouter()
    const handleGuardarClick = async() => {
        setIsSubmitting(true)
        try{
            let toastId2 = toast.loading('Guardando Movimiento de Almacen...', { autoClose: false });
            const response = await fetch('/api/inventario/movimientoAlmacen/entrada/compra/nuevo', {
                method: 'POST',
                body: JSON.stringify({
                  movimiento: movimiento,
                  empresa: {
                    empresaRef: empresa.empresaRef,
                    nombreEmpresa: empresa.nombreEmpresa,
                    nroDocEmpresa: empresa.nroDocEmpresa
                  },
                  almacen: {
                    almacenRef: almacen.almacenRef,
                    alias: almacen.alias
                  },
                  totalValor,
                  totalItems,
                  

                })
            })
            if (!response.ok){
                toast.update(toastId2, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
                const mensajeModificado = await response.json()
                if(mensajeModificado){
                    toast.update(toastId2, { type: 'error', render: `Los Procesos: ${mensajeModificado.mensaje} fueron modificados durante la creacion , vuelva a seleccionarlos...`, isLoading: false, autoClose: true });
                }
                console.log("Hubo un error al guardar Movimiento...", response)
                setIsSubmitting(false)
                
                
            }else{
                const savedMovimiento = await response.json(); // Obtener el objeto JSON del servidor
                console.log("SE INGRESO CORRECTAMENTE")
                toast.update(toastId2, { type: 'success', render: `Movimiento Grabado con exito...`, isLoading: false, autoClose: true });    
                //toast.update(toastId, { type: 'success', render: `Orden Compra ${savedOrdenCompra.empresa.nombreEmpresa} OC: ${String(savedOrdenCompra.ocEmpresa).padStart(5, '0') } Grabada con exito...`, isLoading: false, autoClose: true });
                router.push(`/inventario/movimientosAlmacen/${params.almacenId}`)
            }

        }catch{
            setIsSubmitting(false)

        }finally{
            setTimeout(() => {
                toast.dismiss();
            }, 5000);
            
        }
        
    }

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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">

                                    <div className='border-2' >
                                        <div className="mt-3  sm:mt-5">
                                            <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                                RESUMEN DE MOVIMIENTO
                                                
                                            </Dialog.Title>
                                            <div className="px-4 sm:px-6 lg:px-8">
                                                <div className="sm:flex sm:items-center">
                                                    <div className="sm:flex-auto">
                                                        <h1 className="text-base font-semibold leading-6 text-gray-900">Empresa</h1>
                                                        <p className="mt-2 text-sm text-gray-700">
                                                            {empresa.nombreEmpresa}
                                                        </p>
                                                    </div>
                                                    <div className="sm:flex-auto">
                                                        <h1 className="text-base font-semibold leading-6 text-gray-900">Almacen</h1>
                                                        <p className="mt-2 text-sm text-gray-700">
                                                            {almacen.alias}
                                                        </p>
                                                    </div>
                                                    <div className="sm:flex-auto">
                                                        <h1 className="text-base font-semibold leading-6 text-gray-900">Usuario</h1>
                                                        <p className="mt-2 text-sm text-gray-700">
                                                            {"oc.proveedor?.numeroDoc"}
                                                        </p>
                                                    </div>
                                                
                                                </div>
                                                <div className="mt-8 flow-root max-h-[300px] overflow-y-auto">
                                                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                                                        <div className="inline-block min-w-full py-2 align-middle">
                                                            <table className="min-w-full border-separate border-spacing-0 text-center ">
                                                                <thead>
                                                                    <tr  >
                                                                        <th
                                                                            scope="col"
                                                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8 w-2/12 "
                                                                        >
                                                                            Orden Compra
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5  text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell w-4/12"
                                                                        >
                                                                            Proveedor
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5  text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell w-2/12"
                                                                        >
                                                                            Nro Documento
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5  text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell w-1/12"
                                                                        >
                                                                            Items 
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5  text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                                        >
                                                                            Valor
                                                                        </th>
                                                                        {/* <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Columna 1</th>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">Columna 2</th>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Columna 3</th>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Columna 4</th>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Columna 5</th> */}
                                                                        
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {movimiento.proceso.map((proceso, idx) => (
                                                                        // <tr key={producto.productoRef}>
                                                                        <tr key={idx}>
                                                                            
                                                                            <td
                                                                                className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                                
                                                                            >
                                                                                {String(proceso.ocEmpresa).padStart(5, '0')}
                                                                            </td>
                                                                            <td
                                                                                className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            >
                                                                                {proceso.proveedor.razonSocial}
                                                                            </td>
                                                                            <td
                                                                                className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            >
                                                                                {proceso.proveedor.numeroDoc}
                                                                            </td>
                                                                            <td
                                                                                className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            >
                                                                                {proceso.cantidadItems}
                                                                            </td>
                                                                            <td
                                                                                className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                                            >
                                                                                {proceso.total.toFixed(2)}
                                                                            </td>
                                                                            
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                </div>
                                            <div className='flex  justify-between mt-2 w-full' >
                                                <div className="w-2/3">
                                                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                                        Observacion:
                                                    </label>
                                                    <textarea
                                                        id="desc"
                                                        name="desc"
                                                        //  value={formValues.desc}
                                                        //onChange={e => setFormValues({ ...formValues, desc: e.target.value })}
                                                        rows="2" // Define la cantidad de filas del textarea
                                                        className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-0"
                                                    />
                                                </div>
                                                <div className='w-1/4 border-2 rounded-lg items-center p-2' >
                                                        <div className='flex justify-between' >
                                                            <h1 className="text-sm font-semibold  text-gray-900">Total Items: </h1>
                                                            <div className="  text-gray-700">
                                                                {totalItems}
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-between' >
                                                            <h1 className="text-sm font-semibold  text-gray-900">Total Valor: </h1>
                                                            <div className="  text-gray-700">
                                                                S/.{(totalValor).toFixed(2)}
                                                            </div>
                                                        </div>
                                                    
                                                    
                                                </div>
                                                

                                            </div>
                                            <div className="flex justify-between mt-1 sm:mt-6  mb-4">
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex  justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    onClick={handleGuardarClick}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Guardando...' : 'Grabar'}
                                                    
                                                    <ArrowRightEndOnRectangleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
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

export default ModalResumenMovimientoAlmacenECP
