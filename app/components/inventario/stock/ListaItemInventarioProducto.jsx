import React from 'react'
import ItemProductoInventario from './ItemProductoInventario'

const ListaItemInventarioProducto = ({itemsInventario}) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {itemsInventario.length > 0 && (
        itemsInventario.map((item) => (
          <li onDoubleClick={ () => {}} key={item._id} className={`col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow`}>
            {/* <ItemProductoStock producto={producto} />                 */}
            <ItemProductoInventario item={item}  />

          </li>
        ))
      )}
    </ul>
  )
}

export default ListaItemInventarioProducto
