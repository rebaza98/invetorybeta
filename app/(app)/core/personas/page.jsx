'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
//import Image from "next/image"
import axios from "axios"
import { useRouter } from 'next/navigation'
import SBreadCrumb from "@/app/components/SBreadCrumb"
import ImagenGrilla from "@/app/components/ImagenGrilla"


const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Personas', href: '/core/personas', current: true },
  ]

const minBusqueda = 3

const titulo = "Personas"

const PersonaHome = () => {

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [tituloModal, setTituloModal] = useState(false)

    const [personas, setPersonas] = useState([])

    const [criterioBusqueda, setCriterioBusqueda] = useState('')





    
    

    const fectchPersonas = async () => {
        const response = await axios.get('/api/core/persona/all')
        const data = response.data
          
        setPersonas(data)
    }
    
    // const fectchPersonas = async () => {
    //     const response = await fetch('/api/core/persona')
    //     const data = await response.json()
          
    //     setPersonas(data)
    // }

    //USANDO AXIOS
    const fectchPersonasFiltradas = async () => {
        try {
          const response = await axios.get(`/api/core/persona/buscar?q=${criterioBusqueda}`);
          const data = response.data;
          setPersonas(data);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
    };
    
    // const fectchPersonasFiltradas = async () => {

    //     const response = await fetch(`/api/core/persona/buscar?q=${criterioBusqueda}`)
    //     const data = await response.json()
          
    //     setPersonas(data)
    // }

    useEffect( () => {
        fectchPersonas()
        
    }, [] )


    useEffect( () => {

        if(criterioBusqueda.length >= minBusqueda){
            fectchPersonasFiltradas()
        }
        if(criterioBusqueda.length == 0){
            fectchPersonas()
        }
       
          
      }, [criterioBusqueda] )
      
    const handleEditar = (personaId) => {
        router.push(`/core/personas/editar/${personaId}`)
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
                    <Link href="/core/personas/nueva" >
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
                            {personas.length > 0 && (
                                personas.map((persona) => (
                                    <li key={persona._id} onDoubleClick={() => handleEditar(persona.numeroDoc)}  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                        <div className="flex w-full items-center justify-between space-x-6 p-6">

                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="truncate text-sm font-medium text-gray-900">{persona.razonSocial}</h3>
                                                </div>
                                                <p className="mt-1 truncate text-xs text-gray-500"><strong>{persona.docId.nombre}:</strong>  {persona.numeroDoc}</p>
                                            </div>

                                            {/* Contenedor de la imagen */}
                                            <div className="max-w-full max-h-14">
                                                {/* <img
                                                    src={persona.imagenUrl ? persona.imagenUrl : '/images/perfil/user-1.jpg'}
                                                    alt="Descripción de la imagen"
                                                    className="max-w-full max-h-14 bg-gray-300 rounded"
                                                    key={persona._id}
                                                /> */}

                                                <ImagenGrilla url={persona.imagenUrl} key={persona.imagenUrl} />
                                                {/* <Image
                                                     
                                                    src={persona.imagenUrl ? persona.imagenUrl : '/images/perfil/user-1.jpg'}
                                                    alt="Descripción de la imagen"
                                                    className="max-w-full max-h-14 bg-gray-300 rounded"
                                                    key={persona.imagenUrl}
                                                    width={56}
                                                    height={56}
                                                    style={{
                                                        objectFit:"contain", width:"auto"
                                                    }
                                                    
                                                        
                                                    }
                                                /> */}
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}


                        </ul>
                    </div>
                </div>
                {!personas.length > 0 && (
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

export default PersonaHome