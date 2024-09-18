'use client'

import SBreadCrumb from '@/app/components/SBreadCrumb';
import OcPDF from '@/app/components/compras/ordenCompra/OcPDF';
import { useEffect, useState } from 'react';
//const DynamicMyPdf = dynamic(() => import('@/app/components/compras/ordenCompra/Mypdf'), { ssr: false });

const PdfPage = ({params}) => {
  const titulo = "Detalle Orden Compra"
  const pages = [
    { name: 'Compras', href: '#', current: false },
    { name: 'Ordenes de Compra', href: '/compras/ordenesCompra', current: true },
    { name: 'Detalle Orden Compra', href: '#', current: true },
]
  const [oc, setOc] = useState({})
  const getDatosOC = async () => {
    const response = await fetch(`/api/compras/ordenCompra/buscar/${params.ocId}`)
    const data = await response.json()
    setOc(data)
  }

  useEffect(() => {
    getDatosOC()
  }, [])
  return (
    <>
        <SBreadCrumb pages={pages} titulo={titulo} />
        <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2">
          <OcPDF oc={oc}  />
        </div>
      </>
      
    
  );
};

export default PdfPage;
