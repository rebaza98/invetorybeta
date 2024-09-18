'use client'
import SBreadCrumb from "@/app/components/SBreadCrumb"
import Link from "next/link"
import { useEffect, useState } from "react"

import { useRouter } from 'next/navigation'
import TabEmpresas from "@/app/components/TabEmpresas"
import axios from "axios"
import ListaRS from "@/app/components/regulaciones/regulacionSalida/ListaRS"

const pages = [
    { name: 'Regulaciones', href: '/regulacion', current: true },
    { name: 'Regulacion Salida', href: '#', current: true },
  ]


  const minBusqueda = 3
  const titulo = "Regulacion Salida"
const RSHome = () => {

    const defaultEmpresa = {
        razonSocial: "Todo",
        siglas: "TODO",
        _id: "todo",
        numeroDoc: "todo",
        href:"#",
        current: true
    }
    
    const router = useRouter()

    const [regulacionesSalida, setRegulacionesSalida] = useState([])
    const [mensajeResultados, setMensajeResultados] = useState("Cargando...")

    const [empresaSeleccionada, setEmpresaSeleccionada] = useState(defaultEmpresa)


    const [criterioBusqueda, setCriterioBusqueda] = useState('')

    //ESTADO MODALS PAGINA

    const fetchRegulacionesSalida = async () => {
        const response = await fetch('/api/regulaciones/regulacionSalida/all')
        const data = await response.json()
        
          
        if (!data.length > 0){
            setMensajeResultados("No Hay Resultados")   
        }
        setRegulacionesSalida(data)
    }

    const fetchRegulacionesSalidaEmpresa = async () => {
        const campoBusqueda = 'empresa.empresaRef'
        const response = await axios.get(`/api/regulaciones/regulacionSalida/buscar/parametro?valor=${empresaSeleccionada._id}&campo=${campoBusqueda}`);
        const data = response.data;
        if (!data.length > 0){
            setMensajeResultados("No Hay Resultados")   
        }
        setRegulacionesSalida(data)
        
    }

    useEffect( () => {
        
        fetchRegulacionesSalida()

    }, [] )

    useEffect(() => {
        setRegulacionesSalida([])
        setMensajeResultados("Cargando...")
        if (empresaSeleccionada._id != "todo"){
            fetchRegulacionesSalidaEmpresa()
        }else{
            fetchRegulacionesSalida()
        }
    }, [empresaSeleccionada])

    useEffect( () => {
          
    }, [criterioBusqueda] )
    

    return (
        <>
            <SBreadCrumb pages={pages} titulo={titulo} />
            <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2 " >
                <TabEmpresas defaultEmpresa={defaultEmpresa} setEmpresaSeleccionada={setEmpresaSeleccionada}  />
                <div className='flex justify-center mb-10'  >
                    <div className='flex relative p-1 rounded-full w-2/6'  >
                        <input
                            type="text"
                            name="criterioBusqueda"
                            id="criterioBusqueda"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Ingrese Busqueda"
                            disabled
                            readOnly
                        />
                    </div>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Link href={`/regulaciones/regulacionSalida/nueva/${empresaSeleccionada?.numeroDoc}`} >
                        { empresaSeleccionada._id != "todo" && (
                            <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Nueva Salida
                        </button>
                        ) }
                    </Link>
                </div>
                <div className="mt-8 flow-root overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ListaRS regulacionesSalida={regulacionesSalida}  />
                    </div>
                </div>
                {!regulacionesSalida.length > 0 && (
                    <div className='flex justify-center mb-10'  >
                        <div className='flex relative p-1 rounded-full'  >
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-500 sm:text-4xl">{mensajeResultados}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default RSHome