import ItemRS from "./ItemRS"


const ListaRS = ({ regulacionesSalida }) => {


    return (
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regulacionesSalida.length > 0 && (
          regulacionesSalida.map((rs) => (
            <li key={rs._id} className={`col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow`}>
              <ItemRS rs={rs} />


            </li>
          ))
        )}


      </ul>
    )
}

export default ListaRS
