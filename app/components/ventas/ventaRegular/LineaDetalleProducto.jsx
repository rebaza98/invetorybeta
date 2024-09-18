import { CheckCircleIcon, CheckIcon, ClockIcon, QuestionMarkCircleIcon, TrashIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { PhotoIcon } from "@heroicons/react/24/solid"
import Image from 'next/image';
import { useRef } from 'react';
import SearchItemInventarioProducto from './SearchItemInventarioProducto';
import InputSerieItem from './InputSerieItem';

const LineaDetalleProducto = ({proceso, producto, formValues, setFormValues, handleCurrentItem}) => {

    const inputRefs = useRef([]);

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

    // let inputsCantidad = []
    // for(let i = 0; i < producto.cantidad ; i++){
    //     let currentObj = {
    //         index: i
    //     }
    //     inputsCantidad.push(currentObj)

    // }


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



  // Calcula el ancho de la imagen en función del número de columnas generadas para los inputs
    const imagenWidth = inputGroups.length > 1 ? 'w-1/2' : 'w-full';
    return (
      <div>
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
                      <h3 className="text-sm">
                          <p className="font-medium text-gray-700 hover:text-gray-800">
                              {producto.nombreProducto}
                          </p>
                      </h3>
                  </div>
                  <div className="mt-1 mb-4 border-l-2 pl-4 text-xs ">
                      <p className="text-gray-500 text-xs"><strong>SKU:</strong> {producto.sku}</p>
                      <p className="text-gray-500 text-xs"><strong>MODELO:</strong> {producto.modelo}</p>
                      <p className="text-gray-500 text-xs"><strong>MARCA:</strong> {producto.marca.nombreMarca}</p>
                      <p className="text-gray-500 text-xs"><strong>PRECIO:</strong> S/. {producto.precio.toFixed(2)}</p>
                      <p className="text-gray-500 text-xs"><strong>CANTIDAD:</strong> {producto.cantidad}</p>

                  </div>
                  
                  <div className='pl-4 ml-8 mt-2 flex justify-between w-3/5 ' >
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
                  
                  <div className='mb-5 pl-4 flex flex-wrap gap-4 items-center' >
                   
                   
                    {producto.detalle.map((current, i) => (
                        <InputSerieItem key={current.index} producto={producto} current={current} i={i} handleCurrentItem={handleCurrentItem} formValues={formValues} setFormValues={setFormValues}  />
                            
                        
                         )
                    )}
                  </div>  
                    
                  
              </div>
          </div>
      </div>
    )
}

export default LineaDetalleProducto
