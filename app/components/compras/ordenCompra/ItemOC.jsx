import { ClockIcon, DocumentArrowUpIcon, EyeIcon, NewspaperIcon, NoSymbolIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import ModalListaProductosOC from './ModalListaProductosOC'
import { useRouter } from 'next/navigation'
import { estadosOC } from '@/utils/compras/utils'
import { formatearFecha } from '@/utils/core/utils'
import ModalVerFlujo from '../../flujo/ModalVerFlujo'



const ItemOC = ({ oc }) => {

    const router = useRouter()
    const [modalVerProductos, setModalVerProductos] = useState(false)
    const [modalVerFlujo, setModalVerFlujo] = useState(false)

    const estadoColor = {
        "PENDIENTE": "text-gray-900",
        "INGRESADA": "text-white",
        "ANULADA": "text-white"
    }
    const estadoColores = {
        //"PENDIENTE": "bg-yellow-200",
        "PENDIENTE": "bg-yellow-300",
        "INGRESADA": "bg-green-600",
        "ANULADA" : "bg-red-600"
    }

    const fechaFormateada = formatearFecha(oc.fechaCompra);



    const handleVerProductos = (oc) => {
        setModalVerProductos(true)
    }

    const handleEditar = (id) => {
        router.push(`/compras/ordenesCompra/editar/${id}`)
    }

    const handleDetalle = (id) => {
        router.push(`/compras/ordenesCompra/detalle/${id}`)
    }

    const handlePDF = (id) => {
        router.push(`/compras/ordenesCompra/detalle/pdf/${id}`)
    }

    const handleFlujoTimeLine = (id) => {
        setModalVerFlujo(true)

    }

  return (
      <>
          {modalVerProductos && <ModalListaProductosOC open={modalVerProductos} setOpen={setModalVerProductos} idOc={oc._id} />}
          {modalVerFlujo && <ModalVerFlujo open={modalVerFlujo} setOpen={setModalVerFlujo} idOc={oc._id} flujo={oc.flujo} />}
          <div className={`flex justify-between items-center p-1 ${estadoColores[oc.estado]} text-white`}>
              <h3 className={`truncate text-sm `}><strong>{oc.empresa.nombreEmpresa}</strong>  </h3>
              <div className={` mt-1 truncate text-sm `} ><strong>OC:{String(oc.ocEmpresa).padStart(5, '0')}</strong>  </div>
          </div>
          <div className="w-full p-4">

              <div className='' >
                  <div className="flex-1 truncate">
                      {/* <div className='flex justify-between items-center' >
                          <h3 className={`truncate text-xs  text-gray-900`}>{oc.empresa.nombreEmpresa}</h3>
                          <div className={` mt-1 truncate text-sm text-gray-900`} ><strong>OC:</strong>  {String(oc.ocEmpresa).padStart(5, '0')}</div>
                      </div> */}

                      <div className="flex justify-between  items-center ">

                          <h3 className={`truncate text-sm font-medium text-gray-900`}>{oc.proveedor.razonSocial}</h3>

                      </div>

                      <div className={`flex justify-between  mt-1 truncate text-xs text-gray-900 `} >
                          <strong>Fecha Compra:</strong>
                          {fechaFormateada}
                          {/* {oc.fechaCompra} */}
                      </div>
                      <div className={`flex justify-between  mt-1 truncate text-xs text-gray-900 `} >
                          <strong>Usuario:</strong>
                          {oc.usuario.user}
                      </div>
                      <div className={`flex justify-between  mt-1 truncate text-xs text-gray-900 `} >
                          <strong>Items:</strong>
                          {oc.cantidadItems}
                      </div>
                  </div>
              </div>
          </div>
          <div className="flex justify-between p-2"  >
              <div className='flex w-3/5' >
                  <div className="cursor-pointer px-1" onClick={() => handleVerProductos(oc.oc)} >
                      {/* <div className="cursor-pointer px-1" onClick={() => handleDetalle(oc._id)} > */}
                      <EyeIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                  {/* subir documentos */}
                  {/* <div className="cursor-pointer px-1" onClick={() => handleEditar(oc._id)} >
                      <DocumentArrowUpIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
                  </div> */}
                  {/* <div className={`cursor-pointer px-1`} onClick={() => handleEditar(oc._id)} >
                      <PencilSquareIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
                  </div> */}
                  <div

                      className={`px-1 ${oc.estado !== estadosOC["pendiente"] ? "cursor-not-allowed text-gray-300" : "cursor-pointer text-yellow-300"}`}
                      onClick={oc.estado === estadosOC["pendiente"] ? () => handleEditar(oc._id) : undefined}
                  >
                      <PencilSquareIcon className="h-5 w-5 " aria-hidden="true" />
                  </div>
                  <div className="cursor-pointer font-extrabold px-1" onClick={() => handleEditar(oc.oc)} >
                      <NoSymbolIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="cursor-pointer font-extrabold px-1" onClick={() => handlePDF(oc._id)} >
                      <NewspaperIcon className="h-5 w-5 text-purple-500" aria-hidden="true" />
                  </div>
                  <div className="cursor-pointer font-extrabold px-1" onClick={() => handleFlujoTimeLine(oc._id)} >
                      <ClockIcon className="h-5 w-5 text-cyan-500" aria-hidden="true" />
                  </div>
              </div>

              <p className={`mt-1 truncate text-xs text-gray-900`}><strong>TOTAL:</strong> S/. {(oc.total).toFixed(2)}</p>
          </div>
      </>
  )
}

export default ItemOC
