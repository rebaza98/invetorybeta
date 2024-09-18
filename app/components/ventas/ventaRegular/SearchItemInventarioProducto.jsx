import React, { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import { toast } from 'react-toastify'
import { formatearFecha } from '@/utils/core/utils'

const minLetras = 0

const AutocompleteItem = ({ _id, nroItem, empresa, fechaEntrada, libre, fisico, nroSerie, precioEntrada, estado, setAutoCompleteState, formValues, setFormValues, producto, index, criterio, setOpenModal }) => {

  let isItemInventarioNoPermitido = null

  formValues.productos.map((actualProducto) => {
    if (producto.productoId == actualProducto.productoId){
      isItemInventarioNoPermitido = actualProducto.detalle.some((elegida) => elegida.itemId == _id || !libre) ;
    }
    
  })

  const igualEmpresa = (empresa.nroDocEmpresa == formValues.empresa.nroDocEmpresa)
  
  
  
  // const isItemInventarioNoPermitido = formValues.productos.detalle.some((elegida) => elegida.productoId === _id) || (formValues.productos._id === _id) || !esProducto || esCombo;

  //const equivalentes = skuEquivalentes.filter((elegido) => elegido.equivalente === criterio.query )
  const numeroCero = 0
  

  const actualizaProductosConSerie = (productos) => {
    
  }
  

  const handleItemClick = () => {
      if (!isItemInventarioNoPermitido) {
        setAutoCompleteState((prevState) => ({ ...prevState, isOpen: false }));  
        const productosActualizados = formValues.productos.map((actualProducto) => {
          if (actualProducto.productoId == producto.productoId){
            for (let i = 0; i < actualProducto.detalle.length ; i++){
              if (i == index){
                actualProducto.detalle[i].index = index
                actualProducto.detalle[i].serie = nroSerie
                actualProducto.detalle[i].nroItem = nroItem
                actualProducto.detalle[i].itemId = _id
                actualProducto.detalle[i].errorVacio = false
                
              }
            }
          }
          
          return actualProducto
        })
        setFormValues({
          ...formValues,
          productos: productosActualizados
        });
        
        // Aquí puedes realizar otras acciones relacionadas con el clic en la sugerencia
      }

      setOpenModal(false)
  };


  return (
    <li onClick={isItemInventarioNoPermitido ? undefined : handleItemClick} className={isItemInventarioNoPermitido ? 'cursor-not-allowed' : ''}>
      
      <div className='hover:bg-gray-200 flex gap-4 p-4'>
        
        <div className='w-full ' >
            <h3 className='text-sm font-semibold'>
              
              {isItemInventarioNoPermitido && (
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                  {libre ? "Usado" : "No Disponible"}
                </span>
              )}
            </h3>
          <div className="mt-1 truncate text-xs text-gray-500 flex justify-between items-center " >
            <strong>Empresa:</strong>
            <div className={igualEmpresa ? "" : "bg-yellow-300 rounded-md p-1"} >
            {empresa.nombreEmpresa}
            </div>
          </div>
          <div className="mt-1 truncate text-xs text-gray-500 flex justify-between items-center " >
            <strong>ITEM:</strong>
            <div  >
            {nroItem}
            </div>
          </div>
          <div className="mt-1 truncate text-xs text-gray-500 flex justify-between items-center " >
            <strong>SERIE:</strong>
            <div  >
            {nroSerie}
            </div>
          </div>
          <div className="mt-1 truncate text-xs text-gray-500 flex justify-between items-center " >
            <strong>INGRESO:</strong>
            <div  >
            {formatearFecha(fechaEntrada)}
            </div>
          </div>
          <div className="mt-1 truncate text-xs text-gray-500 flex justify-between items-center " >
            <strong>PRECIO:</strong>
            <div  >
            {parseFloat(precioEntrada).toFixed(2)  }
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};


export default function SearchItemInventarioProducto(props) {


    const [autoCompleteState, setAutoCompleteState] = useState({
        collections: [],
        isOpen : false

    })
    const [criterio, setCriterio] = useState('')


    // function debouncePromise(fn, time) {
    //   let timerId = undefined;
    
    //   return function debounced(...args) {
    //     if (timerId) {
    //       clearTimeout(timerId);
    //     }
    
    //     return new Promise((resolve) => {
    //       timerId = setTimeout(() => resolve(fn(...args)), time);
    //     });
    //   };
    // }




    const autoComplete = useMemo(() =>   createAutocomplete({
        placeholder: "Ingresa Busqueda",
        onStateChange: ({ state }) =>  {
          setCriterio(state)
          setAutoCompleteState(state)
        },
        getSources: () => [{
            sourceId:'itemInventario-next-api',
            getItems: async({ query }) => {
              if (!!query && query.length >= minLetras) {
                return toast.promise(
                  fetch(`/api/inventario/itemInventario/buscar/buscarPorProducto/${props.producto}/itemInventario/stock?q=${query}`)
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
        inputElement: inputRef.current,

        

        
    })

    const handleKeyDown = () => {
      console.log('Enter key pressed', );
      // if (event.key === 'Enter') {
      //   event.preventDefault(); // Evitar que se envíe el formulario al presionar Enter
      //   console.log("EVITA ENTER")
      // }
      
    };
  const handleChange = () => {
    console.log("EVITA ENTER", )
    // if (event.key === 'Enter') {
    //   event.preventDefault(); // Evitar que se envíe el formulario al presionar Enter
    //   console.log("EVITA ENTER")
    // }
  };





    return (
        <div className="relative">
          <input
            
            ref={inputRef}
            
            type="text"
            name="busqueda"
            id="idbusqueda"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
                          <AutocompleteItem key={item._id} setAutoCompleteState={setAutoCompleteState} formValues={props.formValues} setFormValues={props.setFormValues} currentProducto={props.producto} index={props.index} setOpenModal= {props.setOpen}  criterio={criterio} {...item} />
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
