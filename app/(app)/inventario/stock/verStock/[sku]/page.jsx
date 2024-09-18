"use client"
import LoadingComponent from '@/app/components/LoadingComponent'
import SBreadCrumb from '@/app/components/SBreadCrumb'
import TabEmpresas from '@/app/components/TabEmpresas'
import CabeceraProductoStock from '@/app/components/inventario/stock/CabeceraProductoStock'
import ListaItemInventarioProducto from '@/app/components/inventario/stock/ListaItemInventarioProducto'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const VerProductoHome = ({params}) => {

    const defaultEmpresa = {
        razonSocial: "Todo",
        siglas: "TODO",
        _id: "todo",
        numeroDoc: "todo",
        href:"#",
        current: true
    }


    const productoSku = params.sku

    const titulo = "Ver Stock"
    const pages = [
        { name: 'Inventario', href: '/inventario', current: true },
        { name: 'Stock', href: '/inventario/stock', current: true },
        { name: 'Ver Stock ', href: '#', current: true },
    ]


    const [empresaSeleccionada, setEmpresaSeleccionada] = useState(defaultEmpresa)
    const [mensajeResultados, setMensajeResultados] = useState("Cargando...")


    const [producto, setProducto] = useState({})
    const [itemsInventarioProducto, setItemsInventarioProducto] = useState([])

    const fetchItemsIventarioProducto = async () => {
        const toastId = toast.loading('Cargando Datos de Stock...', { autoClose: false })
        try {

            const responseProducto = await fetch(`/api/inventario/producto/buscar/${productoSku}`)
            const productoData = await responseProducto.json()
            if (productoData){
                setProducto(productoData)
                const response = await fetch(`/api/inventario/itemInventario/buscar/buscarPorProducto/${productoData._id}`)
                const data = await response.json()
                if (data) {
                    toast.update(toastId, { type: 'success', render: 'Carga Completa...', isLoading: false, autoClose: 1500 });
                    setItemsInventarioProducto(data)
                }
            }

            
        } catch (error){
            console.log("ERROR = ", error)
            toast.update(toastId, { type: 'error', render: 'No se puedo Cargar los datos...', isLoading: false, autoClose: true });
        }

    }

    const fetchItemProductoEmpresa = async () => {
        const response = await fetch(`/api/inventario/itemInventario/buscar/buscarPorProducto/parametro?empresaId=${empresaSeleccionada._id}&productoId=${producto._id}`);
        const data = await response.json()
        if (data.length > 0) {
            setItemsInventarioProducto(data)
        }else{
            setMensajeResultados("No hay Resultados...")
        }
    }
    const fetchItemProductoTodo = async () => {
        if (producto._id){
            const response = await fetch(`/api/inventario/itemInventario/buscar/buscarPorProducto/${producto._id}`)
            const data = await response.json()
            if (data.length > 0) {
                setItemsInventarioProducto(data)
            }else{
                setMensajeResultados("No hay Resultados...")
            }
        }else{
            setMensajeResultados("No hay Resultados...")
        }
        
    }

    useEffect(() => {
        fetchItemsIventarioProducto()
    }, [])

    useEffect(() => {
        setItemsInventarioProducto([])
        setMensajeResultados("Cargando...")
        if (empresaSeleccionada._id != "todo"){
            fetchItemProductoEmpresa()
        }else{
            fetchItemProductoTodo()
        }
    }, [empresaSeleccionada])


    



    return (
        <>
        <SBreadCrumb pages={pages} titulo={`${titulo} `} />
        <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2 " >
            <div className='bg-white p-4 rounded-lg shadow-md' >
            {producto.nombreProducto ? (
                  <CabeceraProductoStock producto={producto} empresaSeleccionada={empresaSeleccionada} />
                ) : (
                  <LoadingComponent mensaje={"Cargando datos.."} />
                )} 
                </div>
                <div className=' p-4 mt-4 rounded-lg shadow-md' >
                    <TabEmpresas defaultEmpresa={defaultEmpresa} setEmpresaSeleccionada={setEmpresaSeleccionada}  />
                    <div className="mx-auto max-w-7xl mt-8 px-4 sm:px-6 lg:px-8">
                        <ListaItemInventarioProducto itemsInventario={itemsInventarioProducto} />
                    </div>
                </div>
                {!itemsInventarioProducto.length > 0 && (
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

export default VerProductoHome
