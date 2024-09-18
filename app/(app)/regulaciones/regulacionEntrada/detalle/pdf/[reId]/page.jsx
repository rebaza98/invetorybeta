'use client'

import SBreadCrumb from '@/app/components/SBreadCrumb';
import RePDF from '@/app/components/regulaciones/regulacionEntrada/RePDF';
import { useEffect, useState } from 'react';
//const DynamicMyPdf = dynamic(() => import('@/app/components/compras/ordenCompra/Mypdf'), { ssr: false });

const PdfPage = ({params}) => {
  const titulo = "Detalle Regulacion Entrada"
  const pages = [
    { name: 'Regulaciones', href: '#', current: false },
    { name: 'Regulacion Entrada', href: '/regulaciones/regulacionEntrada', current: true },
    { name: 'Detalle Regulacion Entrada', href: '#', current: true },
]
  const [re, setRe] = useState({})
  const getDatosRE = async () => {
    const response = await fetch(`/api/regulaciones/regulacionEntrada/buscar/${params.reId}`)
    const data = await response.json()
    console.log("DATA NUEVA POBLADA = ", data)
    setRe(data)
  }

  useEffect(() => {
    getDatosRE()
  }, [])
  return (
    <>
        <SBreadCrumb pages={pages} titulo={titulo} />
        <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2">
          <RePDF re={re} />
        </div>
      </>
      
    
  );
};

export default PdfPage;
