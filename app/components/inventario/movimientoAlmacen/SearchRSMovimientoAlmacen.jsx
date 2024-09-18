import React, { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { PhotoIcon} from '@heroicons/react/24/solid'
import { formatearFecha } from '@/utils/core/utils'

const minLetras = 0

const AutocompleteItem = ({ _id, empresa, usuario, regulacionSalidaEmpresa,  productos, fechaRegulacion, total, cantidadItems, updatedAt, alias, ingresadoAlmacen, setAutoCompleteState, formValues, setFormValues,  criterio }) => {
  //const isProductoNoPermitido = formValues.productos.some((elegida) => elegida.productoRef === _id) || (formValues.productos._id === _id) || !esProducto || esCombo;
  const isOCNoPermitido = formValues.proceso.some((elegida) => elegida.idProceso === _id) || (formValues.proceso.idProceso === _id) || ingresadoAlmacen;

  //const equivalentes = skuEquivalentes.filter((elegido) => elegido.equivalente === criterio.query )
  const numeroCero = 0
  
  

  const handleItemClick = async () => {

    const desglozaCantidad = (producto) => {
      let cantidadDesglozada = []
      if (producto.usaSerie){
        for(let i = 0; i < producto.cantidad; i++){
          cantidadDesglozada.push({
            index: i,
            serie: "",
            errorSerie: false,
            serieValidada: false,
            serieSinRepetir: false,
            mensajeError:"",
          })
        }
      }
      
      


      return cantidadDesglozada
      
    }

      
    const productosActuales = (productosPoblar) => {
      const productosActuales =  productosPoblar?.map((producto) => {
        
        for(let i = 0; i < producto.cantidad; i++){
            producto.detalle[i].serieValidada = false
            producto.detalle[i].mensajeError = ""
            producto.detalle[i].errorSerie= false
        }
        return producto
        
      })
      return productosActuales
      
  }

      

      if (!isOCNoPermitido) {
        setAutoCompleteState((prevState) => ({ ...prevState, isOpen: false }));
      const response = await fetch(`/api/regulaciones/regulacionSalida/buscar/${_id}`)
      const data = await response.json()

        
        setFormValues({
          ...formValues,
          proceso: [
            ...formValues.proceso,
            {
              idProceso: _id,
              empresa: empresa,
              regulacionSalidaEmpresa: regulacionSalidaEmpresa,
              usuario: usuario,
              fechaRegulacion: fechaRegulacion,
              total: total,
              productos: productosActuales(data.productos),
              cantidadItems: cantidadItems,
              updatedAt: updatedAt,
            },
          ],
        });
        // Aquí puedes realizar otras acciones relacionadas con el clic en la sugerencia
      }

    
  };


  return (
    <li onClick={isOCNoPermitido ? undefined : handleItemClick} className={isOCNoPermitido ? 'cursor-not-allowed' : ''}>
      <div className='hover:bg-gray-200 flex gap-4 p-4'>
        <div className='w-4/5 flex justify-between ' >
          <div>
            {/* <h3 className='text-sm font-semibold'>{nombreProducto}{isProductoNoPermitido && <span className="inline-flex flex-shrink-0 items-center rounded-full bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                  No Permitido
                </span>}
            </h3> */}
            <h3 className='text-sm font-semibold'>
              RS: {String(regulacionSalidaEmpresa).padStart(6, '0')}
              {isOCNoPermitido && (
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                  {ingresadoAlmacen ? "Ingresado" : "Usado"}
                </span>
              )}
            </h3>
            <p className="mt-1 truncate text-xs text-gray-500"><strong>Fecha:</strong>  {formatearFecha(fechaRegulacion) }</p>
            
          </div>
        
          
        </div>
      </div>
    </li>
  );
};


export default function SearchRSMovimientoAlmacen(props) {

    const [autoCompleteState, setAutoCompleteState] = useState({
        collections: [],
        isOpen : false

    })
    const [criterio, setCriterio] = useState('')


    const autoComplete = useMemo(() =>   createAutocomplete({
        placeholder: "Ingresa busqueda de Regulacion Salida",
        onStateChange: ({ state }) =>  {
          setCriterio(state)
          setAutoCompleteState(state)
        },
        getSources: () => [{
            sourceId:'regulacion-next-api',
            getItems: async({ query }) => {
              if (!!query && query.length >= minLetras) {
                return toast.promise(
                  //let response = await axios.get(`/api/core/persona/buscar/parametro?valor=${nuevaPersona.razonSocial}&campo=${campoBusqueda}`);
                  fetch(`/api/inventario/movimientoAlmacen/buscar/rsEmpresa?q=${query}&idempresa=${props.empresaSeleccionada.empresaRef}`)
                    .then((res) => res.json()),
                  {
                    pending: "Cargando datos...",
                  }
                );
              }
              return []
                
                
            }
            
        }],
        ...props
    }), [props])


   
    const inputRef = useRef(null)
    const panelRef = useRef(null)


    

    const inputProps = autoComplete.getInputProps({
        inputElement: inputRef.current
        
    })




    return (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            name="busqueda"
            id="idbusqueda"
            className="block w-full rounded-md border-0 py-1.5 uppercase text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={criterio}
            onChange={e => setCriterio(e.target.value)}
            {...inputProps}
          />
    
          {autoCompleteState.isOpen && (
            <div
              className="absolute left-0 mt-2 border border-gray-100 z-10 bg-white rounded-lg shadow-lg"
              style={{
                width: inputRef.current.offsetWidth
              }}
              ref={panelRef}
              {...autoComplete.getPanelProps()}
            >
              {autoCompleteState.collections.map((collection, index) => {
                const { items } = collection;
                return (
                  <section key={`section-${index}`}>
                    {items.length > 0 && (
                      <ul {...autoComplete.getListProps()}>
                        {items.map((item) => (
                          // <AutocompleteItem key={item._id} setAutoCompleteState={setAutoCompleteState} formValues={props.formValues} setFormValues={props.setFormValues}  criterio={criterio} {...item} />
                          <AutocompleteItem key={item._id} setAutoCompleteState={setAutoCompleteState} formValues={props.formValues} setFormValues={props.setFormValues}  criterio={criterio} {...item} />
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      );
    }
