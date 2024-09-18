import ItemOVR from "./ItemOVR"


const ListaOVR = ({ ovrs }) => {


    return (
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ovrs.length > 0 && (
          ovrs.map((ovr) => (
            <li key={ovr._id} className={`col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow`}>
              <ItemOVR ovr={ovr} />


            </li>
          ))
        )}


      </ul>
    )
}

export default ListaOVR
