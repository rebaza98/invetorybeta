
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'



export default function CModalResultadoReniec({open, setOpen, dataSunatReniec, formValues, setFormValues}) {

  const cancelButtonRef = useRef(null)

  const handleUsarDatosReniec = () => {
    setFormValues({
      ...formValues,
      razonSocial: `${dataSunatReniec.nombres} ${dataSunatReniec.apellidoPaterno} ${dataSunatReniec.apellidoMaterno}`, 
      representante: `${dataSunatReniec.nombres} ${dataSunatReniec.apellidoPaterno} ${dataSunatReniec.apellidoMaterno}`, 
      docId:  {
                ...formValues.docId,
                nombre: "DNI", 
                codigo:"1" 
              },
      ubigeo:  {
                ...formValues.ubigeo,
                codigoInei: '',
                codigoReniec: '',
                ubicacion: '',
                desc: ''
              },
      direccion:[]
    })

    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-start sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      DOCUMENTO ENCONTRADO EN RENIEC
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col items-center ">
                        <div className='text-left' >
                            <table className="text-sm text-gray-500" >
                              <tbody>
                                <tr>
                                      <td className='text-left' >
                                          DNI:
                                      </td>
                                      <td className='text-right' >
                                          <strong>{dataSunatReniec.dni}</strong>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td className='text-left' >
                                          Nombres:
                                      </td>
                                      <td className='text-right' >
                                          <strong>{dataSunatReniec.nombres}</strong>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td className='text-left' >
                                          Apellido Paterno:
                                      </td>
                                      <td className='text-right' >
                                          <strong>{dataSunatReniec.apellidoPaterno}</strong>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td className='text-left' >
                                          Apellido Materno:
                                      </td>
                                      <td className='text-right' >
                                          <strong>{dataSunatReniec.apellidoMaterno}</strong>
                                      </td>
                                </tr>
                              </tbody>
                                
                            </table>
                        </div>
                      
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => handleUsarDatosReniec()}
                  >
                    Usar estos Datos
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
