import { MagnifyingGlassCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"


const InputSerieItem = ({producto, current, i, handleCurrentItem, formValues, setFormValues}) => {

    console.log("current = ", current)

    const handleClearInput = (current) => {

        const productosActualizados = formValues.productos.map((actualProducto) => {
            
            if (actualProducto.productoId == producto.productoId){
                console.log("ACTUALCPRODUCTO INPOUT SERIE = ", actualProducto.detalle[current.index])
                actualProducto.detalle[current.index].serie = ""
                actualProducto.detalle[current.index].nroItem = null
                actualProducto.detalle[current.index].itemId = null
                actualProducto.detalle[current.index].errorVacio = false
            }
            return actualProducto
        } )



        setFormValues({
            ...formValues,
            productos: productosActualizados
        })
    }





    return (
        <>
            <div key={current.index} className='flex items-center gap-x-3 ' >
                <button
                    type="button"
                    className=" bg-blue-300 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => handleCurrentItem(producto.productoId, i)}
                >
                    <MagnifyingGlassCircleIcon className='mb4' />
                </button>
                <input
                    type="text"
                    name="serie"
                    //ref={input => inputRefs.current[i] = input}
                    readOnly
                    value={(current.serie) ? (current.serie): ("")}
                    style={{ textAlign: 'right' }}
                    //onClick={handleInputClick}
                    //onFocus={handleInputClick}
                    //onKeyDown={e => handleKeyDown(e, i)}
                    //onChange={(e) => handleOnChange(e, current.index)}
                    //onBlur={(e) => handleOnBlurSerie(e, current.index)}
                    className={`mt-2 mr-2 p-2 border bg-slate-100  rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-5/11 shadow-sm sm:text-sm  
                                                ${current.errorSerie ? 'border-2 border-red-500 ' : 'border-gray-300'}
                                                ${current.serieValidada ? 'border-2 border-green-500 ' : 'border-gray-300'}
                                            `}
                    autoComplete='off'
                />
                <div key={current.index} style={{ position: 'relative' }}>
                    <input
                        readOnly
                        className={`w-3/5 mt-2 p-2 border bg-slate-100 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-5/11 shadow-sm sm:text-sm  
                        ${current.errorVacio ? 'border-2 border-red-500 ' : 'border-gray-300'}
                    `}
                        value={(current.nroItem) ? (current.nroItem) : ("")}
                    />


                    {current.errorVacio && (
                        <span className="absolute top-full left-0 mt-1 text-xs text-red-500">
                            <i className="mr-1 fas fa-exclamation-circle"></i>{current.mensajeError}
                        </span>
                    )}
                </div>
                            
                        
                
                <button
                    type="button"
                    className=" bg-gray-300 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => handleClearInput(current)}
                >
                    <XCircleIcon  className='mb4' />
                </button>
                
            </div>
        </>
  )
}

export default InputSerieItem
