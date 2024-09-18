import { useEffect, useState } from 'react';
import LineaDetalleProcesoSalida from './LineaDetalleProcesoSalida';
import { toast } from 'react-toastify'

const DetalleProcesoSalida = ({ proceso,  formValues, setFormValues }) => {


    const [validaTodosItems, setValidaTodosItems] = useState(proceso.cantidadItems)
    const [itemsValidados, setItemsValidados] = useState(0)




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

  useEffect(() => {
    if(itemsValidados == validaTodosItems){
        toast.success(`La regulacion ${proceso.regulacionSalidaEmpresa} esta completamente verificada!`, {
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
  }, [itemsValidados])

  const handleInputClick = ( event ) => {
    event.target.select()
  }

//   const handleBlur = ( event ) => {
//     event.target.value.toFixed(2)
//   }

    return (
        <>
            <div className={`border-2 rounded-xl mt-2 ${itemsValidados == validaTodosItems ? "border-green-300" : ""}  `}  >
                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6  ">
                    {proceso.productos.length > 0 && (
                        proceso.productos.map((producto, index) => (
                            <div className='border-b border-t mr-5 ' key={`${proceso.idProceso}${producto.productoId} `} >
                                <LineaDetalleProcesoSalida proceso={proceso} producto={producto} formValues={formValues} setFormValues={setFormValues} validaTodosItems={validaTodosItems} itemsValidados={itemsValidados} setItemsValidados={setItemsValidados} />

                            </div>

                        ))
                    )}
                </div>
            </div>

        </>
    )
}

export default DetalleProcesoSalida
