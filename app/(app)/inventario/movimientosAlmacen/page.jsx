'use client'
import SBreadCrumb from "@/app/components/SBreadCrumb"
import Link from "next/link"
import { useEffect, useState } from "react"
//import Image from "next/image"
import axios from "axios"
import { useRouter } from 'next/navigation'
import ImagenGrilla from "@/app/components/ImagenGrilla"
import { HomeIcon } from "@heroicons/react/24/solid"


const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Movimientos Almacen', href: '/core/almacenes', current: true },
  ]

const minBusqueda = 3

const titulo = "Movimientos de Almacen"

const AlmacenHome = () => {

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [tituloModal, setTituloModal] = useState(false)

    const [almacenes, setAlmacenes] = useState([])

    const [criterioBusqueda, setCriterioBusqueda] = useState('')





    
    

    const fetchAlmacenes = async () => {
        const response = await axios.get('/api/core/almacen/all')
        const data = response.data
          
        setAlmacenes(data)
    }
    
    // const fectchPersonas = async () => {
    //     const response = await fetch('/api/core/persona')
    //     const data = await response.json()
          
    //     setPersonas(data)
    // }

    //USANDO AXIOS
    const fetchAlmacenesFiltrados = async () => {
        try {
          const response = await axios.get(`/api/core/almacen/buscar?q=${criterioBusqueda}`);
          const data = response.data;
          setEmpreasas(data);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
    };
    
 

    useEffect( () => {
        fetchAlmacenes()
        
    }, [] )


    useEffect( () => {

        if(criterioBusqueda.length >= minBusqueda){
            fetchAlmacenesFiltrados()
        }
        if(criterioBusqueda.length == 0){
            fetchAlmacenes()
        }
       
          
      }, [criterioBusqueda] )
      
    const handleMovimiento = (almacenId) => {
        router.push(`/inventario/movimientosAlmacen/${almacenId}`)
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

                
                <div className="mt-8 flow-root overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {almacenes.length > 0 && (
                                almacenes.map((almacen) => (
                                    <li key={almacen._id} onDoubleClick={() => handleMovimiento(almacen._id)} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow select-none">
                                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="truncate text-sm font-medium text-gray-900">{almacen.alias}</h3>
                                                    {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {persona.docId.numero}
                                                                </span> */}
                                                </div>
                                                <p className="mt-1 truncate text-xs text-gray-500"><strong>Telefono:</strong>  {almacen.telefono}</p>
                                                <p className="mt-1 truncate text-xs text-gray-500"><strong>Direccion:</strong>  {almacen.direccion}</p>
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
                </div>
                {!almacenes.length > 0 && (
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

export default AlmacenHome