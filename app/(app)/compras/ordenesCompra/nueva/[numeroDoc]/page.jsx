'use client'
import SBreadCrumb from "@/app/components/SBreadCrumb"
import CModalIngresaProveedorOC from "@/app/components/compras/ordenCompra/CModalIngresaProveedorOC"
import { formOrdenCompraInit } from "@/utils/compras/utils"
import { useState, useEffect } from "react"

import SearchProductoOC from "@/app/components/compras/ordenCompra/SearchProductoOC"
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import ListaItemProducto from "@/app/components/inventario/producto/ListaItemProducto"
import FechaInput from "@/app/components/core/FechaInput"
import { fetchEmpresaSeleccionada, retornaFechaSistema } from "@/utils/core/utils"
import LoadingComponent from "@/app/components/LoadingComponent"



//import { auth } from "@/auth" 

const pages = [
    { name: 'Compras', href: '#', current: false },
    { name: 'Ordenes de Compra', href: '/compras/ordenesCompra', current: true },
    { name: 'Nueva Orden Compra', href: '#', current: true },
]






const titulo = "Nueva Compra"

const NuevaOrdenCompraHome = ({ params }) => {


  const nroDocEmpresa = params.numeroDoc
  
  

//ESTADOS
  const [formValues, setFormValues] = useState(formOrdenCompraInit)
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState({})



  //ESTADOS DE ERROR

  const [proveedorInput, setProveedorInput] = useState(false)


  //ESTADOS MODAL PAGINA

  const [modalIngresaProveedorOC, setModalIngresaProveedorOC] = useState(false)
  

  const router = useRouter()


  const cargaEmpresa = async () => {
    const response = await fetchEmpresaSeleccionada(nroDocEmpresa)
    setEmpresaSeleccionada(response)
  }

  //Hooks
  //Local Storage
  useEffect( () =>  {
    cargaEmpresa()
    const storedValues = JSON.parse(localStorage.getItem(`ordenCompraState${nroDocEmpresa}`));
      if (storedValues) {

          setFormValues({
            ...storedValues,
            fechaCompra: retornaFechaSistema()
          });
      }
     
  }, []);

  useEffect(() => {
      localStorage.setItem(`ordenCompraState${nroDocEmpresa}`, JSON.stringify(formValues));
      
  }, [formValues]);




    

  //ESTADOS ASYCN

  const [isSubmitting, setIsSubmitting] = useState(false);

    function calcularTotal(productos) {
      let total = 0;
      for (const producto of productos) {
        if (producto.cantidad && producto.cantidad > 0 && producto.precio && producto.precio > 0) {
          total += producto.cantidad * producto.precio;
        }
      }
      
      return total;
    }

  const handleCambioTotalesDelete = () => {
    const updatedFormValues = { ...formValues };
    updatedFormValues.total = calcularTotal(updatedFormValues.productos);

    updatedFormValues.subTotal = parseFloat(updatedFormValues.total/1.18).toFixed(2)

    updatedFormValues.impuesto = ( updatedFormValues.total - updatedFormValues.subTotal ).toFixed(2)
    setFormValues(updatedFormValues)
  }


  //HANDLE SUBMIT
  //SUBMMIT

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true);
    let errores = []

    //validaciones

    if(!formValues.proveedor.numeroDoc){
      errores.push("Seleccione un proveedor")
        toast.error("Seleccione un proveedor", {
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

    if(formValues.productos.length === 0 ){
        
        errores.push("No se seleccionaron Productos")
        toast.error("No se seleccionaron Productos", {
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
      let errorEnPrecio = false
      let errorEnCantidad = false
      const nuevosProductos = formValues.productos.map(producto => {
        // Verificar si el precio es NaN o está vacío
        const precioInvalido = isNaN(producto.precio) || producto.precio === '';
        const cantidadInvalida = isNaN(producto.cantidad) || producto.cantidad === '';
      
        // Verificar si el precio es menor o igual a 0
        const errorPrecio = !precioInvalido && (parseFloat(producto.precio) <= 0);
        const errorCantidad = !cantidadInvalida && (parseFloat(producto.cantidad) <= 0);

        if (errorPrecio){
          errorEnPrecio = true
        }

        if (errorCantidad){
          errorEnCantidad = true
        }

      
        // Devolver el producto actualizado con el nuevo valor de errorPrecio
        return {
          ...producto,
          errorPrecio: errorPrecio,
          errorCantidad: errorCantidad
        };
      });
      if(errorEnPrecio || errorEnCantidad){
        errores.push("Existe Error en los precios o cantidad")
        toast.error("Existe Error en los precios o cantidad", {
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
          productos: nuevosProductos
        });

      }
      
      
    }
  

    //SI NO HAY ERRORES INICIO GUARDADO...
    if (errores.length === 0){
        const toastId = toast.loading('Guardando Orden Compra...', { autoClose: false });
        try{
            const response = await fetch('/api/compras/ordenCompra/nueva', {
                method: 'POST',
                body: JSON.stringify({
                  proveedor: formValues.proveedor,
                  empresa: {
                    empresaRef: empresaSeleccionada.empresaRef,
                    nombreEmpresa: empresaSeleccionada.nombreEmpresa,
                    nroDocEmpresa: empresaSeleccionada.nroDocEmpresa
                  },
                  usuario: formValues.usuario,
                  productos:formValues.productos,
                  alias: formValues.alias,
                  fechaCompra: formValues.fechaCompra,
                  fechaEntrega: formValues.fechaEntrega,
                  ingresadoAlmacen: formValues.ingresadoAlmacen,
                  pagada: formValues.pagada,
                  pagos:formValues.pagos,
                  documentos:formValues.documentos,
                  obs: formValues.obs,
                  impuesto: formValues.impuesto,
                  subTotal: formValues.subTotal,
                  total: formValues.total,

                })
            })
            if (!response.ok){
                console.log("Hubo un error...", response)
                toast.update(toastId, { type: 'error', render: 'Ocurrió un Error...', isLoading: false, autoClose: true });
            }else{
                const savedOrdenCompra = await response.json(); // Obtener el objeto JSON del servidor
                localStorage.removeItem(`ordenCompraState${nroDocEmpresa}`);
                setFormValues(formOrdenCompraInit);
                console.log("SE INGRESO CORRECTAMENTE")
                
                toast.update(toastId, { type: 'success', render: `Orden Compra ${savedOrdenCompra.empresa.nombreEmpresa} OC: ${String(savedOrdenCompra.ocEmpresa).padStart(5, '0') } Grabada con exito...`, isLoading: false, autoClose: true });
                router.push('/compras/ordenesCompra')
            }
        }catch (error) {
            console.log("ERROR = ", error)
            setIsSubmitting(false);
        }finally{
            
        }    
    }else{
        console.table(errores)
        //setListaErrores(errores)
        //setErrorAlert(true)
        setIsSubmitting(false);
    }

}

  


  const handleLimpiarDatos = () => {
    localStorage.removeItem(`ordenCompraState${nroDocEmpresa}`);
    setFormValues(formOrdenCompraInit)
    
}

  const actualizarFecha = (campoFecha, valor) => {
    setFormValues({
      ...formValues,
      [campoFecha]: valor
      
    })
  }




    return (
      <>
        <SBreadCrumb pages={pages} titulo={titulo} />
        <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2">
          <form onSubmit={handleSubmit} className="">
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-wrap gap-4 mb-4" >
            <h3 className="text-xl font-semibold leading-7 ml-3 mt-3 text-gray-600">Empresa</h3>
              <div className="w-full flex flex-row gap-4" >
                {empresaSeleccionada.nombreEmpresa ? (

                  <label htmlFor="nombreProducto" className="block text-3xl ml-3 font-medium text-gray-800">
                    {`${empresaSeleccionada?.nombreEmpresa}`}
                  </label>

                ) : (
                  <LoadingComponent classString={"ml-3"} mensaje={"Cargando Datos..."}  />
                )}
              </div>
              {/* <div className="w-full flex flex-row gap-4" >
                <label htmlFor="nombreProducto" className="block text-3xl ml-3 font-medium text-gray-800">
                  {`${empresaSeleccionada?.nombreEmpresa}`}
                </label>
              </div> */}
              <div className="w-full flex flex-row gap-4" >
                {modalIngresaProveedorOC && <CModalIngresaProveedorOC open={modalIngresaProveedorOC} setOpen={setModalIngresaProveedorOC} formValues={formValues} setFormValues={setFormValues} />}
                <div className="w-full md:w-1/2 lg:w-1/3"
                  onDoubleClick={() => {
                    setProveedorInput(false)
                    setModalIngresaProveedorOC(true)
                  }}
                >
                  <label htmlFor="nombreProducto" className="block text-sm font-medium text-gray-700">
                    Proveedor
                  </label>
                  <input
                    readOnly
                    type="text"
                    name="proveedor"
                    id="idProveedor"
                    value={formValues.proveedor.razonSocial}
                    onChange={e => {
                      setProveedorInput(true)
                      setFormValues({
                        ...formValues,
                        proveedor: {
                          ...formValues.proveedor,
                          razonSocial: e.target.value.toLocaleUpperCase()
                        }
                      })
                    }}
                    //className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                    className={`block w-full uppercase rounded-md py-1.5  text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-200 ${proveedorInput ? 'border-1 border-red-500 ' : 'border-0'
                      }`}
                    autoComplete='off'
                  />
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/12">
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo
                  </label>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {formValues.proveedor.docId.nombre}
                  </p>

                </div>
                <div className="w-1/2 md:w-1/2 lg:w-1/4">
                  <label className="block text-sm font-medium text-gray-700">
                    Numero Documento
                  </label>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {formValues.proveedor.numeroDoc}
                  </p>

                </div>
              </div>
              <div className="w-full flex flex-row gap-4" >
                <div className="w-full md:w-1/2 lg:w-1/6">
                  <label htmlFor="idFechaCompra" className="block text-sm font-medium text-gray-700">
                    Fecha de Compra
                  </label>
                  <FechaInput actualizaFecha={actualizarFecha} fechaCampo={"fechaCompra"} valor={formValues.fechaCompra} />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/6">
                  <label htmlFor="idFechaEntrega" className="block text-sm font-medium text-gray-700">
                    Fecha de Entrega
                  </label>
                  <FechaInput actualizaFecha={actualizarFecha} fechaCampo={"fechaEntrega"} valor={formValues.fechaEntrega} />
                </div>
                <div className="w-full md:w-1/2 lg:w-2/6">
                  <label htmlFor="idobs" className="block text-sm font-medium text-gray-700">
                    Observacion
                  </label>
                  <input
                    type="text"
                    name="observacion"
                    id="idobs"
                    value={formValues.obs}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        obs: e.target.value
                      })
                    }}
                    className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                    autoComplete='off'
                  />
                </div>
              </div>

            </div>

            <div className="bg-white">
            
              <div className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
              <h3 className="text-xl  font-semibold leading-7 m-3 text-gray-900">Seleccion de Productos</h3>  
                <SearchProductoOC formValues={formValues} setFormValues={setFormValues} />
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                  <section aria-labelledby="cart-heading" className="lg:col-span-7">
                    <h2 id="cart-heading" className="sr-only">
                      Items in your shopping cart
                    </h2>
                    <ListaItemProducto productosSeleccionados={formValues.productos} formValues={formValues} setFormValues={setFormValues} calcularTotal={calcularTotal}   />
                    
                  </section>

                  {/* Order summary */}
                  <section
                    aria-labelledby="summary-heading"
                    className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                  >
                    
                    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                      Resumen de Orden
                    </h2>

                    <dl className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">{formValues.subTotal}</dd>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <dt className="flex text-sm text-gray-600">
                          <span>Impuesto 18%</span>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">{formValues.impuesto}</dd>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                        <dd className="text-base font-medium text-gray-900">S/. {formValues.total}</dd>
                      </div>
                    </dl>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Guardando...' : 'Grabar'}
                      </button>
                    </div>
                  </section>
                </div>
                <button
                  type="button"
                  className="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  onClick={() => handleLimpiarDatos()}
                >
                  Limpiar Datos
                </button>
              </div>

            </div>
            
          </form>
        </div>
      </>
      
            

    )
}

export default NuevaOrdenCompraHome