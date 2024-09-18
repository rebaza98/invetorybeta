'use client'
import SBreadCrumb from "@/app/components/SBreadCrumb"
import Link from "next/link"
import { useEffect, useState } from "react"

import { useRouter } from 'next/navigation'
import TabEmpresas from "@/app/components/TabEmpresas"
import ListaOC from "@/app/components/compras/ordenCompra/ListaOC"
import axios from "axios"

const pages = [
    { name: 'Compras', href: '/compras', current: true },
    { name: 'Ordenes de Compra', href: '#', current: true },
  ]


  const minBusqueda = 3
  const titulo = "Compras"
const OCHome = () => {

    const defaultEmpresa = {
        razonSocial: "Todo",
        siglas: "TODO",
        _id: "todo",
        numeroDoc: "todo",
        href:"#",
        current: true
    }
    
    const router = useRouter()

    const [productos, setProductos] = useState([])
    const [ordenesCompra, setOrdenesCompra] = useState([])
    const [mensajeResultados, setMensajeResultados] = useState("Cargando...")

    const [empresaSeleccionada, setEmpresaSeleccionada] = useState(defaultEmpresa)


    const [criterioBusqueda, setCriterioBusqueda] = useState('')

    //ESTADO MODALS PAGINA
    const [modalVerProductos, setModalVerProductos] = useState(false)

    const fetchOrdenesCompra = async () => {
        const response = await fetch('/api/compras/ordenCompra/all')
        const data = await response.json()
        
          
        if (!data.length > 0){
            setMensajeResultados("No Hay Resultados")   
        }
        setOrdenesCompra(data)
    }

    const fetchOrdenesCompraEmpresa = async () => {
        const campoBusqueda = 'empresa.empresaRef'
        const response = await axios.get(`/api/compras/ordenCompra/buscar/parametro?valor=${empresaSeleccionada._id}&campo=${campoBusqueda}`);
        const data = response.data;
        if (!data.length > 0){
            setMensajeResultados("No Hay Resultados")   
        }
        setOrdenesCompra(data)
        
    }

    // const fetchProductosFiltrados = async () => {

    //     const response = await fetch(`/api/inventario/producto/buscar?q=${criterioBusqueda}`)
    //     const data = await response.json()
          
    //     setProductos(data)
    // }

    useEffect( () => {
        
        fetchOrdenesCompra()

    }, [] )

    useEffect(() => {
        setOrdenesCompra([])
        setMensajeResultados("Cargando...")
        if (empresaSeleccionada._id != "todo"){
            fetchOrdenesCompraEmpresa()
        }else{
            fetchOrdenesCompra()
        }
    }, [empresaSeleccionada])

    useEffect( () => {

        // if(criterioBusqueda.length >= minBusqueda){
        //     fetchProductosFiltrados()
        // }
        // if(criterioBusqueda.length == 0){
        //     fetchOrdenesCompra()
        // }
       
          
    }, [criterioBusqueda] )
    
    const handleEditar = (oc) => {
        router.push(`/compras/ordenesCompra/editar/${oc}`)
    }

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
                            // value={criterioBusqueda}
                            // onChange={e => setCriterioBusqueda(e.target.value)}
                            disabled
                            readOnly
                        />
                    </div>
                </div>

                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Link href={`/compras/ordenesCompra/nueva/${empresaSeleccionada?.numeroDoc}`} >
                        { empresaSeleccionada._id != "todo" && (
                            <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Nueva Compra
                        </button>
                        ) }

                        
                    </Link>

                </div>
                <div className="mt-8 flow-root overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <ListaOC ordenesCompra={ordenesCompra}  />
                    </div>
                </div>
                {!ordenesCompra.length > 0 && (
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

export default OCHome