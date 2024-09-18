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

export default function CModalNuevaMarca({open, setOpen}) {
  //const [open, setOpen] = useState(true)
  const [paises, setPaises] = useState([])
  const [selectedOption, setSelectedOption] = useState("");

  const [errorAlert, setErrorAlert] = useState(false)
  const [listaErrores, setListaErrores] = useState([])

  const [formValues, setFormValues] = useState({
    nombreMarca:'',
    pais: '',
    desc: ''
  })

  useEffect( () => {
    const fectchPaises = async () => {
      const response = await fetch('/api/core/pais')
      const data = await response.json()
      console.log("DATA = ", data)
        
      setPaises(data)
     

    }
    fectchPaises()
  }, [] )


  const handleOnChange = (option) => {
    if (option) {
      setSelectedOption(option.value);
    } else {
      setSelectedOption('');
    }
  }
  
  const clearValue = () => {
    setSelectedOption("")
  }
  
  let options = []
    
  
  paises.map((valor) => {
    let current = { value: valor.nombrePais, label: valor.nombrePais }
    options.push(current)
  })

  const NoOptionsMessage = () => 'No se encontraron opciones';


  const handleSubmit = async (e) => {
    setErrorAlert(false)
    e.preventDefault()
    let errores = []

    
    console.table(formValues)
    //validaciones

    if(formValues.nombreMarca === ""){
      errores.push("EL nombre de Marca es Obligatorio")
    } 
    
    console.log("SELECTED OPTION", selectedOption)
    if(selectedOption.valueOf() ){
      formValues.pais = selectedOption
      
    }else{
      errores.push("EL Pais de Marca es Obligatorio")
    } 
    if(errores.length == 0){
      console.table(formValues)
      try {
        const response = await fetch('/api/inventario/producto/marca/nuevo', {
          method: 'POST',
          body: JSON.stringify({
            nombreMarca: formValues.nombreMarca,
            pais: formValues.pais,
            desc: formValues.desc
          })
        })
        if (response.ok) {
          setOpen(false)
            console.log("SE INSERTO CORRECTAMENTE")

        }

      } catch (error) {
        console.log("Algo salio mal")
      }
    }else{
      setErrorAlert(true)
      setListaErrores(errores)
    }
        
    




    
  //  
    
    
    

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3  sm:mt-5">
                    <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                      Nueva Marca
                    </Dialog.Title>
                    {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-full">
                      <div className='mt-2' >
                        <label htmlFor="idnombreMarca" className="block text-sm font-medium leading-6 text-gray-900">
                          Nombre de Marca
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="nombreMarca"
                            id="idnombreMarca"
                            value={formValues.nombreMarca}
                            onChange={e => setFormValues({ ...formValues, nombreMarca: e.target.value })}
                            className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            autoComplete='off'
                          />
                        </div>
                      </div>
                      <div className='mt-2' >
                        <label htmlFor="idDesc" className="block text-sm font-medium leading-6 text-gray-900">
                        Descripcion
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="dec"
                            id="idDesc"
                            value={formValues.desc}
                            onChange={e => setFormValues({ ...formValues, desc: e.target.value })}
                            className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            autoComplete='off'
                          />
                        </div>
                      </div>
                      <div className="mt-2 mb-4 flex flex-col gap-3">
                        <label htmlFor="idPais" className="block text-sm font-medium leading-6 text-gray-900">
                          Pais
                        </label>
                          <Select
                            components={{ NoOptionsMessage }}
                            defaultValue={clearValue}
                            onChange={handleOnChange}
                            options={options}
                            placeholder="Seleecione un Pais"
                            isClearable
                            required
                            id='idPais'
                          />
                      </div>
                      <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                          onClick={handleSubmit}

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
