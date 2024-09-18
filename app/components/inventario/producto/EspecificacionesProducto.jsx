import React from 'react'

const EspecificacionesProducto = ({especs}) => {

  const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
  ]
  return (
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 text-center">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3  pr-3 text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Valor
                  </th>
                
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {especs.map((espec, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">{espec.nombre}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">{espec.valor}</td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default EspecificacionesProducto
