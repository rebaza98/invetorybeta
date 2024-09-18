'use client'

import SBreadCrumb from '@/app/components/SBreadCrumb';
import RsPDF from '@/app/components/regulaciones/regulacionSalida/RsPDF';
import { useEffect, useState } from 'react';
//const DynamicMyPdf = dynamic(() => import('@/app/components/compras/ordenCompra/Mypdf'), { ssr: false });

const PdfPage = ({params}) => {
  const titulo = "Detalle Regulacion Salida"
  const pages = [
    { name: 'Regulaciones', href: '#', current: false },
    { name: 'Regulacion salida', href: '/regulaciones/regulacionSalida', current: true },
    { name: 'Detalle Regulacion Salida', href: '#', current: true },
]
  const [rs, setRs] = useState({})
  const getDatosRE = async () => {
    const response = await fetch(`/api/regulaciones/regulacionSalida/buscar/${params.rsId}`)
    const data = await response.json()
    setRs(data)
  }

  useEffect(() => {
    getDatosRE()
  }, [])
  return (
    <>
        <SBreadCrumb pages={pages} titulo={titulo} />
        <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2">
          <RsPDF rs={rs} />
        </div>
      </>
      
    
  );
};

export default PdfPage;
