import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'


import Select from 'react-select'
import CErrorAlert from '@/app/components/CErrorAlert'



// const MyComponent = () => (
//   <Select options={options} />
// )

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

export default function CModalMarca({open, setOpen, marcaNombre, setMarcaNombre}) {
  //const [open, setOpen] = useState(true)
  const [marcas, setMarcas] = useState([])
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionNombre, setSelectedOptionNombre] = useState("");

  const [errorAlert, setErrorAlert] = useState(false)
  const [listaErrores, setListaErrores] = useState([])

  const [formValues, setFormValues] = useState({
    nombreMarca:'',
    pais: '',
    desc: ''
  })

  useEffect( () => {
    const fetchMarcas = async () => {
      const response = await fetch('/api/inventario/producto/marca')
      const data = await response.json()
      console.log("DATA = ", data)
        
      setMarcas(data)
     

    }
    fetchMarcas()
  }, [] )


  const handleOnChange = (option) => {
    if (option) {
      setSelectedOption(option.value);
      setSelectedOptionNombre(option.label)
    }
  }
  
  const clearValue = () => {
    setSelectedOption("")
  }
  
  let options = []
    
  
  marcas.map((valor) => {
    let current = { value: valor._id, label: valor.nombreMarca }
    options.push(current)
  })

  const NoOptionsMessage = () => 'No se encontraron opciones';


  const handleSeleccionar = () => {
    console.log("SELECCIONADO = ", selectedOption)
    console.log("SELECCIONADO Nombre = ", selectedOptionNombre)
    setMarcaNombre(selectedOptionNombre)
    setOpen(false)

  }

    
    
  // })

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
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Selecciona Marca
                    </Dialog.Title>
                    {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-full">
                      <div className="mb-4 flex flex-col gap-6">
                        
                        <div className="relative h-11 w-full min-w-[200px]">
                          <Select
                            components={{ NoOptionsMessage }}
                            defaultValue={clearValue}
                            onChange={handleOnChange}
                            options={options}
                            placeholder="Seleecione una Marca"
                            isClearable
                            required
                            
                            

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
