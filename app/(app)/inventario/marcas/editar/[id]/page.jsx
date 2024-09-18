'use client'
import SBreadCrumb from '@/app/components/SBreadCrumb'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { formMarcaInit } from '@/utils/inventario/utils'

import Select from 'react-select'

const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Marcas', href: '/inventario/marcas', current: false },
    { name: 'Editar Marca', href: '#', current: true },
  ]

const titulo = "Editar Marca"


//COMPONENTES




const NuevoMarcaHome = ({ params }) => {

    
    //test

    const selectRef = useRef(null);
    
    const router = useRouter()

    const marca_id = params.id

    const [paises, setPaises] = useState([])
    const [paisSeleccionado, setPaisSeleccionado] = useState({value: "cargando..", label: "cargando..."})
    const [selectedOption, setSelectedOption] = useState("");

    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])    

    //ESTADO DE FORMULARIO

    const [formValues, setFormValues] = useState(formMarcaInit)

    
    const fectchPaises = async () => {
        const response = await fetch('/api/core/pais')
        const data = await response.json()
        
        setPaises(data)
    }
    
    //CARGA DATOS
    const getDatosMarca = async () => {
        const toastId = toast.loading('Cargando Datos de Marca...', { autoClose: false });
        const response = await fetch(`/api/inventario/marca/buscar/${marca_id}`)
        const data = await response.json()  
        await fectchPaises()

        
        if(data){
            setFormValues(data)
            //selectRef.current.setValue({value: data.pais, label: data.pais})
            setPaisSeleccionado(data.pais)
            if(data.imagenUrl){
                setImagePreview(data.imagenUrl)
            }
            setSelectedOption(formValues.pais)
            toast.update(toastId, { type: 'success', render: 'Carga Completa...', isLoading: false, autoClose: 1000 });
        }else{
            setFormValues(formCategoriaInit)
            toast.update(toastId, { type: 'error', render: 'No se puedo Cargar los datos...', isLoading: false, autoClose: true });
            router.push('/inventario/categorias')
        }
    }

    //Hooks

    // useEffect( () => {
    //     console.log("PAIS SELECCIONADO EFFECT", paisSeleccionado)
    //     selectRef.current.setValue({value: paisSeleccionado, label: paisSeleccionado})
    // }, [paisSeleccionado])


    //Local Storage
    useEffect( () => {
        getDatosMarca()        
    }, []);


    


    useEffect(() => {
//        localStorage.setItem('marcaState', JSON.stringify(formValues));
    }, [formValues]);

    //ESTADOS MODAL PAGINA
    const [modalEspecificacion, setModalEspecificacion] = useState(false)
    const [modalIngresaEspecificacion, setModalIngresaEspecificacion] = useState(false)

    //ESTADOS DE ERROR
    const [nombreMarcaInput, setNombreMarcaInput] = useState(false)


    //ESTADOS ASYCN

    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEliminarEspec = (elemento) => {
        // Filtra todos los elementos excepto el que deseas eliminar
        const nuevosEspecs = formValues.especs.filter((elegida) => elegida.especRef !== elemento.especRef);
      
        // Actualiza el estado con la nueva lista de especificaciones
        setFormValues({
          ...formValues,
          especs: nuevosEspecs,
        });
      };



    //SELECT HANDLERS
    const handleOnChange = (option) => {
        if (option) {
            
            setSelectedOption(option.value);
            setFormValues({
                ...formValues,
                pais: option.value
            })
            formValues
            //setPaisSeleccionado({value: formValues.pais, label: formValues.pais})
        } else {
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



    //SUBMMIT

    const handleSubmit = async (e) => {
        setIsSubmitting(true)
        setErrorAlert(false)
        e.preventDefault()
        let errores = []
    
        
        console.table(formValues)
        //validaciones
    
        if(formValues.nombreMarca === ""){
            setNombreMarcaInput(true)
            errores.push("EL nombre es Obligatorio")
            toast.error("EL nombre es Obligatorio", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        } else{
            try {
                //const response = await axios.get(`/api/inventario/marca/buscar?q=${formValues.nombreCategoria}`);
                const campoBusqueda = 'nombreMarca'
                const response = await axios.get(`/api/inventario/marca/buscar/parametro?valor=${formValues.nombreMarca}&campo=${campoBusqueda}`);
                const data = response.data;
                if (data.length > 0){
                    if (!(data.length == 1 && data[0]._id === formValues._id)){
                        errores.push("Ya existe una Marca con ese nombre")
                        toast.error('Ya existe una Marca con ese nombre', {
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
        } 
        
        if(formValues.pais == "" ){
            errores.push("EL Pais de Marca es Obligatorio") 
            toast.error('EL Pais de Marca es Obligatorio', {
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
          //SI NO HAY ERRORES INICIO GUARDADO...
        if (errores.length === 0){
        const toastId = toast.loading('Guardando Marca...', { autoClose: false });
        try{
            const response = await fetch(`/api/inventario/marca/editar/${formValues._id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    id: formValues._id,
                    nombreMarca: formValues.nombreMarca,
                    pais: formValues.pais,
                    desc: formValues.desc

                })
            })
            if (!response.ok){
                console.log("Hubo un error...", response)
                toast.update(toastId, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
                setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
            }else{
                const savedMarca = await response.json(); // Obtener el objeto JSON del servidor
                setFormValues(formMarcaInit);
                
                if (selectedFile){
                    try{
                        toast.update(toastId, { render: 'Subiendo Contenido Multimedia...'});
                        await handleUpload(savedMarca);
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
                toast.update(toastId, { type: 'success', render: 'Marca Grabada con exito...', isLoading: false, autoClose: true });
                router.push('/inventario/marcas')
            }
        }catch (error) {
            console.log("ERROR = ", error)
            setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
        }finally{
            //setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
        }    
    }else{
        console.table(errores)
        //setListaErrores(errores)
        //setErrorAlert(true)
        
        setIsSubmitting(false);
    }
        
    
    
    
    
    
        
      //  
        
        
        
    
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
 
     const handleUpload = async (categoria) => {
         if (!selectedFile) return;
         setUploading(true);
     
         try {
             const dataUpload = new FormData()
             dataUpload.set('file', selectedFile)
             dataUpload.set('categoriaId', categoria._id)
             dataUpload.set('awsKey', `${categoriaImagenFolderUpload}/${categoria._id}_imagen`)
             const res = await fetch('/api/inventario/marca/uploadImagen', {
                 method: "POST",
                 body: dataUpload
             })
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

    const handleLimpiarDatos = () => {
        setSelectedFile(null)
        setImagePreview(null)
        localStorage.removeItem('marcaState');
        setFormValues(formMarcaInit)
        
    }

    const handleCanelar = () => {
       
     
    }





    return (
        <>
            <SBreadCrumb pages={pages} titulo={titulo} />
            <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2 relative " >
                
                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-screen ">
                        {/* Sección 1 */}
                        <div>
                            {/* Contenido de la Sección 1 */}
                            <div className="pb-12 ">
                                {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                <div className='w-4/5' >
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="col-span-1">
                                            <label htmlFor="nombreMarca" className="block text-sm font-medium text-gray-700">
                                                Nombre de Marca
                                            </label>
                                            <input
                                                type="text"
                                                name="nombreMarca"
                                                id="nombreMarca"
                                                value={formValues.nombreMarca}
                                                onChange={e => {
                                                    setNombreMarcaInput(false)
                                                    setFormValues({ ...formValues, nombreMarca: e.target.value.toLocaleUpperCase() })
                                                }}
                                                //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                    nombreMarcaInput ? 'border-1 border-red-500 ' : 'border-0' 
                                               }`}
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="mt-2 mb-4 flex flex-col gap-3">
                                            <label htmlFor="idPais" className="block text-sm font-medium leading-6 text-gray-900">
                                                Pais
                                            </label>
                                            <Select
                                                ref={selectRef}
                                                value={{value: formValues.pais, label: formValues.pais}}
                                                components={{ NoOptionsMessage }}
                                                onChange={handleOnChange}
                                                options={options}
                                                placeholder="Seleecione un Pais"
                                                required
                                                
                                                id='idPais'
                                            />
                                         
                                            
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                                Descripción
                                            </label>
                                            <textarea
                                                id="desc"
                                                name="desc"
                                                value={formValues.desc}
                                                onChange={e => setFormValues({ ...formValues, desc: e.target.value })}
                                                rows="4" // Define la cantidad de filas del textarea
                                                className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-0"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Sección 2 */}
                        
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
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => handleCanelar()} >
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

export default NuevoMarcaHome