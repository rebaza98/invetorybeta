import React, { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'


// const AutocompleteItem = ({razonSocial, docId}) => {
//     return (
//             <li>
//                 <div>
//                     <h3 className='text-sm font-semibold text-gray-900'>{razonSocial}</h3>
//                     <p className='text-xs text-gray-500 ' >{docId.numero}</p>
//                 </div>
                
//             </li>
//             )
// }

const minLetras = 3

const AutocompleteItem = ({razonSocial, docId}) => {
    return (
      <li>
        <Link href="#">
          <div className='hover:bg-gray-200 flex gap-4 p-4'>
            {/* <img src={img} alt={title} className='w-12 h-12 object-contain' /> */}
            <div>
              <h3 className='text-sm font-semibold'>{razonSocial}</h3>
              <p className='text-xs text-gray-600'>{docId.numero}</p>
            </div>
          </div>
        </Link>
      </li>
    )
  }

export default function Search({props}) {

    const [autoCompleteState, setAutoCompleteState] = useState({
        collections: [],
        isOpen : false

    })

    const autoComplete = useMemo(() =>   createAutocomplete({
        placeholder: "Ingresa Busqueda",
        onStateChange: ({ state }) =>  setAutoCompleteState(state),
        getSources: () => [{
            sourceId:'persona-next-api',
            getItems: async({ query }) => {
                if (!!query && query.length >= minLetras){
                    return fetch(`/api/core/persona/buscar?q=${query}`)
                        .then(res => res.json())
                }
                return []
            }
            
        }],
        ...props
    }), [props])

    const formRef = useRef(null)
    const inputRef = useRef(null)
    const panelRef = useRef(null)


    const formProps = autoComplete.getFormProps({
        inputElement: inputRef.current

    })

    const inputProps = autoComplete.getInputProps({
        inputElement: inputRef.current
        
    })




    return (
        <form ref={formRef} className='flex justify-center mb-10' {...formProps} >
            <div className='flex relative p-1 rounded-full w-2/6'  >
                <input
                ref={inputRef}
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Ingrese Busqueda"
                {...inputProps}
                />
            
            {
                autoCompleteState.isOpen && (
                    <div className='absolute mt-14 top-0 left-0 border border-gray-100 z-10 bg-white rounded-lg shadow-lg' ref={panelRef} {...autoComplete.getPanelProps()}  >
                        {autoCompleteState.collections.map((collection, index)=> {
                            const { items } = collection
                            return (
                                <section key={`section-${index}`} >
                                    {items.length > 0 && (
                                        <ul {...autoComplete.getListProps()} >
                                            {
                                                items.map(item => <AutocompleteItem key={item._id} {...item} /> )
                                            }
                                        </ul>
                                    )}

                                </section>
                            )

                        } )}

                    </div>
                )
            }
            </div>
        </form>
        
    )
}
