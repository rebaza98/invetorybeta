import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import CErrorAlert from '@/app/components/CErrorAlert'


const CModalEliminarElemento = ({ open, setOpen, elemento, arrayElemento, setArrayElemento }) => {
    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])

    console.log("ELEMENTO = ", elemento)
    console.log("ELEMENTO2 = ", arrayElemento)

    const handleEliminar = () => {
        const updatedArray = arrayElemento.filter((current) => current !== elemento);
    
        setArrayElemento(updatedArray);
        setOpen(false);
    };

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

                    <div>
                    <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Desea Eliminar este Elemento?
                        </Dialog.Title>
                        {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                        <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-full">
                        <div className="mb-2 flex flex-col gap-6">
                          {elemento}

                        </div>

                            <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                                    onClick={()=> handleEliminar()}

                                >
                                    Eliminar
                                </button>
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
                    </div>

                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
  )
}

export default CModalEliminarElemento