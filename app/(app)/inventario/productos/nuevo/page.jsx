'use client'
import SBreadCrumb from '@/app/components/SBreadCrumb'
import CModalNuevaEspecificacion from '@/app/components/inventario/especificacion/CModalNuevaEspecificacion'
import { PhotoIcon, PlusIcon, MinusIcon} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { Popover, Transition} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { formProductoInit, productoImagenFolderUpload } from '@/utils/inventario/utils'
import Image from 'next/image'
import CModalIngresaMarca from '@/app/components/inventario/marca/CModalIngresaMarca'
import CModalIngresaCategoria from '@/app/components/inventario/categoria/CModalIngresaCategoria'
//import CModalIngresaImagenRelacionada from '@/components/inventario/producto/CModalIngresaImagenRelacionada'
import CModalIngresaPersonaSKU from '@/app/components/inventario/producto/CModalIngresaPersonaSKU'
import CModalNuevaMarca from '@/app/components/inventario/marca/CModalNuevaMarca'
import CModalIngresaCategoriaRelacionada from '@/app/components/inventario/categoria/CModalIngresaCategoriaRelacionada'
import CModalIngresaProductoAdicional from '@/app/components/inventario/producto/CModalIngresaProductoAdicional'



const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Productos', href: '/inventario/productos', current: false },
    { name: 'Nuevo Producto', href: '#', current: true },
  ]

const titulo = "Nuevo Producto"


//COMPONENTES



function DropDownProducto({setModalMarca}) {
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
          <Popover.Panel className="absolute top-0 right-0 mt-5 flex w-screen max-w-xs px-4">
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  
                  <div className="p-4">
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
                  </div>
              </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      
    )
  }

const NuevoProductoHome = () => {

    const router = useRouter()

    

    //ESTADO DE FORMULARIO

    const [formValues, setFormValues] = useState(formProductoInit)

    //Hooks
    //Local Storage
    useEffect(() => {
        const storedValues = JSON.parse(localStorage.getItem('productoState'));
        if (storedValues) {
            setFormValues(storedValues);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('productoState', JSON.stringify(formValues));
    }, [formValues]);

    //ESTADOS MODAL PAGINA
    const [modalEspecificacion, setModalEspecificacion] = useState(false)
    const [modalMarca, setModalMarca] = useState(false)
    const [modalIngresaMarca, setModalIngresaMarca] = useState(false)
    const [modalIngresaCategoria, setModalIngresaCategoria] = useState(false)
    const [modalIngresaCategoriaRelacionada, setModalIngresaCategoriaRelacionada] = useState(false)
    const [modalIngresaPersonaSKU, setModalIngresaPersonaSKU] = useState(false)

    const [modalIngresaProductoAdicional, setModalIngresaProductoAdicional] = useState(false)
    
    
    const [modalIngresaImagenRelacionada, setModalIngresaImagenRelacionada] = useState(false)

    //ESTADOS DE ERROR
    const [nombreProductoInput, setNombreProductoInput] = useState(false)
    const [skuInput, setSkuInput] = useState(false)
    const [modeloInput, setModeloInput] = useState(false)
    const [marcaInput, setMarcaInput] = useState(false)
    const [categoriaInput, setCategoriaInput] = useState(false)


    //ESTADOS ASYCN

    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    //HANDLERS
    
    const handleEliminarEspec = (elemento) => {
        // Filtra todos los elementos excepto el que deseas eliminar
        const nuevosEspecs = formValues.especs.filter((elegida) => elegida.especRef !== elemento.especRef);
      
        // Actualiza el estado con la nueva lista de especificaciones
        setFormValues({
          ...formValues,
          especs: nuevosEspecs,
        });
    };


    const handleValorChange = (e, indice) => {
        const { value } = e.target;
        const especificacionesActualizadas = [...formValues.especificaciones];
        especificacionesActualizadas[indice].valor = value.toLocaleUpperCase();
    
        setFormValues({
            ...formValues,
            especificaciones: especificacionesActualizadas,
        });
    };
    

    const handleSkuEquivalenteChange = (e, indice) => {
        const { value } = e.target
        const skuEquivalentesActualizados = [...formValues.skuEquivalentes]
        skuEquivalentesActualizados[indice].equivalente = value.toLocaleUpperCase()
        setFormValues({
            ...formValues,
            skuEquivalentes: skuEquivalentesActualizados,
        })
    }
    
    const handleEliminarCategoriaRelacionada = (elemento) => {
        // Filtra todos los elementos excepto el que deseas eliminar
        const nuevasCategoriaRelacionadas = formValues.categoriaRelacionadas.filter((elegida) => elegida.categoriaRef !== elemento.categoriaRef);
        
        // Actualiza el estado con la nueva lista de especificaciones
        setFormValues({
        ...formValues,
        categoriaRelacionadas: nuevasCategoriaRelacionadas,
        });
    }

    const handleEliminarProductoAdicional = (elemento) => {
        // Filtra todos los elementos excepto el que deseas eliminar
        const nuevosProductosCombo = formValues.productosCombo.filter((elegida) => elegida.productoRef !== elemento.productoRef);
        
        // Actualiza el estado con la nueva lista de especificaciones
        setFormValues({
        ...formValues,
        productosCombo: nuevosProductosCombo,
        });
    }

    const handleEliminarSkuEquivalente = (elemento) => {
        const nuevasSkuEquivalente = formValues.skuEquivalentes.filter((elegida) => elegida.personaRef !== elemento.personaRef);
        
        // Actualiza el estado con la nueva lista de especificaciones
        setFormValues({
        ...formValues,
        skuEquivalentes: nuevasSkuEquivalente,
        });

    }
    //SUBMMIT

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true);
        setNombreProductoInput(false)
        setSkuInput(false)
        setMarcaInput(false)
        setModeloInput(false)
        setCategoriaInput(false)
        setSkuInput(false)
        let errores = []

        //validaciones

        if(formValues.nombreProducto === ""){
            setNombreProductoInput(true)
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
        }
        // else{
        //     try {
        //         const response = await axios.get(`/api/inventario/producto/categoria/buscar?q=${formValues.nombreProducto}`);
        //         const data = response.data;
        //         console.log(data)
        //         if (data.length > 0){
        //             errores.push("Ya existe una Producto con ese nombre")
        //             toast.error('Ya existe una Producto con ese nombre', {
        //                 position: "top-right",
        //                 autoClose: 3000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "colored",
        //             });
        //         }
    
        //     } catch (error) {
                
        //     }    
        // } 

        if(formValues.sku === ""){
            setSkuInput(true)
            errores.push("EL SKU es Obligatorio")
            toast.error("EL SKU es Obligatorio", {
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
                const response = await axios.get(`/api/inventario/producto/buscar?q=${formValues.sku}`);
                const data = response.data;
                console.log(data)
                if (data.length > 0){
                    setSkuInput(true)
                    errores.push("Ya existe una Producto con ese SKU")
                    toast.error('Ya existe una Producto con ese SKU', {
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
        } 

        if(formValues.marca.nombreMarca === ""){
            setMarcaInput(true)
            errores.push("La Marca es Obligatoria")
            toast.error("La Marca es Obligatoria", {
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
        if(formValues.modelo === ""){
            setModeloInput(true)
            errores.push("EL Modelo es Obligatorio")
            toast.error("EL Modelo es Obligatorio", {
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
                const response = await axios.get(`/api/inventario/producto/buscar?q=${formValues.modelo}`);
                const data = response.data;
                console.log(data)
                if (data.length > 0){
                    setModeloInput(true)
                    errores.push("Ya existe una Producto con ese Modelo")
                    toast.error('Ya existe una Producto con ese Modelo', {
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
        } 

        if(formValues.categoria.nombreCategoria === ""){
            setCategoriaInput(true)
            errores.push("La Categoria es Obligatoria")
            toast.error("La Categoria es Obligatoria", {
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
            const toastId = toast.loading('Guardando Producto...', { autoClose: false });
            try{
                const response = await fetch('/api/inventario/producto/nuevo', {
                    method: 'POST',
                    body: JSON.stringify({
                        esProducto: formValues.esProducto,
                        nombreProducto: formValues.nombreProducto,
                        sku: formValues.sku,
                        modelo: formValues.modelo,
                        marca: formValues.marca,
                        categoria: formValues.categoria,
                        desc: '',
                        codigo: formValues.codigo,
                        barCode: formValues.barCode,
                        garantia: formValues.garantia,
                        anio: formValues.anio,
                        stock: formValues.stock,
                        stockMinimo: formValues.stockMinimo,
                        especificaciones: formValues.especificaciones,
                        categoriaRelacionadas: formValues.categoriaRelacionadas,
                        usaSerie: formValues.usaSerie,
                        esCombo: false,
                        productosCombo: formValues.productosCombo,
                        imagenUrl: '',
                        //imagenesRelacionadas: [],
                        skuEquivalentes: formValues.skuEquivalentes,
    
                    })
                })
                if (!response.ok){
                    console.log("Hubo un error...", response)
                    toast.update(toastId, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
                    setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
                }else{
                    const savedProducto = await response.json(); // Obtener el objeto JSON del servidor
                    localStorage.removeItem('productoState');
                    setFormValues(formProductoInit);
                    console.log("SE INGRESO CORRECTAMENTE")
                    
                    if (selectedFile){
                        try{
                            toast.update(toastId, { render: 'Subiendo Contenido Multimedia...'});
                            await handleUpload(savedProducto);
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
                    toast.update(toastId, { type: 'success', render: 'Producto Grabado con exito...', isLoading: false, autoClose: true });
                    router.push('/inventario/productos')
                }
            }catch (error) {
                console.log("ERROR = ", error)
                setIsSubmitting(false); // Deshabilita el estado después de completar la solicitud
            }finally{
                //setIsSubmitting(false);
            }    
        }else{
            console.table(errores)
            //setListaErrores(errores)
            //setErrorAlert(true)
            setIsSubmitting(false);
        }

    }

     //HANDLER DE MANEJO DE ARCHIVO

     const [selectedFile, setSelectedFile] = useState(null);
     const [imagePreview, setImagePreview] = useState(null);
     //MultiArchivo
     const [selectedFileRelacionadas, setSelectedFileRelacionadas] = useState([]);
     const [imagePreviewRelacionadas, setImagePreviewRelacionadas] = useState([]);
 
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
 
     const handleUpload = async (producto) => {
         if (!selectedFile) return;
         setUploading(true);
     
         try {
             const dataUpload = new FormData()
             dataUpload.set('file', selectedFile)
             dataUpload.set('productoId', producto._id)
             dataUpload.set('awsKey', `${productoImagenFolderUpload}/${producto.sku}_imagen`)
             const res = await fetch('/api/inventario/producto/uploadImagen', {
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
        localStorage.removeItem('productoState');
        setFormValues(formProductoInit)
        
    }





    return (
        <>
            {modalEspecificacion && <CModalNuevaEspecificacion open={modalEspecificacion} setOpen={setModalEspecificacion} />}
            <SBreadCrumb pages={pages} titulo={titulo} />
            <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2 relative " >
                <div className="absolute top-0 right-0 m-4 z-50" >
                    <DropDownProducto setModalMarca={setModalMarca} />
                </div>
                <form onSubmit={handleSubmit} >
                {modalMarca && <CModalNuevaMarca open={modalMarca} setOpen={setModalMarca} />}
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-screen "> */}
                    <div className="w-full flex justify-between  ">
                        {/* Sección 1 */}
                        <div className='w-1/2 bg-white rounded-lg shadow-md p-4 ' >
                            {/* Contenido de la Sección 1 */}
                            <div className=" ">
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Informacion de Producto</h3>
                                {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                <div className='w-full' >
                                    <div className="mt-6 mb-4 space-y-6">
                                        <label  className="block text-sm font-medium text-gray-700">
                                                Tipo
                                        </label>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="producto"
                                                name="tipo"
                                                type="radio"
                                                value="producto"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={formValues.esProducto}
                                                onChange={() => setFormValues({ ...formValues, esProducto: true })}
                                            />
                                            <label htmlFor="producto" className="block text-sm font-medium leading-6 text-gray-900">
                                                Producto
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="servicio"
                                                name="tipo"
                                                type="radio"
                                                value="servicio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={!formValues.esProducto}
                                                onChange={() => setFormValues({ ...formValues, esProducto: false })}
                                            />
                                            <label htmlFor="servicio" className="block text-sm font-medium leading-6 text-gray-900">
                                                Servicio
                                            </label>
                                        </div>



                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="col-span-1">
                                            <label htmlFor="nombreProducto" className="block text-sm font-medium text-gray-700">
                                                Nombre 
                                            </label>
                                            <input
                                                type="text"
                                                name="nombreProducto"
                                                id="nombreProducto"
                                                value={formValues.nombreProducto}
                                                onChange={e => {
                                                    setNombreProductoInput(false)
                                                    setFormValues({ ...formValues, nombreProducto: e.target.value.toLocaleUpperCase() })
                                                }}
                                                //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                    nombreProductoInput ? 'border-1 border-red-500 ' : 'border-0' 
                                               }`}
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                                                SKU
                                            </label>
                                            <input
                                                type="text"
                                                name="sku"
                                                id="sku"
                                                value={formValues.sku}
                                                onChange={e => {
                                                    setSkuInput(false)
                                                    setFormValues({ ...formValues, sku: e.target.value.toLocaleUpperCase() })
                                                }}
                                                //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                    skuInput ? 'border-1 border-red-500 ' : 'border-0' 
                                               }`}
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                                                Modelo
                                            </label>
                                            <input
                                                type="text"
                                                name="modelo"
                                                id="modelo"
                                                value={formValues.modelo}
                                                onChange={e => {
                                                    setModeloInput(false)
                                                    setFormValues({ ...formValues, modelo: e.target.value.toLocaleUpperCase() })
                                                }}
                                                //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                    modeloInput ? 'border-1 border-red-500 ' : 'border-0' 
                                               }`}
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="col-span-1" onDoubleClick={() => {
                                            setMarcaInput(false)
                                            setModalIngresaMarca(true)
                                        }} >
                                        {modalIngresaMarca && <CModalIngresaMarca open={modalIngresaMarca} setOpen={setModalIngresaMarca} formValues={formValues} setFormValues={setFormValues} />}
                                            <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
                                                Marca
                                            </label>
                                            <input
                                                readOnly
                                                type="text"
                                                name="marca"
                                                id="marca"
                                                value={formValues.marca.nombreMarca}
                                                onChange={e => {
                                                    setMarcaInput(false)
                                                    setFormValues({ ...formValues, marca: {
                                                        ...formValues.marca,
                                                        nombreMarca:e.target.value.toLocaleUpperCase()
                                                    }  })
                                                }}
                                                //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-200 ${
                                                    marcaInput ? 'border-1 border-red-500 ' : 'border-0' 
                                               }`}
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="col-span-1" onDoubleClick={() => {
                                            setCategoriaInput(false)
                                            setModalIngresaCategoria(true)
                                            }} >
                                        {modalIngresaCategoria && <CModalIngresaCategoria open={modalIngresaCategoria} setOpen={setModalIngresaCategoria} formValues={formValues} setFormValues={setFormValues} />}
                                            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                                                Categoria
                                            </label>
                                            <input
                                                readOnly
                                                type="text"
                                                name="categoria"
                                                id="categoria"
                                                value={formValues.categoria.nombreCategoria}
                                                onChange={e => {
                                                    setCategoriaInput(false)
                                                    setFormValues({ ...formValues, categoria: {
                                                        ...formValues.categoria,
                                                        nombreCategoria:e.target.value.toLocaleUpperCase()
                                                    }  })
                                                }}
                                                //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-200 ${
                                                    categoriaInput ? 'border-1 border-red-500 ' : 'border-0' 
                                               }`}
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
                                                Codigo
                                            </label>
                                            <input
                                                type="text"
                                                name="codigo"
                                                id="codigo"
                                                value={formValues.codigo}
                                                onChange={e => {
                                                    setFormValues({ ...formValues, codigo: e.target.value.toLocaleUpperCase() })
                                                }}
                                                //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                className="block w-full uppercase rounded-md py-1.5 border-0 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="barCode" className="block text-sm font-medium text-gray-700">
                                                Codigo Barras
                                            </label>
                                            <input
                                                type="text"
                                                name="barCode"
                                                id="barCode"
                                                value={formValues.barCode}
                                                onChange={e => {
                                                    setFormValues({ ...formValues, barCode: e.target.value.toLocaleUpperCase() })
                                                }}
                                                //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                className="block w-full uppercase rounded-md py-1.5 border-0 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                className=" w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Sección 2 */}
                        <div className='w-1/2' >
                            {/* Contenido de la Sección 2 */}
                            <div className='p-4 flex w-1/6 justify-start items-center'>
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Logo/Foto</h3>
                            </div>
                            <div className="p-4  flex items-center gap-x-3">
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
                    <div className='w-full bg-white rounded-lg shadow-md p-4 mt-4' >
                        <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Fabricacion y Garantia</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-screen  ">

                            <div className="col-span-1">
                                <label htmlFor="anio" className="block text-sm font-medium text-gray-700">
                                    Año
                                </label>
                                <input
                                    type="text"
                                    name="anio"
                                    id="anio"
                                    value={formValues.anio}
                                    onChange={e => {
                                        setFormValues({ ...formValues, anio: e.target.value })
                                    }}
                                    //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                    className="block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-0"
                                    autoComplete='off'
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="garantia" className="block text-sm font-medium text-gray-700">
                                    Garanita (Meses)
                                </label>
                                <input
                                    type="text"
                                    name="garantia"
                                    id="garantia"
                                    value={formValues.garantia}
                                    onChange={e => {
                                        setNombreProductoInput(false)
                                        setFormValues({ ...formValues, garantia: e.target.value })
                                    }}
                                    //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                    className="block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-0"
                                    autoComplete='off'
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="stockMinimo" className="block text-sm font-medium text-gray-700">
                                    Stock Minimo
                                </label>
                                <input
                                    type="text"
                                    name="stockMinimo"
                                    id="stockMinimo"
                                    value={formValues.stockMinimo}
                                    onChange={e => {
                                        setFormValues({ ...formValues, stockMinimo: e.target.value })
                                    }}
                                    //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                    className="block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-0"
                                    autoComplete='off'
                                />
                            </div>
                            
                        </div>
                    </div>
                    </div>
                    
                    <div className="mt-4 w-1/4 space-y-5 bg-white rounded-lg shadow-md p-4 ">
                        <div className="relative flex items-start pb-4 pt-3.5">
                            <div className="min-w-0 flex-1 text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                    Usa Serie
                                </label>
                                <p id="comments-description" className="text-gray-500">
                                    Marcado si producto usa Serie
                                </p>
                            </div>
                            <div className="ml-3 flex h-6 items-center">
                                <input
                                    id="comments"
                                    aria-describedby="comments-description"
                                    name="comments"
                                    type="checkbox"
                                    checked={formValues.usaSerie}
                                    onChange={(e) => setFormValues({ ...formValues, usaSerie: e.target.checked })}
        
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className='flex w-1/6 justify-between items-center' >
                                <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Especificaciones</h3>
                            </div>
                            <div className='w-1/4 rounded-lg shadow-md overflow-hidden ' >
                                {formValues.especificaciones.length > 0 && (
                                    <table className=" min-w-full divide-y divide-gray-300  ">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Nombre
                                                </th>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                                                    <div className='' >
                                                    Valor
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {formValues.especificaciones.map((elemento, indice) => (
                                                <tr key={indice} >
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {elemento.nombre}

                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        <input
                                                            type="text"
                                                            name="valor"
                                                            key={indice}
                                                            value={elemento.valor} 
                                                            onChange={(e) => handleValorChange(e, indice)}
                                                            //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                            className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset border-0 focus:ring-indigo-600 sm:text-sm sm:leading-6 `}
                                                            autoComplete='off'
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/3 justify-start items-center'>
                        <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">SKU Equivalentes</h3>
                        <span>
                            <button
                                type="button"
                                className="flex items-center  rounded-full bg-green-600 p-0.5 text-white shadow-sm hover:bg-indigo-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-green w-5 h-5"
                                onClick={() => setModalIngresaPersonaSKU(true)}
                            >
                                <PlusIcon className="h-4 w-4" aria-hidden="true" />
                            </button>
                            {modalIngresaPersonaSKU && <CModalIngresaPersonaSKU open={modalIngresaPersonaSKU} setOpen={setModalIngresaPersonaSKU} formValues={formValues} setFormValues={setFormValues} />}
                        </span>
                    </div>
                    <div className='w-2/3' >
                        {formValues.skuEquivalentes.length > 0 && (
                            <table className=" min-w-full divide-y divide-gray-300  ">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            <div className='' >
                                                Nombre
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                                            <div className='' >
                                                Nro Documento
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                                            <div className='' >
                                                Valor
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                                            <div className='' >
                                                Acciones
                                            </div>
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {formValues.skuEquivalentes.map((elemento, indice) => (
                                        <tr key={indice} >
                                            <td className="whitespace-nowrap  py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                <div className="truncate" style={{ maxWidth: '250px' }}>
                                                    {elemento.razonSocial}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {elemento.numeroDoc}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                <input
                                                    type="text"
                                                    name="valorSku"
                                                    key={indice}
                                                    value={elemento.equivalente}
                                                    onChange={(e) => handleSkuEquivalenteChange(e, indice)}
                                                    className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset border-0 focus:ring-indigo-600 sm:text-sm sm:leading-6 `}
                                                    autoComplete='off'
                                                />
                                            </td>
                                            <td className="flex justify-around  whitespace-nowrap py-4 pl-4  pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                <button
                                                    type="button"
                                                    className="flex items-center rounded-full bg-red-600 p-0.5 text-white shadow-sm hover:bg-indigo-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-red w-4 h-4"
                                                    onClick={() => handleEliminarSkuEquivalente(elemento)}
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
                    {formValues.categoria.nombreCategoria && <>

                        <div className='flex w-1/3 justify-start items-center'>
                            <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Categorias Relacionadas</h3>
                            <span>
                                <button
                                    type="button"
                                    className="flex items-center  rounded-full bg-green-600 p-0.5 text-white shadow-sm hover:bg-indigo-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-green w-5 h-5"
                                    onClick={() => setModalIngresaCategoriaRelacionada(true)}
                                >
                                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                </button>
                                {modalIngresaCategoriaRelacionada && <CModalIngresaCategoriaRelacionada open={modalIngresaCategoriaRelacionada} setOpen={setModalIngresaCategoriaRelacionada} formValues={formValues} setFormValues={setFormValues} />}
                            </span>
                        </div>

                        <div className='w-full' >
                            {formValues.categoriaRelacionadas.length > 0 && (
                                <>
                                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {formValues.categoriaRelacionadas.length > 0 && (
                                                formValues.categoriaRelacionadas.map((catRel, i) => (
                                                    <li key={i} onDoubleClick={() => { }} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                                        <div className='flex justify-end p-1' >
                                                            <button
                                                                type="button"
                                                                className="flex items-center rounded-full bg-red-600 p-0.5 text-white shadow-sm hover:bg-indigo-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-red w-4 h-4"
                                                                onClick={() => handleEliminarCategoriaRelacionada(catRel)}
                                                            >
                                                                <MinusIcon className="h-4 w-4" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                                                            <div className="flex-1 truncate">
                                                                <div className="flex items-center space-x-3">
                                                                    <h3 className="truncate text-sm font-medium text-gray-900">{catRel.nombre}</h3>
                                                                </div>
                                                            </div>
                                                            <div className='relative flex justify-center items-center h-16 w-32' >
                                                                {catRel.imagenUrl ? (
                                                                    <Image
                                                                        src={catRel.imagenUrl}
                                                                        alt="Descripción de la imagen"
                                                                        className="max-w-full max-h-screen bg-gray-300 rounded"
                                                                        width={70}
                                                                        height={70}
                                                                        style={{
                                                                            objectFit: "contain"
                                                                        }

                                                                        }
                                                                    />
                                                                ) : (
                                                                    <PhotoIcon className="h-14 w-14 text-gray-300" aria-hidden="true" />
                                                                )}

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


                    </>}
                    <div className='flex w-1/3 justify-start items-center'>
                            <h3 className="text-xl font-semibold leading-7 m-3 text-gray-900">Productos Adicionales(Combo)</h3>
                            <span>
                                <button
                                    type="button"
                                    className="flex items-center  rounded-full bg-green-600 p-0.5 text-white shadow-sm hover:bg-indigo-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-green w-5 h-5"
                                    onClick={() => setModalIngresaProductoAdicional(true)}
                                >
                                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                </button>
                                {modalIngresaProductoAdicional && <CModalIngresaProductoAdicional open={modalIngresaProductoAdicional} setOpen={setModalIngresaProductoAdicional} formValues={formValues} setFormValues={setFormValues} />}
                            </span>
                    </div>

                    <div className='w-full' >
                        {formValues.productosCombo.length > 0 && (
                            <>
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {formValues.productosCombo.length > 0 && (
                                            formValues.productosCombo.map((prod, i) => (
                                                <li key={i} onDoubleClick={() => { }} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                                    <div className='flex justify-end p-1' >
                                                        <button
                                                            type="button"
                                                            className="flex items-center rounded-full bg-red-600 p-0.5 text-white shadow-sm hover:bg-indigo-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-red w-4 h-4"
                                                            onClick={() => handleEliminarProductoAdicional(prod)}
                                                        >
                                                            <MinusIcon className="h-4 w-4" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                                                        <div className="flex-1 truncate">
                                                            <div className="flex items-center space-x-3">
                                                                <h3 className="truncate text-sm font-medium text-gray-900">{prod.nombreProducto}</h3>
                                                            </div>
                                                            <p className="mt-1 truncate text-xs text-gray-500"><strong>SKU:</strong>  {prod.sku}</p>
                                                            <p className="mt-1 truncate text-xs text-gray-500"><strong>MODELO:</strong>  {prod.modelo}</p>
                                                            <p className="mt-1 truncate text-xs text-gray-500"><strong>MARCA:</strong>  {prod.nombreMarca}</p>
                                                        </div>
                                                        <div className='relative flex justify-center items-center h-16 w-32' >
                                                            {prod.imagenUrl ? (
                                                                <Image
                                                                    src={prod.imagenUrl}
                                                                    alt="Descripción de la imagen"
                                                                    className="max-w-full max-h-screen bg-gray-300 rounded"
                                                                    width={70}
                                                                    height={70}
                                                                    style={{
                                                                        objectFit: "contain"
                                                                    }

                                                                    }
                                                                />
                                                            ) : (
                                                                <PhotoIcon className="h-14 w-14 text-gray-300" aria-hidden="true" />
                                                            )}

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

export default NuevoProductoHome