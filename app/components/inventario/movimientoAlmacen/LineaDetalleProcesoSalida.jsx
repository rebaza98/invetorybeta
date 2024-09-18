import { CheckCircleIcon, CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassCircleIcon, PhotoIcon } from "@heroicons/react/24/solid"
import Image from 'next/image';
import { useRef, useState } from 'react';
import ModalCompruebaSerieItemRS from './ModalCompruebaSerieItemRS';

const LineaDetalleProcesoSalida = ({proceso, producto, formValues, setFormValues, validaTodosItems, itemsValidados, setItemsValidados}) => {

    const inputRefs = useRef([]);

    //ModalCompruebaSerieItem
    const [modalCompruebaSerie, setModalCompruebaSerie] = useState(false)

    // Manejar el evento de presionar tecla en el input
    const handleKeyDown = (event, index) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evitar que se envíe el formulario al presionar Enter

            // Enfocar el siguiente input si existe
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };


    // Define el número máximo de inputs por columna
    const maxInputsPerColumn = 5;

    // Divide los inputs en grupos según el número máximo de inputs por columna
    const inputGroups = [];
    for (let i = 0; i < producto.detalle.length; i += maxInputsPerColumn) {
        inputGroups.push(producto.detalle.slice(i, i + maxInputsPerColumn));
    }
    const handleInputClick = (event) => {
        event.target.select()
    }


    const handleOnChange  = (e, index) => {

    //OJO VALIDAR ESPACIOS VACIOS
    //ALGORITMO MODIFICACION EN TREE
    const { value } = e.target

    //OJO ESTO SE PUEDE PASAR A FUNCION RE USO DE CODIGO
    const updatedProcesos = formValues.proceso.map((actualProceso) => {
        if (actualProceso.idProceso === proceso.idProceso){
            const updatedProductos = actualProceso.productos.map((actualProducto) => {
                if (actualProducto.productoId === producto.productoId){
                    const updatedDetalle = actualProducto.detalle.map((actualDetalle) => {
                        if (actualDetalle.index === index){
                            actualDetalle.errorSerie = false
                            actualDetalle.serieValidada = false
                            actualDetalle.mensajeError = ""
                            actualDetalle.serie = value
                        }
                        return actualDetalle
                    })
                }
                return actualProducto
            })
        }
        return actualProceso
    })
    
    setFormValues({
        ...formValues,
        proceso: updatedProcesos,
    });


  }

  const handleOnBlurSerie = async (e, index) => {

    const { value } = e.target
    let serieValidada = false
    let serieRepetidaEnMovimiento = false

    if (value != ""){
        
        

        const updatedProcesos2 = formValues.proceso.map((actualProceso) => {
            const updatedProductos = actualProceso.productos.map((actualProducto) => {
                if (actualProducto.productoId === producto.productoId){
                    const updatedDetalle = actualProducto.detalle.map((actualDetalle) => {
                        if(actualDetalle.serie === value){
                            if ((actualProceso.idProceso === proceso.idProceso) && (actualDetalle.index !== index) && (actualDetalle.serie === value)){
                                serieRepetidaEnMovimiento = true
                            }else{
                                if((actualProceso.idProceso !== proceso.idProceso)){
                                    serieRepetidaEnMovimiento = true
                                }
                            }
                        }
                        return actualDetalle
                    })
                }
                return actualProducto

            })
            return actualProceso
    
        })

    
        if (!serieRepetidaEnMovimiento){
            const response = await fetch(`/api/inventario/itemInventario/buscar/numeroSerie/${producto.productoId}/${value}`);
            const data = await response.json();
            if (!data){
                serieValidada = true
            }
            
        }
        


        //verifica si la serie ingresada existe en mismo producto en BD
        const updatedProcesos = formValues.proceso.map((actualProceso) => {
            if (actualProceso.idProceso === proceso.idProceso){
                const updatedProductos = actualProceso.productos.map((actualProducto) => {
                    if (actualProducto.productoId === producto.productoId){
                        const updatedDetalle = actualProducto.detalle.map(async(actualDetalle) => {
                            if (actualDetalle.index === index){
                               if(serieValidada){
                                actualDetalle.serieValidada = serieValidada
                               }else{
                                actualDetalle.errorSerie = true
                                if (serieRepetidaEnMovimiento){
                                    actualDetalle.mensajeError = "Numero de Serie repetido"
                                }else{
                                    if(!serieValidada){
                                        actualDetalle.mensajeError = "Numero de Serie ya exsiste"
                                    }
                                }
                               }
                            }
                            return actualDetalle
                        })
                    }
                    return actualProducto
    
                })
    
            }
            return actualProceso
    
        })

        setFormValues({
            ...formValues,
            proceso: updatedProcesos,
        });

    }

    


  }

  const handleModalCompruebaSerie = () => {
    setModalCompruebaSerie(true)
  }



  // Calcula el ancho de la imagen en función del número de columnas generadas para los inputs
    const imagenWidth = inputGroups.length > 1 ? 'w-1/2' : 'w-full';
    return (
      <div>
        {modalCompruebaSerie && <ModalCompruebaSerieItemRS open={modalCompruebaSerie} setOpen={setModalCompruebaSerie} proceso={proceso} producto={producto} formValues={formValues} setFormValues={setFormValues} itemsValidados={itemsValidados} setItemsValidados={setItemsValidados} validaTodosItems={validaTodosItems} /> }
          <div className='flex' >
              <div className='w-1/2 flex justify-center items-center'>
                  {producto.imagenUrl ? (
                      <Image
                          src={producto.imagenUrl}
                          alt='{producto.imageAlt}'
                          width={100}
                          height={100}
                          className="h-16 w-20 rounded-md object-cover object-center sm:h-48 sm:w-48"
                          style={{
                              objectFit: "contain"
                          }}
                      />
                    )
                    :
                    (
                          <div style={{
                              objectFit: "contain"
                          }} >
                              <PhotoIcon className="h-20 w-20 text-gray-300" aria-hidden="true" />
                          </div>

                    )
                  }
              </div>
              <div className='w-1/2 '>
                  <div className='pl-4 mt-2   ' >
                      <h3 className="flex text-sm gap-x-4 items-center">
                          <p className="font-medium text-gray-700 hover:text-gray-800">
                              {producto.nombreProducto}
                          </p>

                            <button
                                type="button"
                                className=" bg-blue-300 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => handleModalCompruebaSerie()}
                            >
                                <MagnifyingGlassCircleIcon className='mb4' />
                            </button>
        
                      </h3>
                  </div>
                  <div className="mt-1 mb-4 border-l-2 pl-4 text-xs ">
                      <p className="text-gray-500 text-xs"><strong>SKU:</strong> {producto.sku}</p>
                      <p className="text-gray-500 text-xs"><strong>MODELO:</strong> {producto.modelo}</p>
                      <p className="text-gray-500 text-xs"><strong>MARCA:</strong> {producto.marca.nombreMarca}</p>
                      <p className="text-gray-500 text-xs"><strong>PRECIO:</strong> S/. {producto.precio.toFixed(2)}</p>
                      <p className="text-gray-500 text-xs"><strong>CANTIDAD:</strong> {producto.cantidad}</p>

                  </div>
                  {true && (
                    <>
                  <div className='ml-8 mt-2 flex justify-between w-3/5 ' >
                      <h3
                       className="text-sm">
                          <p className="font-medium text-gray-700 hover:text-gray-800">
                              Series:
                          </p>
                      </h3>
                      <h3 className="text-sm">
                          <p className="font-medium text-gray-700 hover:text-gray-800">
                              Items:
                          </p>
                      </h3>
                  </div>
                  <div className='mb-5 pl-4 flex flex-wrap gap-4' >
                    {producto.detalle.map((current, i) => (
                        <div key={current.index} className='flex items-center gap-x-3 ' >
                            <input
                                type="text"
                                name="serie"
                                readOnly
                                value={(current.serie) ? (current.serie) : ("")}
                                style={{ textAlign: 'right' }}
                                className={`mt-2 mr-2 p-2 border bg-slate-100  rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-5/11 shadow-sm sm:text-sm  
                                                        ${current.errorSerie ? 'border-2 border-red-500 ' : 'border-gray-300'}
                                                        ${current.serieValidada ? 'border-2 border-green-500 ' : 'border-gray-300'}
                                                    `}
                                autoComplete='off'
                            />
                            <div key={current.index} style={{ position: 'relative' }}>
                                <input
                                    readOnly
                                    style={{ textAlign: 'right' }}
                                    className={`w-3/5 mt-2 p-2 border bg-slate-100 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-5/11 shadow-sm sm:text-sm  
                                    ${current.errorSerie ? 'border-2 border-red-500 ' : 'border-gray-300'}
                                    ${current.serieValidada ? 'border-2 border-green-500 ' : 'border-gray-300'}
                            `}
                                    value={(current.nroItem) ? (current.nroItem) : ("")}
                                />
                                {current.mensajeError && (
                                    <span className="absolute top-full left-0 mt-1 text-xs text-red-500">
                                        <i className="mr-1 fas fa-exclamation-circle"></i>{current.mensajeError}
                                    </span>
                                )}
                            </div>
                        </div>
                         )
                    )}
                  </div>  
                    </>
                  )}
              </div>
          </div>
      </div>
    )
}

export default LineaDetalleProcesoSalida