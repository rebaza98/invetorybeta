import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'


import Select from 'react-select'
import CErrorAlert from '@/app/components/CErrorAlert'

import docId from '@/public/static/documentoIdentidad'

import { actualizarEstadoPersonaDocId } from '@/store/slices/core/persona/personaSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function CModalSeleccionaDocId({open, setOpen, formValues, setFormValues}) {

  const personaState = useSelector(state => state.personaValores);
  const dispatch = useDispatch()


  const [documentos, setDocumentos] = useState([])
  const [selectedOption, setSelectedOption] = useState(formValues.docId.codigo || "");
  const [selectedOptionNombre, setSelectedOptionNombre] = useState(formValues.docId.codigo || "");

  const [errorAlert, setErrorAlert] = useState(false)
  const [listaErrores, setListaErrores] = useState([])



  const handleOnChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    setSelectedOptionNombre(selectedText)
  };
  


  const handleSeleccionar = () => {

    setErrorAlert(false)
    let errores = []

    if (selectedOption === ""){
      errores.push("Seleccione un tipo de documento")
    }

    if (errores.length == 0){
      setFormValues(
        { ...formValues, 
          docId: { 
            ...formValues.docId, 
            codigo: selectedOption, 
            nombre: selectedOptionNombre  
          } 
        })
          
      setOpen(false)

    }else{
      console.log("ERRORES = ", errores)
      setErrorAlert(true)
      setListaErrores(errores)
    }



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
              <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3  sm:mt-5">
                    <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                      Seleccione Tipo de Documento
                    </Dialog.Title>
                    {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                    <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-full">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                          Tipo de Documento
                        </label>
                        <select
                          id="tipoDoc"
                          name="tipoDoc"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={selectedOption}
                          onChange={handleOnChange}
                          
                        >
                          <option value="" disabled >
                            Seleccione un tipo de documento
                          </option>

                          {docId.map((item, i)=> (
                            <option value={item.codigo} key={i} >{item.nombre}</option>
                          ))}
                        </select>
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
