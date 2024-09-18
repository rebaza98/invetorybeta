import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'


import Select from 'react-select'
import CErrorAlert from '@/app/components/CErrorAlert'
import SearchEspecificacionCategoria from '../categoria/SearchEspecificacionCategoria'




const CModalIngresaEspecificacion = ({ open, setOpen, formValues, setFormValues }) => {

    


    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])

    const [especificaciones, setEspecificaciones] = useState([])
    const [selectedOption, setSelectedOption] = useState("");
    //const [nombreEspec, setNombreEspec] = useState("")

    // const [formValues, setFormValues] = useState({
    //     idEspecificacion: '',
    //     nombreEspecificacion:'',
    //     valor: ''
    // })

    const [formEspecValues, setFormEspecValues] = useState({
        nombreEspec:'',
        desc: '',
      })
    

    useEffect( () => {
        const fectchEspecificaciones = async () => {
          const response = await fetch('/api/inventario/producto/especificacion')
          const data = await response.json()
            
          setEspecificaciones(data)
         
    
        }
        fectchEspecificaciones()

        //PRUEBA IMPACTO
        

    }, [] )
    
    const handleOnChange = (option) => {
        if (option) {
            console.log("OPRTION VALUE ", option.value)
            console.log("OPRTION TEXT ", option.label)
            setSelectedOption(option.value);
            setFormEspecValues({...formEspecValues, nombreEspec: option.label})
        } else {
            setSelectedOption('');
            setFormEspecValues({...formEspecValues, nombreEspec: ""})
        }
    }

    const clearValue = () => {
        setSelectedOption("")
    }
    
  //  let options = []
    
    
    // especificaciones.map((valor) => {
    // let current = { value: valor._id, label: valor.nombreEspecificacion }
    //     options.push(current)
    // })

    const options = especificaciones
    .filter((opcion) =>
      !formValues.especs.some((especIngresada) => especIngresada.nombreEspec === opcion.nombreEspecificacion)
    )
    .map((opcion) => ({ value: opcion._id, label: opcion.nombreEspecificacion }));
  
  console.log(options);
    const NoOptionsMessage = () => 'No se encontraron opciones';


    const handleGuardar = () => {
        setErrorAlert(false)
        let errores = []

        console.log("SELECTED OPTION", selectedOption)
        // if(selectedOption.valueOf() ){
        //   //formValues.idEspecificacion = selectedOption
        //     setFormEspecValues({...formEspecValues, nombreEspec: nombreEspec})
          
        // } 

        if (formEspecValues.nombreEspec === ""){
            errores.push("La especificacion es Obligatoria")
        }


        if (errores.length == 0){
            setFormValues({
                ...formValues, 
                espec: [ ...formValues.espec, formEspecValues]
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
                    {/* <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"> */}
                        <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 lg:w-full sm:max-w-lg sm:p-6">

                            <div className="mt-1 sm:mt-2">
                                <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                    Buscar Especificacion
                                </Dialog.Title>
                                {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                                <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-full">
                                    <div>
                                        <SearchEspecificacionCategoria formValues={formValues} setFormValues={setFormValues} setOpen={setOpen} />
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

export default CModalIngresaEspecificacion