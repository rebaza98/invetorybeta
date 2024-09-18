import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CErrorAlert from '@/app/components/CErrorAlert'
import SearchUbigeo from './SearchUbigeo'

export default function CModalSeleccionaUbigeo({open, setOpen, formValues, setFormValues}) {


  const [errorAlert, setErrorAlert] = useState(false)
  const [listaErrores, setListaErrores] = useState([])

  const [formUbigeoValues, setFormUbigeoValues] = useState({
    ubigeoRef: formValues.ubigeo?.ubigeoRef || null,
    codigoInei: formValues.ubigeo?.codigoInei || '',
    codigoReniec: formValues.ubigeo?.codigoReniec || '',
    ubicacion: formValues.ubigeo?.ubicacion || '',
  });

  


  const handleSeleccionar = () => {

    setErrorAlert(false)
    let errores = []
    console.log("formUbigeoValues.codigoInei = ", formUbigeoValues.codigoInei)

    if (formUbigeoValues.codigoInei === ""){
      errores.push("Seleccione un Ubigeo")
    }
    if (formUbigeoValues.ubicacion === ""){
      errores.push("Seleccione una Ubicacion")
    }

    if (errores.length === 0){
      // dispatch(actualizarEstadoPersonaUbigeo({ 
      //   ubigeoRef: formUbigeoValues.ubigeoRef,
      //   codigoInei: formUbigeoValues.codigoInei,
      //   codigoReniec: formUbigeoValues.codigoReniec,
      //   ubicacion:  formUbigeoValues.ubicacion
      // }))
      setFormValues(
        {
          ...formValues,
          ubigeo:{
            ...formValues.ubigeo,
            ubigeoRef: formUbigeoValues.ubigeoRef,
            codigoInei: formUbigeoValues.codigoInei,
            codigoReniec: formUbigeoValues.codigoReniec,
            ubicacion:  formUbigeoValues.ubicacion
          }

      })

      setOpen(false)

    }else{
      console.log("ERRORES = ", errores)
      setErrorAlert(true)
      setListaErrores(errores)
    }


    

    

    //setOpen(false)
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
              <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 lg:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3  sm:mt-5">
                    <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                      Seleccione UBIGEO
                    </Dialog.Title>
                    {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                    <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-full">
                      <div>
                        
                        {/* <SearchUbigeo/> */}
                        {/* <SearchUbigeo updateInputValue={(value) => setFormUbigeoValues({ ...formUbigeoValues, codigoInei: value })} /> */}
                        <SearchUbigeo formUbigeoValues={formUbigeoValues} setFormUbigeoValues={setFormUbigeoValues} />
                        <label htmlFor="idubigeo" className="block text-sm font-medium leading-6 text-gray-900">
                          Ubigeo
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="ubigeo"
                            id="idubigeo"
                            value={formUbigeoValues.codigoInei} 
                            // onChange={e => setFormUbigeoValues({ ...formUbigeoValues, codigoInei: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-200 "
                            readOnly
                          />
                        </div>

                       
                        <label htmlFor="idubicacion" className="block text-sm font-medium leading-6 text-gray-900">
                          Ubicacion
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="ubicacion"
                            id="idubicacion"
                            value={formUbigeoValues.ubicacion} 
                            // onChange={e => setFormUbigeoValues({ ...formUbigeoValues, ubicacion: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-200"
                            readOnly
                          />
                        </div>
                      </div>
                   
                      <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                          onClick={handleSeleccionar}
                        >
                          Seleccionar
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
