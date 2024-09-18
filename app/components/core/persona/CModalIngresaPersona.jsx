import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CErrorAlert from '@/app/components/CErrorAlert'
import { MinusIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import axios from "axios"
import CModalResultadoReniec from '../consultaSunatReniec/CModalResultadoReniec'
import CModalResultadoSunat from '../consultaSunatReniec/CModalResultadoSunat'
import CModalNoEncontrado from '../consultaSunatReniec/CModalNoEncontrado'
import { formPersonaInit } from '@/utils/core/persona/utils'
import CModalSeleccionaDocId from '../docId/CModalSeleccionaDocId'
import CModalSeleccionaUbigeo from '../ubigeo/CModalSeleccionaUbigeo'
import CModalIngresaDireccion from './direccion/CModalIngresaDireccion'
import { HomeIcon } from '@heroicons/react/24/outline'

const CModalIngresaPersona = ({ open, setOpen, setParentModal, handlerCreatePersona }) => {

    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])


    //asyncs
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [dataSunatReniec, setDataSunatReniec] = useState({})
    const [tipoDocInput, setTipoDocInput] = useState(false)
    const [numeroDocInput, setNumeroDocInput] = useState(false)
    const [nombreRazonSocialInput, setNombreRazonSocialInput] = useState(false)
    const [personaGrabada, setPersonaGrabada] = useState({})

    const [modalReniec, setModalReniec] = useState(false)
    const [modalSunat, setModalSunat] = useState(false)
    const [modalNoEncontrado, setModalNoEncontrado] = useState(false)
    const [modalSeleccionaUbigeo, setModaSeleccionalUbigeo] = useState(false)
    const [modalIngresaDireccion, setModalIngresaDireccion] = useState(false)
    

    const [nuevaPersona, setNuevaPersona] = useState(formPersonaInit)
    const [modalSeleccionaDocId, setModalSeleccionaDocId] = useState(false)


    //HANDLERS

    const handleConsultaReniecSunat = (nroDocumento) => {

        const fetchConsulta = async () => {
            try {
                //setIsLoading(true)
                const response = await fetch(`/api/core/consultaSunatReniec/${nroDocumento.toString()}`)
                if (response.ok) {
                    //  setIsLoading(false)
                    const data = await response.json()
                    if (nroDocumento.length === 8 && data.success) {
                        setModalReniec(true)
                        setDataSunatReniec(data)
                        return
                    }
                    if (nroDocumento.length === 11 && data.ruc) {
                        setModalSunat(true)
                        setDataSunatReniec(data)
                    }
                    if (data.success === false) {
                        setModalNoEncontrado(true)
                    }


                } else {
                    console.log("Algo salio mal", response)

                }

            } catch (error) {
                console.log("Algo salio mal")
            } finally {
                //   setIsLoading(false)
            }
        }
        toast.promise(
            fetchConsulta,
            {
                pending: 'Consultando Sunat/Reniec...',
                success: {
                    render() {
                        return "Consulta Finalizada..."
                    },
                    // other options
                    autoClose: 1000,
                },
                error: 'Hubo un error ... '
            }

        )
    }

    //handlers

    const handleEliminarDireccion = (elemento) => {
        // Filtra todos los elementos excepto el que deseas eliminar
        const nuevasDireccion = nuevaPersona.direccion.filter((elegida) => elegida !== elemento);
      
        // Actualiza el estado con la nueva lista de especificaciones
        setNuevaPersona({
          ...nuevaPersona,
          direccion: nuevasDireccion,
        });
    };

    const handleSubmit = async () => {
        setNombreRazonSocialInput(false)
        setNumeroDocInput(false)
        setTipoDocInput(false)
        setIsSubmitting(true);
        setErrorAlert(false)
        let errores = []
        if (nuevaPersona.razonSocial === ""){
            setNombreRazonSocialInput(true)
            errores.push("Ingrese Un Nombre o Razon Social")
            toast.error('Ingrese Un Nombre o Razon Social', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        if (nuevaPersona.numeroDoc === ""){
            setNumeroDocInput(true)
            errores.push("Nro Documento es Obligatorio")
            toast.error('Nro Documento es Obligatorio', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
        try {
            //OJO CONTROLAR VACIO EN EDIT TAMBIEN
            let campoBusqueda = 'razonSocial'
            //let response = await axios.get(`/api/core/persona/buscar?q=${formValues.razonSocial}`);
            let response = await axios.get(`/api/core/persona/buscar/parametro?valor=${nuevaPersona.razonSocial}&campo=${campoBusqueda}`);
            let data = response.data;
            console.log(data)
            if (data.length > 0){
                errores.push("Ya existe una persona con ese Nombre/Razon social")
                toast.error('Ya existe una persona con ese Nombre/Razon social', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            //busqueda por numero de doc
            campoBusqueda = "numeroDoc"
            response = await axios.get(`/api/core/persona/buscar/parametro?valor=${nuevaPersona.numeroDoc}&campo=${campoBusqueda}`);
            data = response.data;
            if (data.length > 0){
                errores.push("Ya existe una Persona con ese documento")
                toast.error('Ya existe una Persona con ese documento', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

        } catch (error) {
            
        }

        //SI NO HAY ERRORES INICIO GUARDADO...
        if (errores.length === 0){
            const toastId = toast.loading('Guardando Persona...', { autoClose: false });
            try{
                const response = await fetch('/api/core/persona/nueva', {
                    method: 'POST',
                    body: JSON.stringify({
                        razonSocial: nuevaPersona.razonSocial,
                        //representante: nuevaPersona.representante,
                        numeroDoc : nuevaPersona.numeroDoc,
                        docId: nuevaPersona.docId,
                        //email: nuevaPersona.email,
                        ubigeo: nuevaPersona.ubigeo,
                        //telefono: nuevaPersona.telefono,
                        direccion: nuevaPersona.direccion,
                        //cuentas: nuevaPersona.cuentas,
                        //mkp: nuevaPersona.mkp,
                        //imagenUrl: ""
                    })
                })
                if (!response.ok){
                    console.log("Hubo un error...", response)
                    toast.update(toastId, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
                    setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
                    throw new Error
                }else{
                    const savedPersona = await response.json(); // Obtener el objeto JSON del servidor
                    handlerCreatePersona(savedPersona)
                    setPersonaGrabada(savedPersona)
                    
                    
                    toast.update(toastId, { type: 'success', render: 'Persona Grabada con exito...', isLoading: false, autoClose: true });
                    //CREBAZA CORREGIR MULTI USO REMPLAZA POR FUNCION 
                    // setFormValues({
                    //     ...formValues,
                    //     proveedor: {
                    //         ...formValues.proveedor,
                    //         personaRef: savedPersona._id,
                    //         razonSocial: savedPersona.razonSocial,
                    //         docId: savedPersona.docId,
                    //         numeroDoc: savedPersona.numeroDoc,
                    //     }
                    // })
                    handlerCreatePersona(savedPersona)
                    setParentModal(false)
                    setOpen(false)
                    


                }
            }catch (error) {
                console.log("SE MUESTRA ESTE ERROR")
                toast.update(toastId, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
    
            } finally {
                
                //setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
            }

        }else{
            console.table(errores)
            setListaErrores(errores)
            //setErrorAlert(true)
            setIsSubmitting(false);
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
                            {/* <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"> */}
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">

                                <div>
                                    <div className="mt-3  sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                            Nueva Persona
                                        </Dialog.Title>
                                        {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                                        <form className="mt-8 border-2 rounded-md p-1  mb-2 w-80 max-w-screen-lg sm:w-full">
                                            <div className='flex' >
                                                <div className="sm:col-span-1">
                                                    <label htmlFor='nroDocumento' className="block text-sm font-medium leading-6 text-gray-900">
                                                        Nro Doc
                                                    </label>
                                                    <div className="w-2/3 mt-2 flex">
                                                        <input
                                                            type="text"
                                                            name="nroDocumento"
                                                            id="nroDocumento"
                                                            autoComplete="off"
                                                            value={nuevaPersona.numeroDoc}
                                                            onChange={(e) => {
                                                                setNumeroDocInput(false)
                                                                setNuevaPersona({
                                                                    ...nuevaPersona,
                                                                    numeroDoc: e.target.value
                                                                })
                                                            }}
                                                            className={`block w-full uppercase rounded-l-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${numeroDocInput ? 'border-1 border-red-500 ' : 'border-0'
                                                                }`}
                                                        />
                                                        <button
                                                            onClick={() => handleConsultaReniecSunat(nuevaPersona.numeroDoc)}
                                                            type="button"
                                                            className={`rounded-r-md p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                                    ${nuevaPersona.numeroDoc.length !== 8 && nuevaPersona.numeroDoc?.length !== 11 ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                                                            disabled={nuevaPersona.numeroDoc.length !== 8 && nuevaPersona.numeroDoc?.length !== 11}
                                                        >
                                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                                        </button>
                                                        {modalReniec && <CModalResultadoReniec open={modalReniec} setOpen={setModalReniec} dataSunatReniec={dataSunatReniec} formValues={nuevaPersona} setFormValues={setNuevaPersona} />}
                                                        {modalSunat && <CModalResultadoSunat open={modalSunat} setOpen={setModalSunat} dataSunatReniec={dataSunatReniec} formValues={nuevaPersona} setFormValues={setNuevaPersona} />}
                                                        {modalNoEncontrado && <CModalNoEncontrado open={modalNoEncontrado} setOpen={setModalNoEncontrado} />}
                                                        {modalSeleccionaDocId && <CModalSeleccionaDocId open={modalSeleccionaDocId} setOpen={setModalSeleccionaDocId} formValues={nuevaPersona} setFormValues={setNuevaPersona} />}
                                                        {modalSeleccionaUbigeo && <CModalSeleccionaUbigeo open={modalSeleccionaUbigeo} setOpen={setModaSeleccionalUbigeo} formValues={nuevaPersona} setFormValues={setNuevaPersona} />}    
                                                    </div>


                                                </div>
                                                <div className="sm:col-span-1">

                                                    <div className="sm:col-span-1" onDoubleClick={() => {
                                                        setTipoDocInput(false)
                                                        setModalSeleccionaDocId(true)
                                                    }} >
                                                        <label htmlFor='tipoDocumento' className="block text-sm font-medium leading-6 text-gray-900">
                                                            Tipo
                                                        </label>
                                                        <div className=" w-auto mt-2"  >
                                                            <input
                                                                type="text"
                                                                name="tipoDocumento"
                                                                id="tipoDocumento"
                                                                autoComplete="off"
                                                                value={nuevaPersona.docId.nombre}
                                                                readOnly

                                                                className={`block w-full uppercase rounded-md bg-slate-200   py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${tipoDocInput ? 'border-1 border-red-500 ' : 'border-0'
                                                                    }`}
                                                            />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className='mt-2' >
                                                <label htmlFor="idnombreEspec" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Nombre / Razon Social
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="nombreEspec"
                                                        id="idnombreEspec"
                                                        value={nuevaPersona.razonSocial}
                                                        onChange={(e) => {
                                                            setNombreRazonSocialInput(false)
                                                            setNuevaPersona({ 
                                                                ...nuevaPersona, 
                                                                razonSocial: e.target.value.toLocaleUpperCase() })
                                                        }}
                                                        className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                            nombreRazonSocialInput ? 'border-1 border-red-500 ' : 'border-0' 
                                                       }`}
                                                        autoComplete='off'
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-start gap-7 ' >
                                                <div className="sm:col-span-1" onDoubleClick={() => {setModaSeleccionalUbigeo(true)}} >
                                                    <label htmlFor='ubigeo' className="block text-sm font-medium leading-6 text-gray-900">
                                                        Ubigeo
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            readOnly
                                                            type="text"
                                                            name="ubigeo"
                                                            id="ubigeo"
                                                            autoComplete="off"
                                                            value={nuevaPersona.ubigeo.codigoInei}
                                                            //onChange={(e) => setFormValues({ ...formValues, ubigeo: { ...formValues.ubigeo, codigoInei: e.target.value } })}
                                                            className="block w-full uppercase rounded-md bg-slate-200  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>


                                                </div>
                                                <div className="w-1/2 sm:col-span-1">

                                                    <div className="sm:col-span-2" onDoubleClick={() => {setModaSeleccionalUbigeo(true)}} >
                                                        <label htmlFor='ubicacion' className="block text-sm font-medium leading-6 text-gray-900">
                                                            Ubicacion
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                readOnly
                                                                type="text"
                                                                name="ubicacion"
                                                                id="ubicacion"
                                                                autoComplete="off"
                                                                //onChange={(e) => setFormValues({ ...formValues, ubigeo: { ...formValues.ubigeo, ubicacion: e.target.value } })}
                                                                className="block w-full uppercase rounded-md bg-slate-200  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                value={nuevaPersona.ubigeo.ubicacion}
                                                            />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className='flex w-1/6 justify-start items-center'>
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Direcciones</h3>
                                <span>
                                    <button
                                        type="button"
                                        className="flex items-center  rounded-full bg-green-600 p-0.5 text-white shadow-sm hover:bg-indigo-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-green w-5 h-5"
                                        onClick={() => setModalIngresaDireccion(true)}
                                    >
                                        <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    {modalIngresaDireccion && <CModalIngresaDireccion open={modalIngresaDireccion} setOpen={setModalIngresaDireccion} formValues={nuevaPersona} setFormValues={setNuevaPersona} />}
                                </span>
                            </div>

                            <div className='w-full' >
                                {nuevaPersona.direccion.length > 0 && (
                                    <>
                                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {nuevaPersona.direccion.length > 0 && (
                                            nuevaPersona.direccion.map((direc, i) => (
                                                <li key={i}   className="col-span-2 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                                                        <div className="flex-1 truncate">
                                                            <div className="flex items-center space-x-3">
                                                                <h3 className="truncate text-sm font-medium text-gray-900">{direc.alias}</h3>
                                                                {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {persona.docId.numero}
                                                                    
                                                                </span> */}
                                                                 <button
                                                    type="button"
                                                    className="flex items-center rounded-full bg-red-600 p-0.5 text-white shadow-sm hover:bg-indigo-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-red w-4 h-4"
                                                    onClick={() => handleEliminarDireccion(direc)}
                                                >
                                                    <MinusIcon className="h-4 w-4" aria-hidden="true" />
                                                </button>
                                                            </div>
                                                            <p className="mt-1 truncate text-xs text-gray-500">{direc.direc}</p>
                                                            <p className="mt-1 truncate text-xs text-gray-500"><strong>Ubigeo:</strong>  {direc.codigoInei}</p>
                                                        </div>
                                                        {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={persona.imageUrl} alt="" /> */}
                                                        <div className='text-gray-500' >
                                                            <HomeIcon className="h-8 w-8" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                                </>
                                ) }
                            </div>
                            


                                            <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                                    onClick={handleSubmit}
                                                    disabled={isSubmitting}

                                                >
                                                    {isSubmitting ? 'Guardando...' : 'Guardar'}
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

export default CModalIngresaPersona
