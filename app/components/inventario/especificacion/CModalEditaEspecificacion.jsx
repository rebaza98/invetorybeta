import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Select from 'react-select'
import CErrorAlert from '@/app/components/CErrorAlert'

const CModalEditaEspecificacion = ({ open, setOpen, especificacion, arrayEspec, setArrayEspec }) => {
    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])

    const [especificaciones, setEspecificaciones] = useState([])

    const [selectedOption, setSelectedOption] = useState(especificacion.idEspecificacion)
    const [nombreEspec, setNombreEspec] = useState(especificacion.nombreEspecificacion)
    const [valor, setValor] = useState(especificacion.valor)

    useEffect( () => {
        const fectchEspecificaciones = async () => {
        const response = await fetch('/api/inventario/producto/especificacion')
        const data = await response.json()
        console.log("DATA = ", data)
            
        setEspecificaciones(data)
     

    }
    fectchEspecificaciones()
    }, [] )

    const clearValue = () => {
        setSelectedOption("")
    }
    
    let options = []
    
    
    especificaciones.map((valor) => {
    let current = { value: valor._id, label: valor.nombreEspecificacion }
        options.push(current)
    })

  const handleOnChange = (option) => {
    if (option) {
      setSelectedOption(option.value)
      setNombreEspec(option.label)
    } else {
      setSelectedOption('')
      setNombreEspec('')
    }
  }

  const handleGuardar = () => {
    setErrorAlert(false)
    let errores = []

    if (!selectedOption) {
      errores.push('La especificacion es Obligatoria')
    }

    if (!nombreEspec) {
      errores.push('La especificacion es Obligatoria')
    }

    if (!valor) {
      errores.push('El Valor es Obligatorio')
    }

    if (errores.length === 0) {
      // Actualiza la especificación en el arreglo original
      const updatedArrayEspec = arrayEspec.map((espec) =>
        espec === especificacion ? { ...espec, idEspecificacion: selectedOption, nombreEspecificacion: nombreEspec, valor: valor } : espec
      )
      setArrayEspec(updatedArrayEspec)
    } else {
      console.log('ERRORES = ', errores)
    }

    // Cierra el modal de edición
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Editar Especificacion
                    </Dialog.Title>
                    {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-full">
                      <div className="relative h-11 w-full min-w-[200px]">
                        <Select
                          defaultValue={{ value: selectedOption, label: nombreEspec }}
                          onChange={handleOnChange}
                          options={options}
                          placeholder="Seleecione Especificacion"
                          isClearable
                          required
                        />
                      </div>
                      <div className="mb-4 flex flex-col gap-6">
                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            className="peer uppercase h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            required
                          />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Valor
                          </label>
                        </div>
                      </div>
                      <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                          onClick={handleGuardar}
                        >
                          Guardar
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

export default CModalEditaEspecificacion
