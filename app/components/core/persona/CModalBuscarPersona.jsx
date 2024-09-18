import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CErrorAlert from '@/app/components/CErrorAlert'
import { PlusIcon } from '@heroicons/react/20/solid'
import CModalIngresaPersona from '../../core/persona/CModalIngresaPersona'
import SearchClienteOV from '../../ventas/ventaRegular/SearchClienteOV'




const CModalIngresaProveedorOC = ({ open, setOpen, formValues, setFormValues }) => {

    

    const [modalIngresaPersona, setModalIngresaPersona] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])


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
                                    <div className='flex justify-center' >
                                        <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                            Buscar Proveedor

                                        </Dialog.Title>
                                        <span className='ml-4' >
                                            <button
                                                type="button"
                                                className="flex items-center  rounded-full bg-green-600 p-0.5 text-white shadow-sm hover:bg-indigo-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-green w-5 h-5"
                                                onClick={() => setModalIngresaPersona(true)}
                                            >
                                                <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                            </button>
                                            {modalIngresaPersona && <CModalIngresaPersona open={modalIngresaPersona} setOpen={setModalIngresaPersona} setParentModal={setOpen} formValues={formValues} setFormValues={setFormValues} />}
                                        </span>
                                    </div>
                                
                                {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                                <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-full">
                                    <div>
                                        <SearchClienteOV formValues={formValues} setFormValues={setFormValues} setOpen={setOpen} />
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

export default CModalIngresaProveedorOC