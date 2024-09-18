'use client'
import SBreadCrumb from "@/app/components/SBreadCrumb"
import Link from "next/link"
import { useEffect, useState } from "react"
//import Image from "next/image"
import axios from "axios"
import { useRouter } from 'next/navigation'
import ImagenGrilla from "@/app/components/ImagenGrilla"
import TabEmpresas from "@/app/components/TabEmpresas"
import { ArrowLeftEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid"
import { fetchAlmacenSeleccionado } from "@/utils/core/utils"
import ListaMovimientosAlmacen from "@/app/components/inventario/movimientoAlmacen/ListaMovimientosAlmacen"


const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Movimientos Almacen', href: '/core/almacenes', current: true },
  ]

const minBusqueda = 3



const MovimientoAlmacenHome = ({ params }) => {
    let titulo = "Movimientos de Almacen "

    const defaultEmpresa = {
        razonSocial: "Todo",
        siglas: "TODO",
        _id: "todo",
        numeroDoc: "todo",
        href:"#",
        current: true
    }

    const router = useRouter()


    const paramsId = params.almacenId
    const [almacenId, setAlmacenId] = useState(params.almacenId)

    const [empresaSeleccionada, setEmpresaSeleccionada] = useState(defaultEmpresa)

    const [open, setOpen] = useState(false)
    const [tituloModal, setTituloModal] = useState(false)

    const [movimientosAlmacen, setMovimientosAlmacen] = useState([])
    const [mensajeResultados, setMensajeResultados] = useState("Cargando...")

    const [almacenes, setAlmacenes] = useState([])

    const [criterioBusqueda, setCriterioBusqueda] = useState('')


    //OJO ESTO PUEDE LLEGAR DESDE EL SERVIDOR
    const [almacenSeleccionado, setAlmacenSeleccionado] = useState({})

    
    const cargaAlmacen = async () => {
        const response = await fetchAlmacenSeleccionado(params.almacenId)
        setAlmacenSeleccionado(response)

      }    

    const fetchAlmacenes = async () => {
        const response = await axios.get('/api/core/almacen/all')
        const data = response.data
          
        setAlmacenes(data)
    }

    const fetchMovimientosAlmacen = async() => {
        const response = await axios.get(`/api/inventario/movimientoAlmacen/all/${paramsId}`)
        const data = response.data
        setMovimientosAlmacen(data)
        if (!data.length > 0){
            setMensajeResultados("No Hay Resultados")   
        }

    }

    const fetchMovimientosAlmacenEmpresa = async () => {
        const campoBusqueda = 'empresa.empresaRef'
        const response = await axios.get(`/api/inventario/movimientoAlmacen/all/${paramsId}/${empresaSeleccionada._id}`)
        const data = response.data;
        if (!data.length > 0){
            setMensajeResultados("No Hay Resultados")   
        }
        setMovimientosAlmacen(data)
        
    }

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
        fetchMovimientosAlmacen()
        cargaAlmacen()
    }, [] )

    useEffect(() => {
        setMovimientosAlmacen([])
        setMensajeResultados("Cargando...")
        if (empresaSeleccionada._id != "todo"){
            console.log("EMPRESA DIFERENTE")
            fetchMovimientosAlmacenEmpresa()
        }else{
            fetchMovimientosAlmacen()
        }
    }, [empresaSeleccionada])


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
            <SBreadCrumb pages={pages} titulo={`${titulo}${almacenSeleccionado.alias ? almacenSeleccionado.alias: "Cargando..."} `}  />
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
                            value={criterioBusqueda}
                            onChange={e => setCriterioBusqueda(e.target.value)}
                        />
                        
                    </div>

                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    {empresaSeleccionada._id != "todo" && (
                        <div className="w-full flex justify-between" >
                            <div className="flex gap-x-4" >
                                <Link href={`/inventario/movimientosAlmacen/${params.almacenId}/entradas/ecp/${empresaSeleccionada?.numeroDoc}`} >
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    >
                                        <ArrowRightEndOnRectangleIcon className="-ml-0.5 h-5 w-5 " aria-hidden="true" />
                                        Ingreso Compra
                                    </button>
                                </Link>
                                <Link href={`/inventario/movimientosAlmacen/${params.almacenId}/entradas/erf/${empresaSeleccionada?.numeroDoc}`} >
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    >
                                        <ArrowRightEndOnRectangleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                        Ingreso Regulacion
                                    </button>
                                </Link>

                            </div>
                            <div className="flex gap-x-4" >
                                <Link href={`/inventario/movimientosAlmacen/${params.almacenId}/entradas/ecp/${empresaSeleccionada?.numeroDoc}`} >
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        <ArrowRightStartOnRectangleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                        Salida Venta
                                    </button>
                                </Link>
                                <Link href={`/inventario/movimientosAlmacen/${params.almacenId}/salidas/srf/${empresaSeleccionada?.numeroDoc}`} >
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        <ArrowRightStartOnRectangleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                        Salida Regulacion
                                    </button>
                                </Link>

                            </div>
                        </div>
                        
                        
                        
                        

                    )}


                </div>
                
                <div className="mt-8 flow-root overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ListaMovimientosAlmacen movimientosAlmacen={movimientosAlmacen} />
                    </div>
                </div>
                {!movimientosAlmacen.length > 0 && (
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

export default MovimientoAlmacenHome