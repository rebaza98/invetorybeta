import ItemRE from "./ItemRE"


const ListaRE = ({ regulacionesEntrada }) => {


    return (
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regulacionesEntrada.length > 0 && (
          regulacionesEntrada.map((re) => (
            <li key={re._id} className={`col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow`}>
              <ItemRE re={re} />


            </li>
          ))
        )}


      </ul>
    )
}

export default ListaRE
