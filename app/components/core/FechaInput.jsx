
const FechaInput = ({actualizaFecha, fechaCampo, valor}) => {
    return (
        <input
        type="date"
        name={`${fechaCampo}`}
        id={`id${fechaCampo}`}
        value={valor}
        onChange={e => {
            actualizaFecha(fechaCampo, e.target.value)
        }}
        className="mt-1 p-2 border uppercase border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
        autoComplete='off'
      />
    )
}

export default FechaInput
