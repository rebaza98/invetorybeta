'use client'
import SBreadCrumb from '@/app/components/SBreadCrumb'
import { PlusIcon, QuestionMarkCircleIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import CModalSeleccionaDocId from '@/app/components/core/docId/CModalSeleccionaDocId'
import CModalSeleccionaUbigeo from '@/app/components/core/ubigeo/CModalSeleccionaUbigeo'
import CModalIngresaDireccion from '@/app/components/core/persona/direccion/CModalIngresaDireccion'
import CModalIngresaTelefono from '@/app/components/core/persona/telefono/CModalIngresaTelefono'
import CModalIngresaCtaBancaria from '@/app/components/core/persona/ctaBancaria/CModalIngresaCtaBancaria'
import CModalResultadoReniec from '@/app/components/core/consultaSunatReniec/CModalResultadoReniec'
import CModalResultadoSunat from '@/app/components/core/consultaSunatReniec/CModalResultadoSunat'
import CModalNoEncontrado from '@/app/components/core/consultaSunatReniec/CModalNoEncontrado'
import CModalEditarDireccion from '@/app/components/core/persona/direccion/CModalEditarDireccion'
import CModalEditarTelefono from '@/app/components/core/persona/telefono/CModalEditarTelefono'
import CModalEditarCtaBancaria from '@/app/components/core/persona/ctaBancaria/CModalEditarCtaBancaria'
import { useRouter } from 'next/navigation'
import { HomeIcon, PhoneIcon, BanknotesIcon } from '@heroicons/react/24/outline'
//REDUX
import CErrorAlert from '@/app/components/CErrorAlert'
import { toast } from 'react-toastify'

import axios from "axios"
//import { formPersonaInit, personaLogoFolderUpload } from '@/utils/core/utils'

import { formEmpresaInit, empresaLogoFolderUpload } from '@/utils/core/empresa/utils'


const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Empresas', href: '/core/empresas', current: false },
    { name: 'Nueva Empresa', href: '#', current: true },
  ]

const titulo = "Editar Empresa"


const NuevaEmpresaHome = ({ params }) => {

    //ESTADO DE Empresa CON REDUX 

    const router = useRouter()

    const { numeroDoc } = params


    //ESTADO DE FORMULARIO

    const [formValues, setFormValues] = useState(formEmpresaInit)


    const getDatosEmpresa = async () => {
        const toastId = toast.loading('Cargando Datos de Empresa...', { autoClose: false });
        const response = await fetch(`/api/core/empresa/buscar/${numeroDoc}`)
        const data = await response.json()  
        if(data){
            console.log("DATA ES = ", data)
            setFormValues(data)
            if(data.imagenUrl){
                setImagePreview(data.imagenUrl)
            }
            toast.update(toastId, { type: 'success', render: 'Carga Completa...', isLoading: false, autoClose: 1000 });
        }else{
            setFormValues(formEmpresaInit)
            toast.update(toastId, { type: 'error', render: 'No se puedo Cargar los datos...', isLoading: false, autoClose: true });
            router.push('/core/empresas')
        }
        
        
    }

    //HOOKS 

    useEffect(() => {
        // Recuperar Datos de BD
        getDatosEmpresa()
    }, []);




    //ESTADOS AUXILIARES
    const [empresaGrabada, setEmpresaGrabada] = useState({})
    const [dataSunatReniec, setDataSunatReniec] = useState({})

    //ESTADOS DE EDICION

    const [selectedDirec, setSelectedDirec] = useState(null);
    const [selectedTelef, setSelectedTelef] = useState(null);
    const [selectedCta, setSelectedCta] = useState(null);

    //ESTADOS DE MODALS DE PAGINA
    
    const [modalSeleccionaDocId, setModalSeleccionaDocId] = useState(false)
    const [modalSeleccionaUbigeo, setModaSeleccionalUbigeo] = useState(false)
    const [modalIngresaDireccion, setModalIngresaDireccion] = useState(false)
    const [modalIngresaTelefono, setModalIngresaTelefono] = useState(false)
    const [modalIngresaCta, setModalIngresaCta] = useState(false)
    const [modalReniec, setModalReniec] = useState(false)
    const [modalSunat, setModalSunat] = useState(false)
    const [modalNoEncontrado, setModalNoEncontrado] = useState(false)
    const [modalEditarDireccion, setModalEditarDireccion] = useState(false);
    const [modalEditarTelefono, setModalEditarTelefono] = useState(false);
    const [modalEditarCta, setModalEditarCta] = useState(false);
    



    //ESTADOS DE ERROR

    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])
    const [nombreRazonSocialInput, setNombreRazonSocialInput] = useState(false)
    const [nombreComercialInput, setNombreComercialInput] = useState(false)
    const [siglasInput, setSiglasInput] = useState(false)
    const [numeroDocInput, setNumeroDocInput] = useState(false)
    const [tipoDocInput, setTipoDocInput] = useState(false)
    const [emailInput, setEmailInput] = useState(false)
    const [fileInput, setFileInput] = useState(false)

    //ESTADOS ASYCN

    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    

    
    //HANDLERS
  
    /*  
        handleConsultaReniecSunat realiza consulta asyncrona a Sunat para traer datos de persona de RENIEC o SUNAT SEGUN SEA EL CASO
    */
    const handleConsultaReniecSunat = (nroDocumento) => {
       
        const fetchConsulta = async () => {
            try {
                //setIsLoading(true)
                const response = await fetch(`/api/core/consultaSunatReniec/${nroDocumento.toString()}`)
                if (response.ok) {
                  //  setIsLoading(false)
                    const data = await response.json()
                    if(nroDocumento.length === 8 && data.success){
                        setModalReniec(true)
                        setDataSunatReniec(data)
                        return
                    }
                    if(nroDocumento.length === 11 && data.ruc){
                        setModalSunat(true)
                        setDataSunatReniec(data)
                    }
                    if(data.success === false){
                        setModalNoEncontrado(true)
                    }
                    
        
                }else{
                    console.log("Algo salio mal", response)    
                    
                }
        
            } catch (error) {
                console.log("Algo salio mal")
            }finally{
             //   setIsLoading(false)
            }
        }
        toast.promise(
            fetchConsulta,
            {
                pending: 'Consultando Sunat/Reniec...',
                success: {
                    render(){
                      return "Consulta Finalizada..."
                    },
                    // other options
                    autoClose: 1000,
                  },
                error: 'Hubo un error ... '
            }

        )
    }
    
    //HANDLERS DE EDICION, ABRE MODAL CON DATOS Seleccionados
    const handleEditarDireccion = (direc) => {
        setSelectedDirec(direc);
        setModalEditarDireccion(true);
    }

    const handleEditarTelefono = (telef) => {
        setSelectedTelef(telef);
        setModalEditarTelefono(true);
    }

    const handleEditarCta = (cta) => {
        setSelectedCta(cta);
        setModalEditarCta(true);
    }

    const handleLimpiarDatos = () => {
        setImagePreview(null)
        setSelectedFile(null)
        setFormValues(formEmpresaInit)
    }


    //HANDLER SUBMMIT

    const handleSubmit = async (e) => {


        e.preventDefault()

        setNombreRazonSocialInput(false)
        setNumeroDocInput(false)
        setTipoDocInput(false)
        setEmailInput(false)

        setEmpresaGrabada({})
        setIsSubmitting(true);
        setErrorAlert(false)
        let errores = []

        if (formValues.razonSocial === ""){
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
        if (formValues.nombreComercial === ""){
            setNombreComercialInput(true)
            errores.push("Ingrese Un Nombre Comercial")
            toast.error('Ingrese Un Nombre Comercial', {
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
        if (formValues.siglas === ""){
            setSiglasInput(true)
            errores.push("Ingrese Siglas de Empresa")
            toast.error('Ingrese Siglas de Empresa', {
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

        if (formValues.numeroDoc === ""){
            setNumeroDocInput(true)
            errores.push("Ingrese Un Numero de Documento")
            toast.error('Ingrese Un Numero de Documento', {
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

        if (formValues.docId.nombre === "" || formValues.docId.codigo === ""){
            setTipoDocInput(true)
            errores.push("Ingrese Un Tipo de Documento")
            toast.error('Ingrese Un Tipo de Documento', {
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
            let campoBusqueda = 'razonSocial'
            let response = await axios.get(`/api/core/empresa/buscar/parametro?valor=${formValues.razonSocial}&campo=${campoBusqueda}`);
            let data = response.data;
            console.log(data)
            if (data.length > 0){
                if (!(data.length == 1 && data[0].numeroDoc === formValues.numeroDoc)){
                    errores.push("Ya existe una Empresa con ese Nombre/Razon social")
                    toast.error('Ya existe una Empresa con ese Nombre/Razon social', {
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
            //response = await axios.get(`/api/core/empresa/buscar?q=${formValues.numeroDoc}`);
            campoBusqueda = "numeroDoc"
            response = await axios.get(`/api/core/empresa/buscar/parametro?valor=${formValues.numeroDoc}&campo=${campoBusqueda}`);
            data = response.data;
            if (data.length > 0){
                if (!(data.length == 1 && data[0].numeroDoc === formValues.numeroDoc)){
                    errores.push("Ya existe una Empresa con ese documento")
                    toast.error('Ya existe una Empresa con ese documento', {
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

        } catch (error) {
            
        }


        //SI NO HAY ERRORES INICIO GUARDADO...
        if (errores.length === 0){
            const toastId = toast.loading('Guardando Empresa...', { autoClose: false });
            try{
                const response = await fetch(`/api/core/empresa/editar/${formValues._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        id: formValues._id,
                        razonSocial: formValues.razonSocial,
                        nombreComercial: formValues.nombreComercial,
                        representante: formValues.representante,
                        siglas: formValues.siglas,
                        url1: formValues.url1,
                        url2: formValues.url2,
                        url3: formValues.url3,
                        url4: formValues.url4,
                        url5: formValues.url5,
                        numeroDoc : formValues.numeroDoc,
                        docId: formValues.docId,
                        email: formValues.email,
                        ubigeo: formValues.ubigeo,
                        telefono: formValues.telefono,
                        direccion: formValues.direccion,
                        cuentas: formValues.cuentas,
                        imagenUrl: ""
                    })
                })
                if (!response.ok){
                    console.log("Hubo un error...", response)
                    toast.update(toastId, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
                    setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
                    throw new Error
                    
                }else{
                    const savedEmpresa = await response.json(); // Obtener el objeto JSON del servidor
                    setEmpresaGrabada(savedEmpresa)
                    if (selectedFile){
                        try{
                            toast.update(toastId, { render: 'Subiendo Contenido Multimedia...'});
                            await handleUpload(savedEmpresa);
                        }catch (error){
                            console.log("Error al subir el archivo multimedia...")
                            toast.warn('No se pudo subir contenido multimedia...', {
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
                    }else{
                        console.log("NO SE SUBIO NINGUN ARCHIVO")
                    }
                    toast.update(toastId, { type: 'success', render: 'Empresa Grabada con exito...', isLoading: false, autoClose: true });
                    router.push('/core/empresas')


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

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml' )) {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
            setImagePreview(null);
        }
    };

    const handleUpload = async (empresa) => {
        if (!selectedFile) return;
        setUploading(true);
    
        try {
            console.log("EL FILE DEBERIA SER = ", `${empresaLogoFolderUpload}/${empresa.numeroDoc}_logo`)
            const dataUpload = new FormData()
            dataUpload.set('file', selectedFile)
            dataUpload.set('empresaId', empresa._id)
            dataUpload.set('awsKey', `${empresaLogoFolderUpload}/${empresa.numeroDoc}_logo`)
            const res = await fetch('/api/core/empresa/uploadImagen', {
                method: "POST",
                body: dataUpload
            })
            console.log("RES= ", res)
            if(!res.ok){
                console.log('Error uploading file:', res);    
                throw new Error    
            }
        }catch (error) {
            console.log('Catch Error uploading file:', error);
            throw new Error
        }finally {
          setUploading(false);
        }
    };

    const handleRecargar = () => {
        location.reload()
    }


    


    return (
        <>
            <SBreadCrumb pages={pages} titulo={titulo} />
            <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2 " >
                {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                <form onSubmit={handleSubmit} >
                    <div className="space-y-5">
                        {modalSeleccionaDocId && <CModalSeleccionaDocId open={modalSeleccionaDocId} setOpen={setModalSeleccionaDocId} formValues={formValues} setFormValues={setFormValues} />}
                        {modalSeleccionaUbigeo && <CModalSeleccionaUbigeo open={modalSeleccionaUbigeo} setOpen={setModaSeleccionalUbigeo} formValues={formValues} setFormValues={setFormValues} />}
                        {modalReniec && <CModalResultadoReniec open={modalReniec} setOpen={setModalReniec} dataSunatReniec={dataSunatReniec} formValues={formValues} setFormValues={setFormValues} />}
                        {modalSunat && <CModalResultadoSunat open={modalSunat} setOpen={setModalSunat} dataSunatReniec={dataSunatReniec} formValues={formValues} setFormValues={setFormValues} />}
                        {modalNoEncontrado && <CModalNoEncontrado open={modalNoEncontrado} setOpen={setModalNoEncontrado} />}
                        <div className="border-b border-gray-900/10 pb-7 ">
                            <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Informacion de Empresa</h3>
                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 bg-white rounded-lg shadow-md p-4">
                                <div className="sm:col-span-3">
                                    <label htmlFor='nombreRazon' className="block text-sm font-medium leading-6 text-gray-900">
                                        Nombre / Razon Social
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="nombreRazon"
                                            id="nombreRazon"
                                            autoComplete="off"
                                            value={formValues.razonSocial}
                                            onChange={(e) => {
                                                setNombreRazonSocialInput(false)
                                                setFormValues({
                                                    ...formValues,
                                                    razonSocial: e.target.value.toLocaleUpperCase()
                                                })
                                                //dispatch(actualizarDatosGenerales( {razonSocial: e.target.value.toLocaleUpperCase()}))
                                            }}
                                            //className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${nombreRazonSocialInput ? 'border-1 border-red-500 ' : 'border-0'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor='representante' className="block text-sm font-medium leading-6 text-gray-900">
                                        Representante
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="representante"
                                            id="representante"
                                            autoComplete="off"
                                            value={formValues.representante}
                                            onChange={(e) => setFormValues({
                                                ...formValues,
                                                representante: e.target.value
                                            })}
                                            className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor='nombreComercial' className="block text-sm font-medium leading-6 text-gray-900">
                                        Nombre Comercial
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="nombreComercial"
                                            id="nombreComercial"
                                            autoComplete="off"
                                            value={formValues.nombreComercial}
                                            onChange={(e) => setFormValues({
                                                ...formValues,
                                                nombreComercial: e.target.value
                                            })}
                                            className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${nombreComercialInput ? 'border-1 border-red-500 ' : 'border-0'
                                                }`}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor='siglas' className="block text-sm font-medium leading-6 text-gray-900">
                                        Siglas
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="siglas"
                                            id="siglas"
                                            autoComplete="off"
                                            value={formValues.siglas}
                                            onChange={(e) => setFormValues({
                                                ...formValues,
                                                siglas: e.target.value
                                            })}
                                            className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${siglasInput ? 'border-1 border-red-500 ' : 'border-0'
                                                }`}
                                        />
                                    </div>

                                </div>

                                <div className="sm:col-span-1">
                                    <label htmlFor='nroDocumento' className="block text-sm font-medium leading-6 text-gray-900">
                                        Nro Doc
                                    </label>
                                    <div className="mt-2 flex">
                                        <input
                                            type="text"
                                            name="nroDocumento"
                                            id="nroDocumento"
                                            autoComplete="off"
                                            value={formValues.numeroDoc}
                                            onChange={(e) => {
                                                setNumeroDocInput(false)
                                                setFormValues({
                                                    ...formValues,
                                                    numeroDoc: e.target.value
                                                })
                                            }}
                                            className={`block w-full uppercase rounded-l-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${numeroDocInput ? 'border-1 border-red-500 ' : 'border-0'
                                                }`}
                                        />
                                        <button
                                            onClick={() => handleConsultaReniecSunat(formValues.numeroDoc)}
                                            type="button"
                                            className={`rounded-r-md p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                                    ${formValues.numeroDoc.length !== 8 && formValues.numeroDoc.length !== 11 ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                                            disabled={formValues.numeroDoc.length !== 8 && formValues.numeroDoc.length !== 11}
                                        >
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                <div className="sm:col-span-1" onDoubleClick={() => {
                                    setTipoDocInput(false)
                                    setModalSeleccionaDocId(true)
                                }} >
                                    <label htmlFor='tipoDocumento' className="block text-sm font-medium leading-6 text-gray-900">
                                        Tipo
                                    </label>
                                    <div className="mt-2"  >
                                        <input
                                            type="text"
                                            name="tipoDocumento"
                                            id="tipoDocumento"
                                            autoComplete="off"
                                            value={formValues.docId.nombre}
                                            readOnly

                                            className={`block w-full uppercase rounded-md bg-slate-200   py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${tipoDocInput ? 'border-1 border-red-500 ' : 'border-0'
                                                }`}
                                        />
                                    </div>

                                </div>

                                <div className="sm:col-span-1">
                                    <label htmlFor='email' className="block text-sm font-medium leading-6 text-gray-900">
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
                                <div className="sm:col-span-1" onDoubleClick={() => { setModaSeleccionalUbigeo(true) }} >
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
                                            value={formValues.ubigeo.codigoInei}
                                            //onChange={(e) => setFormValues({ ...formValues, ubigeo: { ...formValues.ubigeo, codigoInei: e.target.value } })}
                                            className="block w-full uppercase rounded-md bg-slate-200  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2" onDoubleClick={() => { setModaSeleccionalUbigeo(true) }} >
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
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
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
                                    {modalIngresaDireccion && <CModalIngresaDireccion open={modalIngresaDireccion} setOpen={setModalIngresaDireccion} formValues={formValues} setFormValues={setFormValues} />}
                                </span>
                            </div>

                            <div className='w-full' >
                                {formValues.direccion.length > 0 && (
                                    <>
                                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                {formValues.direccion.length > 0 && (
                                                    formValues.direccion.map((direc, i) => (
                                                        <li key={i} onDoubleClick={() => handleEditarDireccion(direc)} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                                            <div className="flex w-full items-center justify-between space-x-6 p-6">
                                                                <div className="flex-1 truncate">
                                                                    <div className="flex items-center space-x-3">
                                                                        <h3 className="truncate text-sm font-medium text-gray-900">{direc.alias}</h3>
                                                                        {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {persona.docId.numero}
                                                                </span> */}
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
                                )}
                            </div>
                            {modalEditarDireccion && (
                                <CModalEditarDireccion
                                    open={modalEditarDireccion}
                                    setOpen={setModalEditarDireccion}
                                    direccion={selectedDirec}
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                />
                            )}
                            <div className='flex w-1/6 justify-start items-center'>
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Telefonos</h3>
                                <span>
                                    <button
                                        type="button"
                                        className="flex items-center  rounded-full bg-green-600 p-0.5 text-white shadow-sm hover:bg-indigo-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-green w-5 h-5"
                                        onClick={() => setModalIngresaTelefono(true)}
                                    >
                                        <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    {modalIngresaTelefono && <CModalIngresaTelefono open={modalIngresaTelefono} setOpen={setModalIngresaTelefono} formValues={formValues} setFormValues={setFormValues} />}
                                </span>
                            </div>
                            <div className='w-full' >
                                {formValues.telefono.length > 0 && (
                                    <>
                                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                {formValues.telefono.length > 0 && (

                                                    formValues.telefono.map((telef, i) => (
                                                        <li key={i} onDoubleClick={() => handleEditarTelefono(telef)} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">

                                                            <div className="flex w-full items-center justify-between space-x-6 p-6">

                                                                <div className="flex-1 truncate">
                                                                    <div className="flex items-center space-x-3">
                                                                        <h3 className="truncate text-sm font-medium text-gray-900">{telef.alias}</h3>
                                                                        {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {persona.docId.numero}
                                                                </span> */}
                                                                    </div>
                                                                    <p className="mt-1 truncate text-xs text-gray-500">{telef.numero}</p>
                                                                    <p className="mt-1 truncate text-xs text-gray-500"><strong>Operador:</strong>  {telef.operador}</p>
                                                                </div>
                                                                {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={persona.imageUrl} alt="" /> */}
                                                                <div className='text-gray-500' >
                                                                    <PhoneIcon className="h-8 w-8" aria-hidden="true" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>

                                    </>
                                )}
                            </div>
                            {modalEditarTelefono && (
                                <CModalEditarTelefono
                                    open={modalEditarTelefono}
                                    setOpen={setModalEditarTelefono}
                                    telefono={selectedTelef}
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                />
                            )}

                            <div className='flex w-1/6 justify-start items-center'>
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Cts Banco</h3>
                                <span>
                                    <button
                                        type="button"
                                        className="flex items-center  rounded-full bg-green-600 p-0.5 text-white shadow-sm hover:bg-indigo-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-green w-5 h-5"
                                        onClick={() => setModalIngresaCta(true)}
                                    >
                                        <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    {modalIngresaCta && <CModalIngresaCtaBancaria open={modalIngresaCta} setOpen={setModalIngresaCta} formValues={formValues} setFormValues={setFormValues} />}
                                </span>
                            </div>

                            <div className='w-full' >
                                {formValues.cuentas.length > 0 && (
                                    <>
                                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                {formValues.cuentas.length > 0 && (

                                                    formValues.cuentas.map((cta, i) => (
                                                        <li key={i} onDoubleClick={() => handleEditarCta(cta)} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">

                                                            <div className="flex w-full items-center justify-between space-x-6 p-6">

                                                                <div className="flex-1 truncate">
                                                                    <div className="flex items-center space-x-3">
                                                                        <h3 className="truncate text-sm font-medium text-gray-900">{cta.alias}</h3>
                                                                        {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {persona.docId.numero}
                                                                </span> */}
                                                                    </div>
                                                                    <p className="mt-1 truncate text-xs text-gray-500">{cta.nroCuenta}</p>
                                                                    <p className="mt-1 truncate text-xs text-gray-500"><strong>Banco:</strong>  {cta.banco}</p>
                                                                </div>
                                                                {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={persona.imageUrl} alt="" /> */}
                                                                <div className='text-gray-500' >
                                                                    <BanknotesIcon className="h-8 w-8" aria-hidden="true" />
                                                                </div>

                                                            </div>

                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>

                                    </>
                                )}
                            </div>
                            {modalEditarCta && (
                                <CModalEditarCtaBancaria
                                    open={modalEditarCta}
                                    setOpen={setModalEditarCta}
                                    cta={selectedCta}
                                    formValues={formValues}
                                    setFormValues={setFormValues}

                                />
                            )}
                            <div className='flex w-1/6 justify-start items-center'>
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Logo/Foto</h3>
                            </div>
                            <div className="mt-2 flex items-center gap-x-3">
                                <div className="flex items-center">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="h-20 w-20" />
                                    ) : (
                                        <PhotoIcon className="h-20 w-20 text-gray-300" aria-hidden="true" />
                                    )}
                                </div>
                                <div className="flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <span>Subir un Archivo</span>
                                        <input id="file-upload" name="file-upload" type="file" onChange={handleFileChange} className="sr-only" />
                                    </label>
                                </div>
                            </div>

                            <div className='flex w-1/6 justify-start items-center'>
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Urls</h3>
                                
                            </div>
                            <div className="w-1/3">
                                    <div>
                                        <label htmlFor='url1' className="block text-sm font-medium leading-6 text-gray-900">
                                            Url 1
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="url1"
                                                id="url1"
                                                autoComplete="off"
                                                value={formValues.url1}
                                                onChange={(e) => setFormValues({
                                                    ...formValues,
                                                    url1: e.target.value
                                                })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>    
                                    </div>
                                    <div>
                                        <label htmlFor='url2' className="block text-sm font-medium leading-6 text-gray-900">
                                            Url 2
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="url2"
                                                id="url2"
                                                autoComplete="off"
                                                value={formValues.url2}
                                                onChange={(e) => setFormValues({
                                                    ...formValues,
                                                    url2: e.target.value
                                                })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>    
                                    </div>
                                    <div>
                                        <label htmlFor='url3' className="block text-sm font-medium leading-6 text-gray-900">
                                            Url 3
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="url3"
                                                id="url3"
                                                autoComplete="off"
                                                value={formValues.url3}
                                                onChange={(e) => setFormValues({
                                                    ...formValues,
                                                    url3: e.target.value
                                                })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>    
                                    </div>
                                    <div>
                                        <label htmlFor='url4' className="block text-sm font-medium leading-6 text-gray-900">
                                            Url 4
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="url4"
                                                id="url4"
                                                autoComplete="off"
                                                value={formValues.url4}
                                                onChange={(e) => setFormValues({
                                                    ...formValues,
                                                    url4: e.target.value
                                                })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>    
                                    </div>
                                    <div>
                                        <label htmlFor='url5' className="block text-sm font-medium leading-6 text-gray-900">
                                            Url 5
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="url5"
                                                id="url5"
                                                autoComplete="off"
                                                value={formValues.url5}
                                                onChange={(e) => setFormValues({
                                                    ...formValues,
                                                    url5: e.target.value
                                                })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                onClick={() => handleRecargar()}
                            >
                                Recargar
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

export default NuevaEmpresaHome