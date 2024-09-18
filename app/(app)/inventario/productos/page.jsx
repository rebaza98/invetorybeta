'use client'
import SBreadCrumb from "@/app/components/SBreadCrumb"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { PhotoIcon} from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Productos', href: '/inventario/productos', current: true },
  ]


  const minBusqueda = 3
  const titulo = "Producto"
const ProductosHome = () => {

    const router = useRouter()

    const [productos, setProductos] = useState([])

    const [criterioBusqueda, setCriterioBusqueda] = useState('')

    const fetchProductos = async () => {
        const response = await fetch('/api/inventario/producto/all')
        const data = await response.json()
        console.log("DATA = ", data)
          
        setProductos(data)
    }

    const fetchProductosFiltrados = async () => {

        const response = await fetch(`/api/inventario/producto/buscar?q=${criterioBusqueda}`)
        const data = await response.json()
          
        setProductos(data)
    }

    useEffect( () => {
        
        fetchProductos()

    }, [] )

    useEffect( () => {

        if(criterioBusqueda.length >= minBusqueda){
            fetchProductosFiltrados()
        }
        if(criterioBusqueda.length == 0){
            fetchProductos()
        }
       
          
    }, [criterioBusqueda] )
    
    const handleEditar = (productoSku) => {
        router.push(`/inventario/productos/editar/${productoSku}`)
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
                            onChange={e => setCriterioBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Link href="/inventario/productos/nuevo" >
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Nuevo Producto
                        </button>
                    </Link>

                </div>
                <div className="mt-8 flow-root overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {productos.length > 0 && (
                                productos.map((producto) => (
                                    <li key={producto._id} onDoubleClick={() => handleEditar(producto.sku)} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow select-none ">
                                        
                                        <div className="flex w-full items-center justify-between space-x-6 p-4">

                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="truncate text-sm font-medium text-gray-900">{producto.nombreProducto}</h3>
                                                </div>
                                                <p className="mt-1 truncate text-xs text-gray-500"><strong>SKU:</strong>  {producto.sku}</p>
                                                <p className="mt-1 truncate text-xs text-gray-500"><strong>MODELO:</strong>  {producto.modelo}</p>
                                                <p className="mt-1 truncate text-xs text-gray-500"><strong>MARCA:</strong>  {producto.marca.nombreMarca}</p>
                                            </div>
                                            
                                            <div className="max-w-full max-h-14">
                                                {producto.imagenUrl ? (
                                                    <Image
                                                        src={producto.imagenUrl}
                                                        alt="Descripción de la imagen"
                                                        className="max-w-full max-h-14 bg-gray-300 rounded"
                                                        key={producto._id}
                                                        width={56}
                                                        height={56}
                                                        style={{
                                                            objectFit: "contain"
                                                        }}
                                                    />
                                                ):(
                                                    <PhotoIcon className="h-14 w-14 text-gray-300" aria-hidden="true" />
                                                )}
                                                
                                            </div>
                                        </div>
                                        <div className="flex justify-end p-2"  >
                                            <p className="mt-1 truncate text-xs text-gray-500"><strong>STOCK:</strong>  {producto.stock}</p>
                                        </div>
                                        
                                    </li>
                                ))
                            )}


                        </ul>
                    </div>
                </div>
                {!productos.length > 0 && (
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