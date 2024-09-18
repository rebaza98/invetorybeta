'use client'

import { useEffect, useState } from "react"

const tabs = [

    { name: 'Todo', href: '#', current: true },
    { name: 'Empresa1', href: '#', current: false },
    { name: 'Empresa2', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const TabEmpresas =  ({ defaultEmpresa, setEmpresaSeleccionada }) => {

    const fecthEmpresas = async () => {
        const response = await fetch('/api/core/empresa/all')
        const data = await response.json()

        // const listaTabs = (current) => {
        //     const apendEmpresas = (current.map((elegida) => {
        //         setEmpresas([...empresas, elegida])
        //     }))

        // }
        // listaTabs(data)
        const datosCurrent = data.map((empresa => {
            empresa.current = false
            return empresa

        }))
        const nuevasEmpresas = [empresas[0], ...datosCurrent];

    // Actualizar el estado empresas con la nueva matriz
        setEmpresas(nuevasEmpresas);
        setFetchComplete(true)
    }

  


    const [empresas, setEmpresas] = useState([defaultEmpresa])
    const [fetchComplete, setFetchComplete] = useState(false)


useEffect( () => {
    fecthEmpresas()
    
}, [] ) 


    const handleClickTab = (tab) => {
        const copiaEmpresa = empresas
        const nuevoEmpresas = copiaEmpresa.map((empresa) => {
            if (empresa._id === tab._id){
                empresa.current = true
            }else{
                empresa.current = false
            }
            return empresa

        })
        setEmpresas(nuevoEmpresas)
        setEmpresaSeleccionada(tab)
    }

    
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav className="isolate flex divide-x divide-gray-200 " aria-label="Tabs">
                    {fetchComplete && (
                        empresas.map((tab, tabIdx) => (
                            <button onClick={() => handleClickTab(tab)}
                                key={tab._id}
                                href="#"
                                className={classNames(
                                    tab.current ? 'text-gray-900 bg-gray-50' : 'text-gray-500 hover:text-gray-700',
                                    tabIdx === 0 ? 'rounded-l-lg' : '',
                                    tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                                    'group relative min-w-0 flex-1 overflow-hidden  py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
                                )}
                                aria-current={tab?.current ? 'page' : undefined}
                            >
                                <span>{tab.siglas}</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        tab.current ? 'bg-indigo-500' : 'bg-transparent',
                                        'absolute inset-x-0 bottom-0 h-0.5'
                                    )}
                                />
                            </button>
                        ))
                    )}
                    {}
                </nav>
            </div>
        </div>
    )
}

export default TabEmpresas


