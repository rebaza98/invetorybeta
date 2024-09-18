import React, { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'
import { toast } from 'react-toastify'


const minLetras = 0

// const AutocompleteItem = ({_id, nombreEspecificacion, desc, setAutoCompleteState, formValues, setFormValues, setOpen}) => {

//     const handleItemClick = () => {
//         setAutoCompleteState((prevState) => ({ ...prevState, isOpen: false }));
//         setFormValues({ 
//             ...formValues, 
//             especs: [
//               ...formValues.especs,
//               {
//                 especRef: _id,
//                 nombreEspec: nombreEspecificacion,
//                 desc: desc
//               }
              

//             ]
            
//         })
//         setOpen(false)
//         // Aquí puedes realizar otras acciones relacionadas con el clic en la sugerencia
//       };
    
//     return (
//         <li onClick={handleItemClick}>
//           <div className='hover:bg-gray-200 flex gap-4 p-4'>
//             {/* <img src={img} alt={title} className='w-12 h-12 object-contain' /> */}
//             <div >
//               <h3 className='text-sm font-semibold'>{nombreEspecificacion}</h3>
//               <p className='text-xs text-gray-600'> <strong>Descripcion:</strong> {desc}</p>
//             </div>
//           </div>
//         </li>
//     )
//   }

const AutocompleteItem = ({ _id, nombreEspecificacion, desc, setAutoCompleteState, formValues, setFormValues, setOpen }) => {
  const isEspecUsed = formValues.especs.some((elegida) => elegida.especRef === _id);

  const handleItemClick = () => {
    if (!isEspecUsed) {
      setAutoCompleteState((prevState) => ({ ...prevState, isOpen: false }));
      setFormValues({
        ...formValues,
        especs: [
          ...formValues.especs,
          {
            especRef: _id,
            nombreEspec: nombreEspecificacion,
            desc: desc,
          },
        ],
      });
      setOpen(false);
      // Aquí puedes realizar otras acciones relacionadas con el clic en la sugerencia
    }
  };

  return (
    <li onClick={isEspecUsed ? undefined : handleItemClick} className={isEspecUsed ? 'cursor-not-allowed' : ''}>
      <div className='hover:bg-gray-200 flex gap-4 p-4'>
        <div>
          <h3 className='text-sm font-semibold'>{nombreEspecificacion} {isEspecUsed && <span className="inline-flex flex-shrink-0 items-center rounded-full bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                  Usado
                </span>}</h3>
          
          <p className='text-xs text-gray-600'>
            <strong>Descripcion:</strong> {desc}
          </p>
        </div>
      </div>
    </li>
  );
};


export default function SearchEspecificacionCategoria(props) {

    const [autoCompleteState, setAutoCompleteState] = useState({
        collections: [],
        isOpen : false

    })
    const [criterio, setCriterio] = useState('')

    const [searchToastId, setSearchToastId] = useState(null);

    const autoComplete = useMemo(() =>   createAutocomplete({
        placeholder: "Ingresa Busqueda",
        onStateChange: ({ state }) =>  setAutoCompleteState(state),
        getSources: () => [{
            sourceId:'espec-next-api',
            getItems: async({ query }) => {
              if (!!query && query.length >= minLetras) {
                return toast.promise(
                  fetch(`/api/inventario/producto/especificacion/buscar?q=${query}`)
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
                          <AutocompleteItem key={item._id} setAutoCompleteState={setAutoCompleteState} formValues={props.formValues} setFormValues={props.setFormValues} setOpen={props.setOpen} {...item} />
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
