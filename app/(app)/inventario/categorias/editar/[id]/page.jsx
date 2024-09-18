'use client'
import SBreadCrumb from '@/app/components/SBreadCrumb'
import CModalNuevaEspecificacion from '@/app/components/inventario/especificacion/CModalNuevaEspecificacion'
import { PhotoIcon, PlusIcon, MinusIcon} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { Popover, Transition} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import CModalIngresaEspecificacion from '@/app/components/inventario/especificacion/CModalIngresaEspecificacion'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { categoriaImagenFolderUpload, formCategoriaInit } from '@/utils/inventario/utils'
import Image from 'next/image'
import axios from "axios"

const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Categorias', href: '/inventario/categorias', current: false },
    { name: 'Editar Categoria', href: '#', current: true },
  ]

const titulo = "Editar Categoria"


//COMPONENTES



function DropDownCategoria({setModalEspecificacion}) {
    return (
      <Popover className="relative">
        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          
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
          {/* <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4"> */}
          <Popover.Panel className="absolute top-0 right-0 mt-5 flex w-screen max-w-xs px-4">
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  {/* <div className="p-4">
                      <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                          <div className='flex justify-end text-right'  >
                              <div>
                                  <button onClick={() => { setModalMarca(true) }} className="font-semibold text-gray-900">
                                      Nueva Marca
                                      <span className="absolute inset-0" />
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div> */}
                  <div className="p-4">
                      <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                          <div className='flex justify-end text-right'  >
                              <div>
                                  <button onClick={() => { setModalEspecificacion(true) }} className="font-semibold text-gray-900">
                                      Nueva Especificacion
                                      <span className="absolute inset-0" />
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      
    )
  }

const EditarCategoriaHome = ({params}) => {

    const router = useRouter()

    const categoria_id = params.id
    
    //ESTADO DE FORMULARIO

    const [formValues, setFormValues] = useState(formCategoriaInit)

    const getDatosCategoria = async () => {
        const toastId = toast.loading('Cargando Datos de Categoria...', { autoClose: false });
        const response = await fetch(`/api/inventario/categoria/buscar/${categoria_id}`)
        const data = await response.json()  
        if(data){
            console.log("DATA ES = ", data)
            setFormValues(data)
            if(data.imagenUrl){
                setImagePreview(data.imagenUrl)
            }
            toast.update(toastId, { type: 'success', render: 'Carga Completa...', isLoading: false, autoClose: 1000 });
        }else{
            setFormValues(formCategoriaInit)
            toast.update(toastId, { type: 'error', render: 'No se puedo Cargar los datos...', isLoading: false, autoClose: true });
            router.push('/inventario/categorias')
        }
    }

    //Hooks
    //Local Storage
    useEffect(() => {
        //Recuperar datos de BD
        getDatosCategoria()
    }, []);

    useEffect(() => {
        //localStorage.setItem('categoriaState', JSON.stringify(formValues));
    }, [formValues]);

    //ESTADOS MODAL PAGINA
    const [modalEspecificacion, setModalEspecificacion] = useState(false)
    const [modalIngresaEspecificacion, setModalIngresaEspecificacion] = useState(false)

    //ESTADOS DE ERROR
    const [nombreCategoriaInput, setNombreCategoriaInput] = useState(false)


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

    const handleRecargar = () => {
        location.reload()
    }


    //HANDLER SUBMMIT

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true);
        setNombreCategoriaInput(false)
        let errores = []

        //validaciones

        if(formValues.nombreCategoria === ""){
            setNombreCategoriaInput(true)
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
        }else{
            try {
                console.log("REVISA DUPLICADO NOMBRE")
                //const response = await axios.get(`/api/inventario/categoria/buscar?q=${formValues.nombreCategoria}`);
                const campoBusqueda = 'nombreCategoria'
                const response = await axios.get(`/api/inventario/categoria/buscar/parametro?valor=${formValues.nombreCategoria}&campo=${campoBusqueda}`);
                const data = response.data;
                console.log("data = ",data)
                if (data.length > 0){
                    if (!(data.length == 1 && data[0]._id === formValues._id)){
                        setNombreCategoriaInput(true)
                        errores.push("Ya existe una Categoria con ese nombre")
                        toast.error('Ya existe una Categoria con ese nombre', {
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
                console.log("ERROR = ", error)
                
            }    
        } 

        //SI NO HAY ERRORES INICIO GUARDADO...
        if (errores.length === 0){
            const toastId = toast.loading('Guardando Categoria...', { autoClose: false });
            try{
                const response = await fetch(`/api/inventario/categoria/editar/${formValues._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        id: formValues._id,
                        nombreCategoria: formValues.nombreCategoria,
                        desc: formValues.desc,
                        especs: formValues.especs,
                        imagenUrl: formValues.imagenUrl,
    
                    })
                })
                if (!response.ok){
                    console.log("Hubo un error...", response)
                    toast.update(toastId, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
                    setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
                    throw new Error
                }else{
                    const savedCategoria = await response.json(); // Obtener el objeto JSON del servidor
                    //localStorage.removeItem('categoriaState');
                    setFormValues(formCategoriaInit);
                    console.log("SE INGRESO CORRECTAMENTE")
                    
                    if (selectedFile){
                        try{
                            toast.update(toastId, { render: 'Subiendo Contenido Multimedia...'});
                            await handleUpload(savedCategoria);
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
                    toast.update(toastId, { type: 'success', render: 'Categoria Grabada con exito...', isLoading: false, autoClose: true });
                    router.push('/inventario/categorias')
                }
            }catch (error) {
                console.log("ERROR = ", error)
                setIsSubmitting(false)
            }finally{
                //setIsSubmitting(false)
            }    
        }else{
            console.table("ERRORES",errores)
            //setListaErrores(errores)
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
 
     const handleUpload = async (categoria) => {
         if (!selectedFile) return;
         setUploading(true);
     
         try {
             const dataUpload = new FormData()
             dataUpload.set('file', selectedFile)
             dataUpload.set('categoriaId', categoria._id)
             dataUpload.set('awsKey', `${categoriaImagenFolderUpload}/${categoria._id}_imagen`)
             const res = await fetch('/api/inventario/categoria/uploadImagen', {
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

  



    return (
        <>
            {modalEspecificacion && <CModalNuevaEspecificacion open={modalEspecificacion} setOpen={setModalEspecificacion} />}
            <SBreadCrumb pages={pages} titulo={titulo} />
            <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2 relative " >
                <div className="absolute top-0 right-0 m-4 z-50" >
                    <DropDownCategoria setModalEspecificacion={setModalEspecificacion} />
                </div>
                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-screen ">
                        {/* Sección 1 */}
                        <div>
                            {/* Contenido de la Sección 1 */}
                            <div className="pb-12 ">
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Informacion de Categoria</h3>
                                {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                <div className='w-4/5' >
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="col-span-1">
                                            <label htmlFor="nombreCategoria" className="block text-sm font-medium text-gray-700">
                                                Nombre de Categoría
                                            </label>
                                            <input
                                                type="text"
                                                name="nombreCategoria"
                                                id="nombreCategoria"
                                                value={formValues.nombreCategoria}
                                                onChange={e => {
                                                    setNombreCategoriaInput(false)
                                                    setFormValues({ ...formValues, nombreCategoria: e.target.value.toLocaleUpperCase() })
                                                }}
                                                //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                    nombreCategoriaInput ? 'border-1 border-red-500 ' : 'border-0' 
                                               }`}
                                                autoComplete='off'
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
                        <div>
                            {/* Contenido de la Sección 2 */}
                            <div className='flex w-1/6 justify-start items-center'>
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Logo/Foto</h3>
                            </div>
                            <div className="mt-2 flex items-center gap-x-3">
                                <div className="flex items-center">
                                    {imagePreview ? (
                                        <div className='relative h-64 w-96' >
                                            <Image 
                                                    src={imagePreview}
                                                    alt="Descripción de la imagen"
                                                    className="max-w-full max-h-screen bg-gray-300 rounded"
                                                    width={500}
                                                    height={500}
                                                    style={{
                                                        objectFit:"contain"
                                                    }
                                                        
                                                    }
                                                />
                                        </div>
                                        
                                        
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

                        </div>
                    </div>
                    <div className="space-y-12">

                        


                        <div className="border-b border-gray-900/10 pb-12">
                            <div className='flex w-1/6 justify-between items-center' >
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Especificaciones</h3>
                                <span>
                                    <button
                                        type="button"
                                        className="flex items-center  rounded-full bg-green-600 p-0.5 text-white shadow-sm hover:bg-indigo-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-green w-5 h-5"
                                        onClick={() => setModalIngresaEspecificacion(true)}
                                    >
                                        <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    {modalIngresaEspecificacion && <CModalIngresaEspecificacion open={modalIngresaEspecificacion} setOpen={setModalIngresaEspecificacion} formValues={formValues} setFormValues={setFormValues} />}
                                </span>
                            </div>
                            <div className='w-1/4' >
                                {formValues.especs.length > 0 && (
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Nombre
                                                </th>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Descripcion
                                                </th>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {formValues.especs.map((elemento, indice) => (
                                                <tr key={indice} >
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {elemento.nombreEspec}

                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {elemento.desc}

                                                    </td>
                                                    <td className="flex justify-around  whitespace-nowrap py-4 pl-4  pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        <button
                                                            type="button"
                                                            className="flex items-center rounded-full bg-red-600 p-0.5 text-white shadow-sm hover:bg-indigo-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-red w-4 h-4"
                                                            onClick={() => handleEliminarEspec(elemento)}
                                                        >
                                                            <MinusIcon className="h-4 w-4" aria-hidden="true" />
                                                        </button>

                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                )}
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

export default EditarCategoriaHome