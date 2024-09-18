import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CErrorAlert from '@/app/components/CErrorAlert'
import SearchCategoriaProducto from '../producto/SearchCategoriaProducto'




const CModalIngresaImagenRelacionada = ({ open, setOpen, formValues, setFormValues }) => {

    


    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])

    const[formValuesImagenRelacionada, setFormValuesImagenRelacionada] = useState({
        alias: '',
        imagenUrl: '',
    })


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
                                    Ingrese Imagen
                                </Dialog.Title>
                                {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                                    <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-full">
                                        <div className='mt-2' >
                                            <label htmlFor="alias" className="block text-sm font-medium leading-6 text-gray-900">
                                                Alias
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="alias"
                                                    id="alias"
                                                    value={formValuesImagenRelacionada.alias} 
                                                    onChange={e => setFormValuesImagenRelacionada({...formValuesImagenRelacionada, alias:e.target.value.toUpperCase()})}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    autoComplete='off'
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <label
                                                
                                                    htmlFor="file-upload"
                                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    <span>Subir un Archivo</span>
                                                    <input id="file-upload" name="file-upload" 
                                                        type="file" onChange={() => { }} className="sr-only" 
                                                        disabled
                                                    />
                                                </label>
                                            </div>

                                        </div>

                                        
                                        <div className="mt-1 flex justify-center sm:mt-6 ">
                                            <button
                                                type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>



                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default CModalIngresaImagenRelacionada