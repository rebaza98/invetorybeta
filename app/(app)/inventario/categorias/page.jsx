'use client'
import SBreadCrumb from "@/app/components/SBreadCrumb"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { PhotoIcon} from '@heroicons/react/24/solid'
import ImagenGrilla from "@/app/components/ImagenGrilla"

const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Categorias', href: '/inventario/categorias', current: true },
  ]

const minBusqueda = 3
const titulo = "Categorias"


const ProductosHome = () => {

    const router = useRouter()

    const [categorias, setCategorias] = useState([])
    const [criterioBusqueda, setCriterioBusqueda] = useState('')


    const fetchCategorias = async () => {
        const response = await fetch('/api/inventario/categoria/all')
        const data = await response.json()
        if (data){
            setCategorias(data)
        }else{
            setCategorias([])
        }
          
        
    }

    const fetchCategoriasFiltradas = async () => {

        const response = await fetch(`/api/inventario/categoria/buscar?q=${criterioBusqueda}`)
        const data = await response.json()
          
        setCategorias(data)
    }
        
    useEffect( () => {
        fetchCategorias()

      }, [] )
      

    useEffect( () => {

        if(criterioBusqueda.length >= minBusqueda){
            fetchCategoriasFiltradas()
        }
        if(criterioBusqueda.length == 0){
            fetchCategorias()
        }
       
          
    }, [criterioBusqueda] )

    const handleEditar = (categoriaId) => {
        router.push(`/inventario/categorias/editar/${categoriaId}`)
    }


      return (
        <>
            <SBreadCrumb pages={pages} titulo={titulo} />
            <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2 " >
                <div className='flex justify-center mb-10'  >
                    <div className='flex relative p-1 rounded-full w-2/6'  >
                        <input
                            type="text"
                            name="criterioBusqueda"
                            id="criterioBusqueda"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Ingrese Busqueda"
                            value={criterioBusqueda}
                            autoComplete="off"
                            onChange={e => setCriterioBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Link href="/inventario/categorias/nueva" >
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Nueva
                        </button>
                    </Link>

                </div>
                <div className="mt-8 flow-root overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {categorias.length > 0 && (
                                categorias.map((categoria) => (
                                    // <li key={categoria._id} onDoubleClick={() => handleEditar(categoria._id)} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">

                                    //     <div className="flex w-full items-center justify-between space-x-6 p-6">

                                    //         <div className="flex-1 truncate">
                                    //             <div className="flex items-center space-x-3">
                                    //                 <h3 className="truncate text-sm font-medium text-gray-900">{categoria.nombreCategoria}</h3>
                                    //                 {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    //                     {producto.docId.numero}
                                    //                 </span> */}
                                    //             </div>
                                    //             {/* <p className="mt-1 truncate text-xs text-gray-500"><strong>{categoria.nombreProducto}:</strong>  {categoria.sku}</p> */}
                                    //         </div>
                                    //         <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={categoria.imageUrl} alt="" />
                                    //     </div>
                                    // </li>
                                    <li key={categoria._id} onDoubleClick={() => handleEditar(categoria._id)} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                        <div className="flex w-full items-center justify-between space-x-6 p-6">

                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="truncate text-sm font-medium text-gray-900">{categoria.nombreCategoria}</h3>
                                                </div>
                                                <p className="mt-1 truncate text-xs text-gray-500"><strong>Descripcion:</strong>  {categoria.desc}</p>
                                            </div>

                                            {/* Contenedor de la imagen */}
                                            <div className="max-w-full max-h-14">
                                                {/* <img
                                                src={persona.imagenUrl ? persona.imagenUrl : '/images/perfil/user-1.jpg'}
                                                alt="Descripción de la imagen"
                                                className="max-w-full max-h-14 bg-gray-300 rounded"
                                                key={persona._id}
                                            /> */}
                                                {categoria.imagenUrl ? (
                                                    <ImagenGrilla key={categoria.imagenUrl} url={categoria.imagenUrl} />
                                                    // <Image
                                                    //     src={categoria.imagenUrl ? categoria.imagenUrl : '/images/perfil/user-1.jpg'}
                                                    //     alt="Descripción de la imagen"
                                                    //     className="max-w-full max-h-14 bg-gray-300 rounded"
                                                        
                                                    //     width={56}
                                                    //     height={56}
                                                    //     style={{
                                                    //         objectFit: "contain"
                                                    //     }}
                                                    // />
                                                ):(
                                                    <PhotoIcon className="h-14 w-14 text-gray-300" aria-hidden="true" />
                                                )}
                                                
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}


                        </ul>
                    </div>
                </div>
                {!categorias.length > 0 && (
                    <div className='flex justify-center mb-10'  >
                        <div className='flex relative p-1 rounded-full'  >
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-500 sm:text-4xl">No Hay Resultados...</p>
                        </div>
                    </div>
                )}
            </div>
        </>
        
    )
}

export default ProductosHome