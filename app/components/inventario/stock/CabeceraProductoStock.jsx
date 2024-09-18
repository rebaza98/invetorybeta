import Image from 'next/image'
import React from 'react'
import EspecificacionesProducto from '../producto/EspecificacionesProducto'
import { PhotoIcon } from '@heroicons/react/24/solid'

const CabeceraProductoStock = ({producto, empresaSeleccionada}) => {

    let detalleCurrentEmpresa = {}

    if (empresaSeleccionada.siglas != "TODO"){

        

        console.log("empresaseleccionada = ", empresaSeleccionada)

        producto.stockDetalle.map((actualDetalleEmpresa) => {
            if (actualDetalleEmpresa.empresa.nroDocEmpresa == empresaSeleccionada.numeroDoc){
                detalleCurrentEmpresa = {
                    stockEmpresa: actualDetalleEmpresa.stockEmpresa,
                    reservadoEmpresa: actualDetalleEmpresa.reservaTotalEmpresa,
                    reposicionEmpresa: actualDetalleEmpresa.reposicionEmpresa,
                    stockFisicoEmpresa: actualDetalleEmpresa.stockFisicoEmpresa,
                    ingresoEmpresa: actualDetalleEmpresa.ingresoEmpresa,
                    salidaEmpresa: actualDetalleEmpresa.salidaEmpresa,
                }
            }
        })
    }

    

  return (
    <>  
          <div className='flex justify-between' >
              <h3 className="text-xl font-semibold leading-7 ml-3 mt-3 text-gray-600"> {producto.nombreProducto}</h3>
              <h3 className="text-xl font-semibold leading-7 ml-3 mt-3 text-gray-600"> {empresaSeleccionada.siglas}</h3>
          </div>
        
          <div className='w-full flex gap-2 text-sm ' >
              <div className='w-1/2 mt-3' >
                <div className='flex gap-3' >
                    <div className='w-1/2' >
                        <div className='flex flex-row justify-between' >
                            <div>
                                <strong>SKU:</strong>
                            </div>
                            <div>
                                {producto.sku}
                            </div>
                        </div>
                        <div className='flex flex-row justify-between' >
                            <div>
                                <strong>MODELO:</strong>
                            </div>
                            <div>
                                {producto.modelo}
                            </div>
                        </div>
                        <div className='flex flex-row justify-between' >
                            <div>
                                <strong>MARCA:</strong>
                            </div>
                            <div>
                                {producto.marca.nombreMarca}
                            </div>
                        </div>
                        <div className='flex flex-row justify-between' >
                            <div>
                                <strong>CATEGORIA:</strong>
                            </div>
                            <div>
                                {producto.categoria.nombreCategoria}
                            </div>
                        </div>
                        <div className='flex flex-row justify-between' >
                            <div>
                                <strong>BARCODE:</strong>
                            </div>
                            <div>
                                {producto.barcode}
                            </div>
                        </div>
                        <div className='flex flex-row justify-between' >
                            <div>
                                <strong>AÑO:</strong>
                            </div>
                            <div>
                                {producto.anio}
                            </div>
                        </div>
                        <div className='flex flex-row justify-between mt-1' >
                            <div>
                                <strong>ESPECIFICACIONES:</strong>
                            </div>
                        </div>
                        <EspecificacionesProducto especs={producto.especificaciones} />
                    </div>
                      {empresaSeleccionada.siglas == "TODO" ? (
                          <div className='w-1/2' >
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>STOCK:</strong>
                                  </div>
                                  <div>
                                      {producto.stock}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>RESERVADO:</strong>
                                  </div>
                                  <div>
                                      {producto.stockReservado}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>STOCK MINIMO:</strong>
                                  </div>
                                  <div>
                                      {producto.stockMinimo}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between text-red-500 ' >
                                  <div>
                                      <strong>REPOSICION:</strong>
                                  </div>
                                  <div>
                                      {producto.reposicion}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>STOCK FISICO:</strong>
                                  </div>
                                  <div>
                                      {producto.stockFisico}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>INGRESADOS:</strong>
                                  </div>
                                  <div>
                                      {producto.cantidadIngresos}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between mt-1' >
                                  <div>
                                      <strong>SALIDAS:</strong>
                                  </div>
                                  <div>
                                      {producto.cantidadSalidas}
                                  </div>
                              </div>
                          </div>
                      ) : (
                          <div className='w-1/2' >
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>STOCK:</strong>
                                  </div>
                                  <div>
                                      {detalleCurrentEmpresa.stockEmpresa}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>RESERVADO:</strong>
                                  </div>
                                  <div>
                                      {detalleCurrentEmpresa.reservadoEmpresa}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>STOCK MINIMO:</strong>
                                  </div>
                                  <div>
                                      {producto.stockMinimo}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between text-red-500 ' >
                                  <div>
                                      <strong>REPOSICION:</strong>
                                  </div>
                                  <div>
                                      {detalleCurrentEmpresa.reposicionEmpresa}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>STOCK FISICO:</strong>
                                  </div>
                                  <div>
                                      {detalleCurrentEmpresa.stockFisicoEmpresa}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between' >
                                  <div>
                                      <strong>INGRESADOS:</strong>
                                  </div>
                                  <div>
                                      {detalleCurrentEmpresa.ingresoEmpresa}
                                  </div>
                              </div>
                              <div className='flex flex-row justify-between mt-1' >
                                  <div>
                                      <strong>SALIDAS:</strong>
                                  </div>
                                  <div>
                                      {detalleCurrentEmpresa.salidaEmpresa}
                                  </div>
                              </div>
                          </div>
                      )}

                </div>
                  
                  
              </div>

              <div className='w-1/2 flex justify-center' >
              {producto.imagenUrl ? (
                  <Image
                      src={producto.imagenUrl}
                      alt="Descripción de la imagen"
                      className="max-w-full max-h-50 bg-gray-white rounded"
                      key={producto._id}
                      width={200}
                      height={200}
                      style={{
                          objectFit: "contain"
                      }}
                  />
                  ) : (
                    <PhotoIcon className="h-24 w-24 text-gray-300" aria-hidden="true" />
                )}
              </div>
          </div>
        
        
    </>
  )
}

export default CabeceraProductoStock
