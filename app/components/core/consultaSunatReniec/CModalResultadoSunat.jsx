
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { actualizarDatosGenerales, actualizarEstadoPersonaDireccionInsertar } from '@/store/slices/core/persona/personaSlice'
import { useDispatch, useSelector } from 'react-redux'



//import ubigeos from '@/public/static/ubigeo'

export default function CModalResultadoSunat({open, setOpen, dataSunatReniec, formValues, setFormValues}) {

  const dispatch = useDispatch()
  const personaState = useSelector((state) => state.personaValores);

  const [ubigeo, setUbigeo] = useState([])

  useEffect( () => {
    const fetchUbigeoUnico = async () => {
      const response = await fetch(`/api/core/ubigeo/buscar/ubigeoInei/${dataSunatReniec.ubigeo}`)
      const data = await response.json()
        
      setUbigeo(data)
      console.log("UBIGEO EFFECT", ubigeo ) 

    }
    fetchUbigeoUnico()
  }, [] )

  
  
  

  const cancelButtonRef = useRef(null)
  

  const handleUsarDatosSunat = () => {
    const direcValues = {
      ubigeoRef: ubigeo._id,
      alias: 'DIRECCION SUNAT',
      codigoInei: ubigeo.ubigeoInei,
      codigoReniec: ubigeo.ubigeoReniec,
      direc: dataSunatReniec.direccion ,
    }
    
    setFormValues({
      ...formValues,
      razonSocial: `${dataSunatReniec.razonSocial}`, 
      docId: { nombre: "RUC", codigo:"6" },
      ubigeo: { 
        ...formValues.ubigeo,
        ubigeoRef: ubigeo._id, 
        codigoInei: ubigeo.ubigeoInei, 
        codigoReniec: ubigeo.ubigeoReniec, 
        ubicacion: `${ubigeo.distrito} - ${ubigeo.provincia} - ${ubigeo.departamento}` 
      },
      direccion: [direcValues]

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
                      DOCUMENTO ENCONTRADO EN SUNAT
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col items-center ">
                        <div className='text-left' >
                            <table className="text-sm text-gray-500" >
                              <tbody>
                                <tr>
                                    <td className='text-left' >
                                        RUC:
                                    </td>
                                    <td className='text-right' >
                                        <strong>{dataSunatReniec.ruc}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-left' >
                                        Razon Social:
                                    </td>
                                    <td className='text-right' >
                                        <strong>{dataSunatReniec.razonSocial}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-left' >
                                        Direccion:
                                    </td>
                                    <td className='text-right' >
                                        <strong>{dataSunatReniec.direccion}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-left' >
                                        Distrito:
                                    </td>
                                    <td className='text-right' >
                                        <strong>{dataSunatReniec.distrito}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-left' >
                                        Ubigeo:
                                    </td>
                                    <td className='text-right' >
                                        <strong>{dataSunatReniec.ubigeo}</strong>
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
                    onClick={() => handleUsarDatosSunat()}
                  >
                    Usar estos Datos
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
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
