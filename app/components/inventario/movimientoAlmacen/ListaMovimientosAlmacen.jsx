import React from 'react'
import ItemMovAl from './ItemMovAl'

const ListaMovimientosAlmacen = ({movimientosAlmacen}) => {
    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movimientosAlmacen.length > 0 && (
          movimientosAlmacen.map((movAl) => (
            <li key={movAl._id} className={`col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow`}>
              <ItemMovAl movAl={movAl} />


            </li>
          ))
        )}


      </ul>
    )
}

export default ListaMovimientosAlmacen
