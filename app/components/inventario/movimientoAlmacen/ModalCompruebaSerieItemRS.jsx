import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CErrorAlert from '@/app/components/CErrorAlert'
import { toast } from 'react-toastify'




const ModalCompruebaSerieItemRS = ({ open, setOpen, proceso, producto, formValues, setFormValues, itemsValidados, setItemsValidados, validaTodosItems }) => {

    console.log("PROCESOS = ", proceso)
    console.log("producto = ", producto)

    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])


    const [valorInput, setValorInput] = useState("")

    const handleClickInput = () => {
        
        
        const actualizaProcesos = formValues.proceso.map((actualProceso) => {
            if (actualProceso.idProceso == proceso.idProceso){
                const actualizaProductos = actualProceso.productos.map((actualProducto) => {
                    if (producto.productoId == actualProducto.productoId){
                        let existe = false
                        const actualizaDetalle = actualProducto.detalle.map((actualDetalle) => {
                            if (producto.usaSerie){
                                if (actualDetalle.serie == valorInput || actualDetalle.nroItem == valorInput){
                                    existe = true
                                    console.log("ANTRES DE COMPRARA = ", actualDetalle.serieValidada)
                                    if (actualDetalle.serieValidada){
                                        toast.info(`${valorInput} ya fue verificada!`, {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });    
                                    }else{
                                        actualDetalle.serieValidada = true
                                        actualDetalle.errorSerie = false
                                        actualDetalle.mensajeError = ""
                                        setItemsValidados(itemsValidados + 1)
                                        toast.success(`${valorInput} verificada!`, {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    }
                                    
                                    
                                    
                                }
                            }else{
                                if (actualDetalle.nroItem == valorInput){
                                    existe = true
                                    
                                    if (actualDetalle.serieValidada){
                                        toast.info(`${valorInput}  ya fue verificada!`, {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    }else{
                                        actualDetalle.serieValidada = true
                                        actualDetalle.errorSerie = false
                                        actualDetalle.mensajeError = ""
                                        setItemsValidados(itemsValidados + 1)
                                        toast.success(`${valorInput} verificada!`, {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    }
                                    
                                    
                                }

                            }
                            
                            return actualDetalle
                        })
                        if (!existe){
                            toast.error(`${valorInput} no existe en esta Regulacion!`, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                        }
                    }
                    return actualProducto
                })
            }
            return actualProceso
        })

        setFormValues({
            ...formValues,
            proceso: actualizaProcesos
        })
        

    }


    return (
        <Transition.Root show={open} as={Fragment}>
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
                    {/* <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"> */}
                        <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 lg:w-full sm:max-w-lg sm:p-6">

                            <div className="mt-1 sm:mt-2">
                                <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                    Comprueba Serie / Item
                                </Dialog.Title>
                                {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                                <div className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-full">
                                        <div className="flex items-center">
                                            {/* <SearchItemInventarioProducto producto={currentProducto} index={currentIndex} formValues={formValues} setFormValues={setFormValues} setOpen={setOpen} /> */}
                                            <input
                                                type="text"
                                                className="block w-full rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Ingrese Serie o Nro Item"
                                                onChange={(e) => setValorInput(e.target.value)}
                                                onFocus={e => e.target.select()} 
                                                onClick={e => e.target.select()} 
                                            />
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-r-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                                onClick={()=> handleClickInput()}
                                            >
                                                Verificar
                                            </button>
                                        </div>


                                    <div className="mt-1 flex justify-center sm:mt-6 ">
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

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalCompruebaSerieItemRS