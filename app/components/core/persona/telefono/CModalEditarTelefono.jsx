import { Fragment, useState } from 'react'
import { Dialog, Transition, Popover } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import CErrorAlert from '@/app/components/CErrorAlert'
import opTel from '@/public/static/operadorTelefonico'

import { toast } from 'react-toastify'


function ConfirmationDialog({modalEliminarTelefono, setModalEliminarTelefono, telefono, formValues, setFormValues, setOpenModalPrincipal}) {
    
    const handleEliminar = () => {
        
        const updatedArrayTelef = formValues.telefono.filter((current) => current !== telefono)
        setFormValues({
            ...formValues,
            telefono: updatedArrayTelef
        })
        setModalEliminarTelefono(false)
        setOpenModalPrincipal(false)
    }
  
    return (
      <Transition.Root show={modalEliminarTelefono} as={Fragment}>
        <Dialog as="div" className="relative z-10"  onClose={() => { }}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Eliminar Telefono
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Esta Seguro que desea Eliminar este Telefono?
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:col-start-2"
                    onClick={()=> handleEliminar()}
                >
                    Si, Eliminar
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setModalEliminarTelefono(false)}
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

function DropDownEditarTelefono({open, setOpen}) {

    return (
        <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" tabIndex="-1">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute top-0 right-0 mt-5 flex w-screen max-w-xs px-2">
                    <div className="w-8 flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-1">
                            <div className="group relative flex rounded-lg p-2 hover:bg-gray-50">
                                <div className="w-full">
                                    <button
                                        onClick={() => { setOpen(true) }}
                                        className="inline-flex w-full justify-center items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        Eliminar Telefono
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
  }







const CModalEditarTelefono = ({ open, setOpen, telefono, formValues, setFormValues }) => {

    

    const [formTelefValues, setFormTelefValues] = useState({
        alias: telefono.alias,
        numero: telefono.numero,
        operador: telefono.operador,
    })

    const [modalEliminarTelefono, setModalEliminarTelefono] = useState(false)

    const [selectedOption, setSelectedOption] = useState( telefono.operador || "");
    const [selectedOptionNombre, setSelectedOptionNombre] = useState(telefono.operador || "");

    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])


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
            const updatedArrayTelef = formValues.telefono.map((telef) =>
                telef === telefono ? formTelefValues : telef
            );
            setFormValues({
                ...formValues,
                telefono: updatedArrayTelef
            })
            setOpen(false);
            

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
                    <div className="absolute top-0 right-0 m-4">
                        <DropDownEditarTelefono telefono={telefono} setOpen={setModalEliminarTelefono} />
                    </div>
                    <div>
                        <div className="mt-3  sm:mt-5">
                            <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                            Editar Telefono
                            </Dialog.Title>
                            {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                            <form className="mt-2 mb-2 w-80 max-w-screen-sm sm:w-full">
                            {modalEliminarTelefono && <ConfirmationDialog modalEliminarTelefono={modalEliminarTelefono} setModalEliminarTelefono={setModalEliminarTelefono} telefono={telefono} formValues={formValues} setFormValues={setFormValues} setOpenModalPrincipal={setOpen} />}    
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
                                                onClick={e => e.target.select()} 
                                                
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
                                                className={`block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                    numeroInput ? 'border-1 border-red-500 ' : 'border-0' // Agrega la clase border-red-500 si hay error en dirección
                                                }`}
                                                onChange={e => {
                                                    setNumeroInput(false)
                                                    setFormTelefValues({...formTelefValues, numero: e.target.value})
                                                }}
                                                autoComplete='off'
                                                onFocus={e => e.target.select()} 
                                                onClick={e => e.target.select()} 
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

export default CModalEditarTelefono