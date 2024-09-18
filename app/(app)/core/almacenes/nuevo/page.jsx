'use client'
import SBreadCrumb from '@/app/components/SBreadCrumb'
import { useEffect, useState } from 'react'
import CModalSeleccionaUbigeo from '@/app/components/core/ubigeo/CModalSeleccionaUbigeo'
import { useRouter } from 'next/navigation'
import CErrorAlert from '@/app/components/CErrorAlert'
import { toast } from 'react-toastify'

import axios from "axios"
import { formAlmacenInit } from '@/utils/core/almacen/utils'



const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Almacenes', href: '/core/almacenes', current: false },
    { name: 'Nuevo Almacen', href: '#', current: true },
  ]

const titulo = "Nuevo Almacen"


const NuevoAlmacenHome = () => {

    //ESTADO DE Empresa CON REDUX 

    const router = useRouter()


    //ESTADO DE FORMULARIO

    const [formValues, setFormValues] = useState(formAlmacenInit)

    //HOOKS 




    //ESTADOS AUXILIARES

    const [modalSeleccionaUbigeo, setModaSeleccionalUbigeo] = useState(false)

    //ESTADOS DE ERROR

    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])
    const [aliasInput, setAliasInput] = useState(false)
    const [emailInput, setEmailInput] = useState(false)

    //ESTADOS ASYCN

    const [isSubmitting, setIsSubmitting] = useState(false);


    


    const handleLimpiarDatos = () => {
        setFormValues(formAlmacenInit)
    }


    //HANDLER SUBMMIT

    const handleSubmit = async (e) => {


        e.preventDefault()

        setAliasInput(false)
        setEmailInput(false)

        setIsSubmitting(true);
        setErrorAlert(false)
        let errores = []

        if (formValues.alias === ""){
            setAliasInput(true)
            errores.push("Ingrese Un Alias")
            toast.error('Ingrese Un Alias', {
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
        

        if (!formValues.email === ""){
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regex.test(formValues.email)){
                setEmailInput(true)
                errores.push("El Email ingresado no es valido")
                toast.error('El Email ingresado no es valido', {
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
        }

        try {
            //OJO CONTROLAR VACIO EN EDIT TAMBIEN
            //let response = await axios.get(`/api/core/empresa/buscar?q=${formValues.razonSocial}`);
            let campoBusqueda = 'alias'
            let response = await axios.get(`/api/core/almacen/buscar/parametro?valor=${formValues.alias}&campo=${campoBusqueda}`);
            let data = response.data;
            console.log(data)
            if (data.length > 0){
                setAliasInput(true)
                errores.push("Ya existe un Almacen con ese Alias")
                toast.error('Ya existe un Almacen con ese Alias', {
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
            const toastId = toast.loading('Guardando Almacen...', { autoClose: false });
            try{
                const response = await fetch('/api/core/almacen/nuevo', {
                    method: 'POST',
                    body: JSON.stringify({
                        alias: formValues.alias,
                        encargado: formValues.encargado,
                        email: formValues.email,
                        prioridad: formValues.prioridad,
                        ubigeo: formValues.ubigeo,
                        telefono: formValues.telefono,
                        direccion: formValues.direccion,
                    })
                })
                if (!response.ok){
                    console.log("Hubo un error...", response)
                    toast.update(toastId, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
                    setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
                    throw new Error
                    
                }else{
                    const savedAlmacen = await response.json(); // Obtener el objeto JSON del servidor
                    
                    toast.update(toastId, { type: 'success', render: 'Almacen Grabado con exito...', isLoading: false, autoClose: true });
                    router.push('/core/almacenes')


                }
            }catch (error) {
                console.log("SE MUESTRA ESTE ERROR")
                setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
    
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

    //HANDLER DE MANEJO DE ARCHIVO

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    


    


    return (
        <>
            <SBreadCrumb pages={pages} titulo={titulo} />
            <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2 " >
                {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                <form onSubmit={handleSubmit} >
                    <div className="space-y-5">
                        {modalSeleccionaUbigeo && <CModalSeleccionaUbigeo open={modalSeleccionaUbigeo} setOpen={setModaSeleccionalUbigeo} formValues={formValues} setFormValues={setFormValues} />}    
                        <div className="border-b border-gray-900/10 pb-7 ">
                            <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Informacion de Almacen</h3>
                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 bg-white rounded-lg shadow-md p-4">
                                <div className="sm:col-span-3">
                                    <label htmlFor='nombreRazon' className="block text-sm font-medium leading-6 text-gray-900">
                                        Alias
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="nombreRazon"
                                            id="nombreRazon"
                                            autoComplete="off"
                                            value={formValues.razonSocial}
                                            onChange={(e) => {
                                                setAliasInput(false)
                                                setFormValues({ 
                                                    ...formValues, 
                                                    alias: e.target.value.toLocaleUpperCase() })
                                                //dispatch(actualizarDatosGenerales( {razonSocial: e.target.value.toLocaleUpperCase()}))
                                            }}
                                            //className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                 aliasInput ? 'border-1 border-red-500 ' : 'border-0' 
                                            }`}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor='encargado' className="block text-sm font-medium leading-6 text-gray-900">
                                        Encargado
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="encargado"
                                            id="encargado"
                                            autoComplete="off"
                                            value={formValues.encargado}
                                            onChange={(e) => setFormValues({
                                                ...formValues,
                                                encargado: e.target.value
                                            })}
                                            className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                
                                
                                <div className="sm:col-span-1">
                                    <label htmlFor='email'  className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2 flex ">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="off"
                                            value={formValues.email}
                                            onChange={(e) => setFormValues({
                                                ...formValues,
                                                email: e.target.value
                                            })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            
                                        />
                                    
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label htmlFor='prioridad'  className="block text-sm font-medium leading-6 text-gray-900">
                                        Prioridad
                                    </label>
                                    <div className="mt-2 flex ">
                                        <input
                                            type="number"
                                            name="prioridad"
                                            id="email"
                                            autoComplete="off"
                                            value={formValues.prioridad}
                                            onChange={(e) => setFormValues({
                                                ...formValues,
                                                prioridad: e.target.value
                                            })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            
                                        />
                                    
                                    </div>
                                </div>
                                <div className="sm:col-span-1" onDoubleClick={() => {setModaSeleccionalUbigeo(true)}} >
                                    <label htmlFor='ubigeo'  className="block text-sm font-medium leading-6 text-gray-900">
                                        Ubigeo
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            readOnly
                                            type="text"
                                            name="ubigeo"
                                            id="ubigeo"
                                            autoComplete="off"
                                            value={formValues.ubigeo.codigoInei}
                                            //onChange={(e) => setFormValues({ ...formValues, ubigeo: { ...formValues.ubigeo, codigoInei: e.target.value } })}
                                            className="block w-full uppercase rounded-md bg-slate-200  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
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
                                            value={formValues.ubigeo.ubicacion}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor='representante' className="block text-sm font-medium leading-6 text-gray-900">
                                        Direccion
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="representante"
                                            id="representante"
                                            autoComplete="off"
                                            value={formValues.direccion}
                                            onChange={(e) => setFormValues({
                                                ...formValues,
                                                direccion: e.target.value
                                            })}
                                            className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label htmlFor='telefono'  className="block text-sm font-medium leading-6 text-gray-900">
                                        Telefono
                                    </label>
                                    <div className="mt-2 flex ">
                                        <input
                                            type="tel"
                                            name="telefono"
                                            id="telefono"
                                            autoComplete="off"
                                            value={formValues.telefono}
                                            onChange={(e) => setFormValues({
                                                ...formValues,
                                                telefono: e.target.value
                                            })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            
                                        />
                                    
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>

                        
                    </div>
                    <div>
                        <div className="mt-6 flex items-center justify-between">
                            <button
                                type="button"
                                className="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                onClick={() => handleLimpiarDatos()}
                            >
                                Limpiar Datos
                            </button>
                            
                            <div className="flex items-center gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </div>

                    
                </form>
            </div>
            
            
        </>        
        
    )
}

export default NuevoAlmacenHome