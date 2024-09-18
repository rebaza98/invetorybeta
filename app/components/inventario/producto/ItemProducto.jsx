import { validaCantidadMayorOoString } from '@/utils/core/utils';
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { PhotoIcon } from "@heroicons/react/24/solid"
import Image from 'next/image';

const ItemProducto = ({ product, productosSeleccionados, formValues, setFormValues, calcularTotal }) => {




  const actualizaImpuestoTotal = (updatedProducts) => {
    const total = calcularTotal(updatedProducts).toFixed(2)
    
    const subTotal = parseFloat(total/1.18).toFixed(2)

    const impuesto = ( total - subTotal ).toFixed(2)


    setFormValues({
        ...formValues,
        productos: updatedProducts,
        total: total,
        subTotal: subTotal,
        impuesto: impuesto
    });
  }

  // Función para manejar el cambio en el campo de cantidad
  const handleCantidadChange = (e, id) => {
    
    const { value } = e.target
     // Verificar si el valor es numérico, de lo contrario, asignar 0
     const cantidadValida = validaCantidadMayorOoString(value)
    
    const updatedProducts = productosSeleccionados.map((producto) => {
        if (producto.productoId === id){
            producto.errorCantidad = false
            producto.cantidad = parseFloat(cantidadValida)
            
        }
        return producto

    })
    
    actualizaImpuestoTotal(updatedProducts)

  };

  // Función para manejar el cambio en el campo de precio
  const handlePrecioChange = (e, id) => {
    
    const { value } = e.target
    // Verificar si el valor es numérico, de lo contrario, asignar 0
    const precioValido = validaCantidadMayorOoString(value)
    const updatedProducts = productosSeleccionados.map((producto) => {
        if (producto.productoId === id){
            producto.errorPrecio = false
            producto.precio = parseFloat(precioValido)
            
        }
        return producto

    })
    actualizaImpuestoTotal(updatedProducts)
  };

  const handlePrecioOnBlur = (e, id) => {
    
    const { value } = e.target
    // Verificar si el valor es numérico, de lo contrario, asignar 0
    const precioValido = validaCantidadMayorOoString(value)
    const updatedProducts = productosSeleccionados.map((producto) => {
        if (producto.productoId === id){
            producto.errorPrecio = false
            producto.precio = parseFloat(precioValido).toFixed(2)
            
        }
        return producto

    })
    actualizaImpuestoTotal(updatedProducts)

  };

  const handleEliminarProductoSeleccionado = (idSeleccionado) => {
    const nuevosProductos = productosSeleccionados.filter((current) => current.productoId !== idSeleccionado);

    actualizaImpuestoTotal(nuevosProductos)

  }

  

  const handleInputClick = ( event ) => {
    event.target.select()
  }

//   const handleBlur = ( event ) => {
//     event.target.value.toFixed(2)
//   }

    return (
        <>
            <div className="flex-shrink-0">
                {product.imagenUrl ? (
                    <Image
                        src={product.imagenUrl}
                        alt='{product.imagenAlt}'
                        width={500}
                        height={500}
                        className="h-56 w-56 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        style={{
                            objectFit: "none"
                        }}
                    />
                )
                    :
                    (
                        <div style={{
                            objectFit: "contain"
                        }} >
                            <PhotoIcon className="h-48 w-48 text-gray-300" aria-hidden="true" />
                        </div>

                    )
                }
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                                <p className="font-medium text-gray-700 hover:text-gray-800">
                                    {product.nombreProducto}
                                </p>
                            </h3>
                        </div>
                        <div className="mt-1  text-xs">
                            <p className="text-gray-500 text-xs"><strong>SKU:</strong> {product.sku}</p>
                            <p className="text-gray-500 text-xs"><strong>MODELO:</strong> {product.modelo}</p>
                            <p className="text-gray-500 text-xs"><strong>MARCA:</strong> {product.marca.nombreMarca}</p>
                            {product.size ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                            ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Cantidad
                            </label>
                            <input
                                type="number"
                                name="cantidad"
                                key={product.productoId}
                                id={`cantidad-${product.productoId}`}
                                onClick={handleInputClick}
                                // value={formValues.productos[productIdx].cantidad}
                                value={product.cantidad}
                                onChange={(e) => handleCantidadChange(e, product.productoId)} // Llama a una función para manejar el cambio
                                className={`mt-1 p-2 border uppercase  rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm  
                                       ${product.errorCantidad ? 'border-2 border-red-500 ' : 'border-gray-300' }                                                                         
                                    `}
                                autoComplete='off'
                            />
                        </div>
                        <div className="mt-4" >
                            <label className="block text-sm font-medium text-gray-700">
                                Precio
                            </label>

                            <input
                                type="number"
                                name="precio"
                                id={`precio-${product.productoId}`}
                                key={product.productoId}
                                // value={formValues.productos[productIdx].precio}
                                value={product.precio}
                                onClick={handleInputClick}
                                onBlur={(e) => handlePrecioOnBlur(e, product.productoId)}
                                onChange={(e) => handlePrecioChange(e, product.productoId)}
                                className={`mt-1 p-2 border uppercase  rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm  
                                       ${product.errorPrecio ? 'border-2 border-red-500 ' : 'border-gray-300' }                                                                         
                                    `}
                                autoComplete='off'
                            />
                        </div>

                        <div className="absolute right-0 top-0">
                            <button onClick={() => handleEliminarProductoSeleccionado(product.productoRef)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Remove</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-4 flex space-x-2 text-sm text-gray-700">


                    <span>Stock: {product.stock}</span>
                </p>
            </div>
        </>
    )
}

export default ItemProducto
