import ItemOC from "./ItemOC"


const ListaOC = ({ ordenesCompra }) => {


    return (
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordenesCompra.length > 0 && (
          ordenesCompra.map((oc) => (
            <li key={oc._id} className={`col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow`}>
              <ItemOC oc={oc} />


            </li>
          ))
        )}


      </ul>
    )
}

export default ListaOC
