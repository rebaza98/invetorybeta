import { formatearFecha } from "@/utils/core/utils"
import { MagnifyingGlassCircleIcon, MinusIcon } from "@heroicons/react/24/solid"

const CabeceraProcesoRS = ({proceso, remueveProceso}) => {


    

    return (
        <div>
            <div className='flex justify-end text-lg '>
                <button
                    type="button"
                    className="flex justify-center items-center rounded-full bg-red-600 p-0.5 text-white shadow-sm hover:bg-indigo-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-red w-6 h-6"
                    onClick={() => remueveProceso(proceso)}
                >
                    <MinusIcon className="h-4 w-4" aria-hidden="true" />
                </button>
            </div>
            <div className='text-sm '>
                <strong>RS:</strong>  {String(proceso.regulacionSalidaEmpresa).padStart(6, '0')}
            </div>
            {/* <div className="flex gap-4" >
                <div className='text-sm '>
                    <strong>Proveedor:</strong>  {proceso.proveedor.razonSocial}
                </div>
                <div className='text-sm '>
                    <strong>{proceso.proveedor.docId.nombre}:</strong>  {proceso.proveedor.numeroDoc}
                </div>
            </div> */}
            <div className="flex gap-4" >
                <div className='text-sm '>
                    <strong>Fecha Regulacion:</strong>  {formatearFecha(proceso.fechaRegulacion)}
                </div>
                <div className='text-sm '>
                    <strong>Valor Total:</strong>  S/.{(proceso.total).toFixed(2)}
                </div>
                
            </div>
          
        </div>
    )
}

export default CabeceraProcesoRS
