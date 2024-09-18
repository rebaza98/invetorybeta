import { formatearFecha } from '@/utils/core/utils'
import Image from 'next/image'
import { useState } from 'react'
import ModalVerFlujo from '../../flujo/ModalVerFlujo'
import { ClockIcon } from '@heroicons/react/20/solid'

const ItemProductoInventario = ({item}) => {

    const [modalVerFlujo, setModalVerFlujo] = useState(false)

    let serie = ""
    console.log("ITEM = ", item)
    if (item.nroSerie == ""){
        serie = item.nroItem
    }else{
        serie = item.nroSerie
    }

    const estadoColores = (libre, fisico) => {

        if (libre && fisico){
            return "bg-green-600"
        }
        if (!libre && fisico){
            return "bg-yellow-300"
        }
        if (!libre && !fisico){
            return "bg-red-600"
        }

    }

    const fechaEntradaFormateada = formatearFecha(item.fechaEntrada);


    const handleFlujoTimeLine = (id) => {
        setModalVerFlujo(true)

    }


    return (
        <>
            {modalVerFlujo && <ModalVerFlujo open={modalVerFlujo} setOpen={setModalVerFlujo} flujo={item.flujo} />}
            <div className={`flex justify-between items-center p-1 ${estadoColores(item.libre, item.fisico)} text-white`}>
                <h3 className={`truncate text-sm `}><strong>{item.empresa.nombreEmpresa}</strong>  </h3>
                <div className={` mt-1 truncate text-sm `} ><strong>Item:{String(item.nroItem).padStart(5, '0')}</strong>  </div>
            </div>
            <div className='flex items-center ' >
                <div className="w-1/2 flex-1  p-4 truncate">
                    {item.reservaExterna &&
                        <div className="bg-yellow-300 text-sm rounded-md text-center p-1" >
                            {item.empresaExterna.nombreEmpresa}
                        </div>
                    }
                    
                    <p className="mt-1 truncate text-xs text-gray-500"><strong>Ingreso:</strong>  {fechaEntradaFormateada}</p>
                    <p className="mt-1 truncate text-xs text-gray-500"><strong>Precio :</strong>  {parseFloat(item.precioEntrada).toFixed(2)}</p>
                    {/* <p className="mt-1 truncate text-xs text-gray-500"><strong>MARCA:</strong>  {"dadasdasdasd"}</p> */}
                </div>
                <div className="flex w-1/2 items-center justify-between space-x-6 p-4">

                    <div className="relative w-full h-32">
                        {/* </div><div className="max-w-full max-h-14"> */}
                        <Image
                            src={`/api/misc/barcodeGenerator?text=${serie}`}

                            alt="Descripción de la imagen"
                            className="max-w-full max-h-full rounded"
                            key={item._id}
                            //objectFit='contain'
                            width={500}
                            height={500}
                        //   style={{
                        //       objectFit: "fit"
                        //   }}
                        />

                    </div>
                </div>
            </div>
            <div className="flex justify-between p-2"  >
              <div className='flex w-3/5' >
                  
                  <div className="cursor-pointer font-extrabold px-1" onClick={() => handleFlujoTimeLine(item._id)} >
                      <ClockIcon className="h-5 w-5 text-cyan-500" aria-hidden="true" />
                  </div>
              </div>

              <p className={`mt-1 truncate text-xs text-gray-900`}><strong>TOTAL:</strong> S/. {(item.precioEntrada).toFixed(2)}</p>
          </div>


        </>
    )
}

export default ItemProductoInventario
