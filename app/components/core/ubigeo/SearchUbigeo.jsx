import React, { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'
import { toast } from 'react-toastify'


const minLetras = 3



const AutocompleteItem = ({_id, ubigeoReniec, ubigeoInei, distrito, provincia, departamento, setAutoCompleteState, formUbigeoValues, setFormUbigeoValues}) => {

    const handleItemClick = () => {
        setAutoCompleteState((prevState) => ({ ...prevState, isOpen: false }));
        setFormUbigeoValues({ 
            ...formUbigeoValues, 
            ubigeoRef: _id,
            codigoInei: ubigeoInei,
            codigoReniec: ubigeoReniec,
            ubicacion: `${distrito} - ${provincia} - ${departamento}`


        })
        // Aquí puedes realizar otras acciones relacionadas con el clic en la sugerencia
      };
    
    return (
        <li onClick={handleItemClick}>
          <div className='hover:bg-gray-200 flex gap-4 p-4'>
            {/* <img src={img} alt={title} className='w-12 h-12 object-contain' /> */}
            <div >
              <h3 className='text-sm font-semibold'>{distrito} - {provincia} - {departamento}</h3>
              <p className='text-xs text-gray-600'> <strong>Codigo Inei:</strong> {ubigeoInei}</p>
              <p className='text-xs text-gray-600'><strong>Codigo RENIEC:</strong>{ubigeoReniec}</p>
            </div>
          </div>
        </li>
    )
  }

export default function SearchUbigeo(props) {

    const [autoCompleteState, setAutoCompleteState] = useState({
        collections: [],
        isOpen : false

    })
    

    const autoComplete = useMemo(() =>   createAutocomplete({
        placeholder: "Ingresa Busqueda",
        onStateChange: ({ state }) =>  setAutoCompleteState(state),
        getSources: () => [{
            sourceId:'ubigeo-next-api',
            getItems: async({ query }) => {
                // if (!!query && query.length >= minLetras){
                //     return fetch(`/api/core/ubigeo/buscar?q=${query}`).then(res => res.json())
                        
                // }
                if (!!query && query.length >= minLetras) {
                  return toast.promise(
                    fetch(`/api/core/ubigeo/buscar?q=${query}`)
                      .then((res) => res.json()),
                    {
                      pending: 'Cargando datos...',
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
                          <AutocompleteItem key={item._id} setAutoCompleteState={setAutoCompleteState} formUbigeoValues={props.formUbigeoValues} setFormUbigeoValues={props.setFormUbigeoValues} {...item} />
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
