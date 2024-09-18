'use client'
import SBreadCrumb from "@/app/components/SBreadCrumb"
import { useState, useEffect } from "react"

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { fetchAlmacenSeleccionado, fetchEmpresaSeleccionada, retornaFechaSistema } from "@/utils/core/utils"
import SearchOCMovimientoAlmacen from "@/app/components/inventario/movimientoAlmacen/SearchOCMovimientoAlmacen"
import { formMovAlmacenInit } from "@/utils/inventario/utils"
import ListaProcesoMovimientoAlmacen from "@/app/components/inventario/movimientoAlmacen/ListaProcesoMovimientoAlmacen"
import LoadingComponent from "@/app/components/LoadingComponent"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid"
import ModalResumenMovimientoAlmacenECP from "@/app/components/inventario/movimientoAlmacen/resumen/ModalResumenMovimientoAlmacenECP"



const titulo = "Entrada Compra Proveedor"

const NuevaEntradaCompraHome = ({ params }) => {

  const tipoMovimientoAlmacen = "ECP"  

  const pages = [
    { name: 'Inventario', href: '#', current: false },
    { name: 'Movimientos Almacen', href: `/inventario/movimientosAlmacen/${params.almacenId}`, current: false },
    { name: 'Entrada Compra Proveedor', href: '#', current: true },
]


//ESTADOS
  const [formValues, setFormValues] = useState(formMovAlmacenInit)
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState({})
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState({})

  const [totalItems, setTotalItems] = useState(0)
  const [totalValor, setTotalValor] = useState(parseFloat(0.00))

  //ESTADOS DE ERROR



  //ESTADOS MODAL PAGINA

  const [modalResumen, setModalResumen] = useState(false)
  

  const router = useRouter()


  const cargaEmpresa = async () => {
    const response = await fetchEmpresaSeleccionada(params.empresaNroDoc)
    setEmpresaSeleccionada(response)
  }

  const cargaAlmacen = async () => {
    const response = await fetchAlmacenSeleccionado(params.almacenId)
    setAlmacenSeleccionado(response)
  }

  //Hooks
  useEffect( () =>  {
    cargaEmpresa()
    cargaAlmacen()
     
  }, []);

    

  //ESTADOS ASYCN

  const [isSubmitting, setIsSubmitting] = useState(false);



  //HANDLE SUBMIT
  //SUBMMIT

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true);
    let errores = []
    let contValidados = 0
    let contItemsConSerie = 0
    let contItems = 0
    let acumulaValor = 0

    //validaciones

   

    if(formValues.proceso.length === 0 ){
        
        errores.push("No se seleccionaron Ordenes de Compra")
        toast.error("No se seleccionaron Ordenes de Compra", {
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
      

      const procesosActualizados = formValues.proceso.map((actualProceso) => {
        contItems += actualProceso.cantidadItems
        acumulaValor += actualProceso.total
        setTotalItems(contItems)
        setTotalValor(acumulaValor)
        const productosActualizados = actualProceso.productos.map((actualProducto) => {
          if (actualProducto.usaSerie){
            contItemsConSerie += actualProducto.cantidad
          }
          
          const detalleActualizados = actualProducto.detalle.map((actualDetalle) => {
            let errorEnSerie = false
            let mensajeError = ""
            if (((!actualDetalle.errorSerie) || (actualDetalle.serieValidada)) && actualProducto.usaSerie){
              if (actualDetalle.serie === ""){
                errorEnSerie = true
                mensajeError = "Serie vacia"
                errores.push("Error en Serie")
                return {
                  ...actualDetalle,
                  errorSerie: errorEnSerie,
                  mensajeError: mensajeError
                }
              }
              
            }
            if (actualDetalle.errorSerie){
              errores.push("Existe Error en Serie = ", actualDetalle.serie)
              console.log("EXTIEN ERRO OJO")
            }
            if (actualDetalle.serieValidada && actualProducto.usaSerie ){
              contValidados += 1
            }
            
            return {...actualDetalle}
              
            
          })
          return {
            ...actualProducto,
            detalle: detalleActualizados
          }
        })
        return {
          ...actualProceso,
          productos: productosActualizados

        }
      })

      if (errores.length > 0){
        toast.error("Existen Errores en las series, revisar...", {
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
          proceso: procesosActualizados
        })
      }else{
        //no hay errores vacio
        if (contValidados == contItemsConSerie){
          //SE VALIDO TODOS LOS ITEMS
          setModalResumen(true)
        }

      }

      

      
      
    }
  

    //SI NO HAY ERRORES INICIO GUARDADO...
   

}

  


  const handleLimpiarDatos = () => {
    setFormValues(formMovAlmacenInit)
    
}





    return (
      <>
        <SBreadCrumb pages={pages} titulo={titulo} />
        <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2">
          <form onSubmit={handleSubmit} className="">
            {/* modales */}
            {modalResumen && (<ModalResumenMovimientoAlmacenECP params={params} movimiento={formValues} empresa={empresaSeleccionada} almacen={almacenSeleccionado} open={modalResumen} setOpen={setModalResumen} totalItems={totalItems} totalValor={totalValor} />)}
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-wrap gap-4 mb-4" >
              <div className="w-full" >
                <h3 className="text-xs font-semibold leading-7 ml-3  text-gray-600">Almacen: 
                {almacenSeleccionado.alias ? (
                  almacenSeleccionado.alias
                ) : (
                  <LoadingComponent mensaje={"Cargando datos.."} />
                )}
                </h3>
                <h3 className="text-xl font-semibold leading-7 ml-3  text-gray-600">Empresa</h3>
                {empresaSeleccionada.nombreEmpresa ? (
                  <div className="w-full flex flex-row gap-4" >
                    <label htmlFor="nombreProducto" className="block text-3xl ml-3 font-medium text-gray-800">
                      {`${empresaSeleccionada?.nombreEmpresa}`}
                    </label>
                  </div>
                ) : (
                  <LoadingComponent mensaje={"Cargando datos.."} />
                )}
              </div>
            </div>
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <h3 className="text-xl  font-semibold leading-7 m-3 text-gray-900">Seleccion de Orden Compras</h3>
                {empresaSeleccionada.nombreEmpresa ? (
                  <SearchOCMovimientoAlmacen formValues={formValues} setFormValues={setFormValues} empresaSeleccionada={empresaSeleccionada} />
                ):(
                  <LoadingComponent mensaje={"Cargando datos.."} />
                )}
                
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                  <section aria-labelledby="cart-heading" className="lg:col-span-full">
                    <ListaProcesoMovimientoAlmacen procesosSeleccionados={formValues.proceso} formValues={formValues} setFormValues={setFormValues} tipoMovimiento={tipoMovimientoAlmacen} />
                  </section>
                </div>
                <div className="flex justify-between m-4" >
                  <button
                    type="button"
                    className="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    onClick={() => handleLimpiarDatos()}
                  >
                    Limpiar Datos
                  </button>
                  
                  <button
                    type="submit"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Grabar
                    <ArrowRightEndOnRectangleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                
              </div>

            </div>

          </form>
        </div>
      </>
      
            

    )
}

export default NuevaEntradaCompraHome