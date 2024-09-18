import ItemProductoStock from "./ItemProductoStock"
import { useRouter } from 'next/navigation'

const ListaProductoStock = ({ productos }) => {

  const router = useRouter()

  const handleVerStock = (sku) => {
    router.push(`/inventario/stock/verStock/${sku}`)
  }  

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {productos.length > 0 && (
        productos.map((producto) => (
          <li onDoubleClick={ () => handleVerStock(producto.sku)} key={producto._id} className={`col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow`}>
            <ItemProductoStock producto={producto} />                

          </li>
        ))
      )}


    </ul>
  )
}

export default ListaProductoStock
