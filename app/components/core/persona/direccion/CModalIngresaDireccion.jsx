import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CErrorAlert from '@/app/components/CErrorAlert'
import CModalBuscarUbigeoDireccion from './CModalBuscarUbigeoDireccion'


import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'




const CModalIngresaDireccion = ({ open, setOpen, formValues, setFormValues }) => {

    const [formDirecValues, setFormDirecValues] = useState({
        ubigeoRef: null,
        alias: '',
        codigoReniec: '',
        codigoInei: '',
        direc: '',
    })

    const [modalBuscaUbigeoDireccion, setModalBuscaUbigeoDireccion] = useState(false)
    
    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])
    //const [direccion, setDireccion] = useState("")

    //ESTADOS DE ERROR

    const [ubigeoInput, setUbigeoInput] = useState(false)
    const [direccionInput, setDireccionInput] = useState(false)

    const handleIngresar = () => {
        setErrorAlert(false)
        let errores = []
        setUbigeoInput(false)
        setDireccionInput(false)
        
        if (formDirecValues.codigoInei === ""){
            setUbigeoInput(true)
            errores.push("Ingrese Algun Ubigeo Valido")
            toast.error('Ingrese Algun Ubigeo Valido', {
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
        
        if (formDirecValues.direc === ""){
            setDireccionInput(true)
            errores.push("Ingrese Alguna Direccion Valida")
             //addNotification("Ingrese Alguna Direccion Valida")
             toast.error('Ingrese Alguna Direccion Valida', {
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
                direccion: [...formValues.direccion, formDirecValues]
            })
            setOpen(false)
        }else{
            console.log("ERRORES = ", errores)
            //setErrorAlert(true)
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
                                Ingrese Direccion
                            </Dialog.Title>
                            {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                            <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-full">
                            {modalBuscaUbigeoDireccion && <CModalBuscarUbigeoDireccion open={modalBuscaUbigeoDireccion} setOpen={setModalBuscaUbigeoDireccion} formDirecValues={formDirecValues} setFormDirecValues={setFormDirecValues} />}    
                                <div>
                                    {/* <SearchUbigeo formUbigeoValues={formUbigeoValues} setFormUbigeoValues={setFormUbigeoValues} /> */}
                                    <div className='mt-2' >
                                        <label htmlFor="idalias" className="block text-sm font-medium leading-6 text-gray-900">
                                            Alias
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="alias"
                                                id="idalias"
                                                value={formDirecValues.alias} 
                                                onChange={e => setFormDirecValues({ ...formDirecValues, alias: e.target.value.toLocaleUpperCase() })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>

                                    <div className='mt-2' >
                                        <label htmlFor="idubigeo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Ubigeo
                                        </label>
                                        <div className="mt-2" onDoubleClick={() => {setModalBuscaUbigeoDireccion(true)}}>
                                            <input
                                                readOnly
                                                type="text"
                                                name="ubigeo"
                                                id="idubigeo"
                                                //className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-200 "
                                                className={`block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-200 ${
                                                    ubigeoInput ? 'border-1 border-red-500 ' : 'border-0' // Agrega la clase border-red-500 si hay error en dirección
                                                }`}
                                                value={formDirecValues.codigoInei} 
                                                onChange={e => {
                                                    setUbigeoInput(false)
                                                    setFormDirecValues({ ...formDirecValues, codigoInei: e.target.value })
                                                }}
                                                
                                              
                                                
                                            />
                                        </div>
                                    </div>
                                    
                                    
                                    <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">
                                        Direccion
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="direccion"
                                            name="direccion"
                                            rows={3}
                                            //className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            className={`block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                direccionInput ? 'border-1 border-red-500 ' : 'border-0' // Agrega la clase border-red-500 si hay error en dirección
                                            }`}
                                            value={formDirecValues.direc} 
                                            onChange={e => {
                                                setDireccionInput(false)
                                                setFormDirecValues({ ...formDirecValues, direc: e.target.value })
                                            }}
                                            

                                        />
                                    </div>
                                </div>

                                <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        onClick={()=> handleIngresar()}
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

                    </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}

export default CModalIngresaDireccion