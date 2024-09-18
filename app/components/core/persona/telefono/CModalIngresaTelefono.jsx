import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'


import Select from 'react-select'
import CErrorAlert from '@/app/components/CErrorAlert'

import opTel from '@/public/static/operadorTelefonico'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarEstadoPersonaTelefonoInsertar } from '@/store/slices/core/persona/personaSlice'
import { toast } from 'react-toastify'

const CModalIngresaTelefono = ({ open, setOpen, formValues, setFormValues}) => {


    const dispatch = useDispatch()
    
    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])

    const [formTelefValues, setFormTelefValues] = useState({
        alias: '',
        numero: '',
        operador: '',
    })

    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptionNombre, setSelectedOptionNombre] = useState("");

    const handleOnChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        const selectedIndex = event.target.selectedIndex;
        const selectedText = event.target.options[selectedIndex].text;
        setSelectedOptionNombre(selectedText)
        setFormTelefValues({...formTelefValues, operador: selectedText})
    };
    
    // ESTADO ERROR
    const [numeroInput, setNumeroInput] = useState(false)

    const handleGuardar = () => {
        setNumeroInput(false)
        setErrorAlert(false)
        let errores = []

        if (formTelefValues.numero === ""){
            setNumeroInput(true)
            errores.push("Ingrese Algun Telefono Valido")
            toast.error('Ingrese Algun Telefono Valido', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        if (errores.length == 0){
            setFormValues({
                ...formValues,
                telefono: [...formValues.telefono, formTelefValues]
            })
            setOpen(false)

        }else{
            console.log("ERRORES = ", errores)
            setListaErrores(errores)
            //setErrorAlert(true)
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
                <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                        <div className="mt-3  sm:mt-5">
                            <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                            Ingrese Telefono
                            </Dialog.Title>
                            {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                            <form className="mt-2 mb-2 w-80 max-w-screen-sm sm:w-full">
                            <div>
                                    {/* <SearchUbigeo formUbigeoValues={formUbigeoValues} setFormUbigeoValues={setFormUbigeoValues} /> */}
                                    <div className='mt-2' >
                                        <label htmlFor="alias" className="block text-sm font-medium leading-6 text-gray-900">
                                            Alias
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="alias"
                                                id="alias"
                                                value={formTelefValues.alias} 
                                                onChange={e => setFormTelefValues({...formTelefValues, alias:e.target.value.toUpperCase()})}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div> 

                                    <div className='mt-2' >
                                        <label htmlFor="numero" className="block text-sm font-medium leading-6 text-gray-900">
                                            Numero
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="numero"
                                                id="numero"
                                                value={formTelefValues.numero} 
//                                                onChange={e => setFormTelefValues({...formTelefValues, numero: e.target.value})}
                                                //className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                className={`block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                    numeroInput ? 'border-1 border-red-500 ' : 'border-0' // Agrega la clase border-red-500 si hay error en dirección
                                                }`}
                                                onChange={e => {
                                                    setNumeroInput(false)
                                                    setFormTelefValues({...formTelefValues, numero: e.target.value})
                                                }}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div> 

                                    <div className='mt-2' >
                                        <label htmlFor="operador" className="block text-sm font-medium leading-6 text-gray-900">
                                            Operador
                                        </label>
                                        <select
                                            id="operador"
                                            name="operador"
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={selectedOption}
                                            onChange={handleOnChange}

                                        >
                                            <option value="" disabled >
                                                Seleccione un operador
                                            </option>

                                            {opTel.map((item, i) => (
                                                <option value={item.nombre} key={i} >{item.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                   
                                </div>

                                

                                <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        onClick={() => handleGuardar()}

                                    >
                                        Ingresar
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

export default CModalIngresaTelefono