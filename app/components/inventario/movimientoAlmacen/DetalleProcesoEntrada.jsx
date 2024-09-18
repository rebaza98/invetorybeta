import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { PhotoIcon } from "@heroicons/react/24/solid"
import Image from 'next/image';
import LineaDetalleProcesoEntrada from './LineaDetalleProcesoEntrada';

const DetalleProcesoEntrada = ({ proceso,  formValues, setFormValues }) => {




  // Función para manejar el cambio en el campo de cantidad
  const handleCantidadChange = (e, id) => {
    
    const { value } = e.target
    const updatedProducts = productosSeleccionados.map((producto) => {
        if (producto.productoRef === id){
            producto.errorCantidad = false
            producto.cantidad = parseFloat(value)
            
        }
        return producto

    })
    const total = calcularTotal(updatedProducts)
    
    const subTotal = parseFloat(total/1.18).toFixed(2)

    const impuesto = ( total - subTotal ).toFixed(2)


    setFormValues({
        ...formValues,
        productos: updatedProducts,
        total: total,
        subTotal: subTotal,
        impuesto: impuesto
    });

  };

  // Función para manejar el cambio en el campo de cantidad
  const handlePrecioChange = (e, id) => {
    
    const { value } = e.target
    const updatedProducts = productosSeleccionados.map((producto) => {
        if (producto.productoRef === id){
            producto.errorPrecio = false
            producto.precio = parseFloat(value)
            
        }
        return producto

    })
    const total = calcularTotal(updatedProducts)

    const subTotal = parseFloat(total/1.18).toFixed(2)

    const impuesto = ( total - subTotal ).toFixed(2)
    
    setFormValues({
        ...formValues,
        productos: updatedProducts,
        impuesto: impuesto,
        subTotal: subTotal,
        total: total 
    });

  };

  const handleEliminarProductoSeleccionado = (idSeleccionado) => {
    const nuevosProductos = productosSeleccionados.filter((current) => current.productoRef !== idSeleccionado);

    const total = calcularTotal(nuevosProductos)

    const subTotal = parseFloat(total/1.18).toFixed(2)

    const impuesto = ( total - subTotal ).toFixed(2)

    setFormValues({
        ...formValues,
        productos: nuevosProductos,
        impuesto: impuesto,
        subTotal: subTotal,
        total: total 
    });

  }

  

  const handleInputClick = ( event ) => {
    event.target.select()
  }

//   const handleBlur = ( event ) => {
//     event.target.value.toFixed(2)
//   }

    return (
        <>
            <div className="border-2 rounded-xl mt-2  "  >
                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    {proceso.productos.length > 0 && (
                        proceso.productos.map((producto, index) => (
                            <div className='divide-gray-200 border-b border-t mr-5 ' key={`${proceso.idProceso}${producto.productoId} `} >
                                <LineaDetalleProcesoEntrada proceso={proceso} producto={producto} formValues={formValues} setFormValues={setFormValues} />

                            </div>

                        ))
                    )}
                </div>
            </div>

        </>
    )
}

export default DetalleProcesoEntrada
