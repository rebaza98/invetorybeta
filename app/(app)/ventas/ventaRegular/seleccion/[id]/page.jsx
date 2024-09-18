'use client'
import LoadingComponent from "@/app/components/LoadingComponent"
import SBreadCrumb from "@/app/components/SBreadCrumb"
import LineaDetalleProducto from "@/app/components/regulaciones/regulacionSalida/LineaDetalleProducto"
import ModalIngresaSerieItem from "@/app/components/regulaciones/regulacionSalida/ModalIngresaSerieItem"
import { formatearFecha } from "@/utils/core/utils"
import { estadosRS, formRegulacionSalidaInit } from "@/utils/regulaciones/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

const SeleccionRSHome = ({params}) => {

    const id = params.id

    const titulo = "Seleccion De Items"

    const router = useRouter()


    const pages = [
        { name: 'Regulaciones', href: '#', current: false },
        { name: 'Regulacion Salida', href: `/regulaciones/regulacionSalida`, current: false },
        { name: 'Seleccion Items', href: '#', current: true },
    ]

    const [formValues, setFormValues] = useState(formRegulacionSalidaInit)

    const [currentProducto, setCurrentProducto] = useState("")

    const [currentIndex, setCurrentIndex] = useState("")


    const [modalIngresaSerieItem, setModalIngresaSerieItem] = useState(false)



    const handleCurrentItem = (productoId, index) => {
        setCurrentProducto(productoId)
        setCurrentIndex(index)
        setModalIngresaSerieItem(true)

    }



    


    const getDatosRS = async () => {
		const toastId = toast.loading('Cargando Datos de Regulacion Salida...', { autoClose: false })
		try {

			const response = await fetch(`/api/regulaciones/regulacionSalida/buscar/${id}`)
			const data = await response.json()
			if (data) {

				//Solo editar si no ha sido ingresada
				if (data.estado == estadosRS["anulado"] || data.estado == estadosRS["ingresado"] || data.estado == estadosRS["pendiente"]) {
					toast.update(toastId, { type: 'warning', render: `La Regulacion ${data.regulacionSalida} esta ${data.estado} no puede editarse ...`, isLoading: false, autoClose: 1000 });
					router.push('/regulaciones/regulacionSalida')
				} else {
                    const mapedDataDetalle = data.productos.map((miprodcuto) => {
                        const detalleActualizado = miprodcuto.detalle.map((actualDetalle) => {
                            return {
                                ...actualDetalle,
                                errorVacio: false,
                                mensajeError: ""
                            }
                        })
                        miprodcuto.detalle = detalleActualizado
                        return miprodcuto
                    })
                    data.prodcutos = mapedDataDetalle
					setFormValues(data)
					toast.update(toastId, { type: 'success', render: 'Carga Completa...', isLoading: false, autoClose: 1500 });
				//	const responseEmpresa = await fetchEmpresaSeleccionada(data.empresa.nroDocEmpresa)
				//	setEmpresaSeleccionada(responseEmpresa)
				}

			} else {
				setFormValues(formRegulacionSalidaInit)

				toast.update(toastId, { type: 'error', render: 'No se pudo Cargar los datos...', isLoading: false, autoClose: true });
				router.push('/regulaciones/regulacionSalida')
			}

		} catch (error) {
			console.log("ERROR = ", error)
			toast.update(toastId, { type: 'error', render: 'No se puedo Cargar los datos...', isLoading: false, autoClose: true });
			//router.push('/compras/ordenesCompra')
		}

	}

    //ESTADOS ASYCN

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [itemsSeleccionados, setItemsSeleccionados] = useState([])

    //Hooks
	useEffect(() => {
		getDatosRS()

	}, []);
    
    const handleSubmit = async (e) => {
        console.log("SUBMITING")
        e.preventDefault()
        setIsSubmitting(true);
        let errores = []
        let existeErrorVacio = false
        //VERIFICA VACIOS   
        const productosActualizados = formValues.productos.map((actualProducto) => {
            for(let i = 0; i< actualProducto.detalle.length; i++){
                console.log("ESTO ENTRA", actualProducto.detalle[i].nroItem)
                if (!actualProducto.detalle[i].nroItem){
                    actualProducto.detalle[i].errorVacio = true
                    actualProducto.detalle[i].mensajeError = "Falta Seleccionar"
                    existeErrorVacio = true
                }
            }
            return actualProducto
        })
        if (existeErrorVacio){
            
            errores.push("Existe Items Vacios...")
            toast.error("Existe Items Vacios...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setFormValues({
                ...formValues,
                productos: productosActualizados
            })
        }

        try {
            const revalidaRS = await fetch(`/api/regulaciones/regulacionSalida/buscar/${id}`)
            const dataRevalidaRS = await revalidaRS.json()
            console.log("VALIDACION MODIFICACION = ", dataRevalidaRS, formValues)
            if (dataRevalidaRS.updatedAt == formValues.updatedAt) {
                console.log("Validacion edicion externa pasada")
            } else {
                errores.push("La regulacion ha sido editada externamente vuelva a cargar...")
                toast.error("La regulacion ha sido editada externamente vuelva a cargar...", {
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
        } catch {

        }


        //SI NO HAY ERRORES INICIO GUARDADO...
		if (errores.length === 0) {
			const toastId = toast.loading('Guardando Seleccion de Regulacion Salida...', { autoClose: false });
			try {
                    const response = await fetch(`/api/regulaciones/regulacionSalida/seleccion/${id}`, {
                        method: 'PATCH',
                        body: JSON.stringify({
                            id: formValues._id,
                            productos: formValues.productos,
                            cantidadItems: formValues.cantidadItems, 
                        })
                    })
                    if (!response.ok) {
                        console.log("Hubo un error...", response)
                        toast.update(toastId, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
                    } else {
                        const savedRegulacionSalida = await response.json(); // Obtener el objeto JSON del servidor
                        setFormValues(formRegulacionSalidaInit);
                        console.log("SE INGRESO CORRECTAMENTE", savedRegulacionSalida)

                        toast.update(toastId, { type: 'success', render: `Regulacion Salida ${savedRegulacionSalida.empresa.nombreEmpresa} RS: ${String(savedRegulacionSalida.regulacionSalidaEmpresa).padStart(5, '0')} Grabada con exito...`, isLoading: false, autoClose: true });
                        router.push('/regulaciones/regulacionSalida')
                    }
				


                } catch (error) {
                    console.log("ERROR = ", error)
                    setIsSubmitting(false);
                } finally {

                }
		} else {
			console.table(errores)
			//setListaErrores(errores)
			//setErrorAlert(true)
			setIsSubmitting(false);
		}



    }


    return (
        <>
            <SBreadCrumb pages={pages} titulo={titulo} />
            <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2">
                <form onSubmit={handleSubmit} className="">
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-wrap gap-4 mb-4" >
                        <div className="w-full" >
                            
                            <h3 className="text-xl font-semibold leading-7 ml-3  text-gray-600">Empresa</h3>
                            {formValues.empresa.nombreEmpresa ? (
                                <div className="w-full flex flex-row gap-4" >
                                    <label htmlFor="nombreProducto" className="block text-3xl ml-3 font-medium text-gray-800">
                                        {`${formValues.empresa.nombreEmpresa}`}
                                    </label>
                                </div>
                            ) : (
                                <LoadingComponent mensaje={"Cargando datos.."} />
                            )}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <label htmlFor="nombreProducto" className="block text-sm font-medium text-gray-700">
                                Nro Regulacion Salida:
                            </label>
                            <p>{String(formValues.regulacionSalidaEmpresa).padStart(6,'0') }</p>
                            
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <label htmlFor="nombreProducto" className="block text-sm font-medium text-gray-700">
                                Fecha Regulacion Salida:
                            </label>
                            <p>{formatearFecha(formValues.fechaRegulacion)}</p>
                            
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-wrap gap-4 mb-4" >
                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            {formValues.productos.length > 0 && (
                                formValues.productos.map((producto, index) => (
                                    <div className='divide-gray-200 border-b border-t mr-5 ' key={`${producto.productoId} `} >
                                        <LineaDetalleProducto proceso={formValues.regulacionSalidaEmpresa} producto={producto} formValues={formValues} setFormValues={setFormValues} handleCurrentItem={handleCurrentItem} />

                                    </div>

                                ))
                            )}
                        </div>
                        {modalIngresaSerieItem && <ModalIngresaSerieItem open={modalIngresaSerieItem} setOpen={setModalIngresaSerieItem} formValues={formValues} setFormValues={setFormValues} currentProducto={currentProducto} currentIndex={currentIndex} />}
                        
                        
                    </div>
                    <div className="flex justify-end mt-6">
                        <div className="w-1/3" >
                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Guardando...' : 'Grabar'}
                            </button>
                        </div>
                      
                    </div>
                </form>
            </div>
        </>
    )
}

export default SeleccionRSHome
