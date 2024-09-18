import { formatearFecha } from '@/utils/core/utils'
import { ArrowRightEndOnRectangleIcon, ChevronDownIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'
import { Popover, Transition } from '@headlessui/react'
import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'

const ItemFlujoSRF = ({ rs }) => {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='relative flex space-x-3' >
        <div>
          <span
            className='bg-gray-400 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
          >
            <ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
        </div>
        <Popover className="w-full">
          <div className="flex justify-between  pt-1.5">
            <div>
              <p className="text-sm text-gray-500">
                {"REGULACION SALIDA creada por "}{' '}
                <a href="#" className="font-medium text-gray-900">
                  {rs.usuario.user}
                </a>
              </p>
            </div>
            <div className='flex justify-end ' >
              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                <time dateTime={rs.createdAt}>{formatearFecha(rs.createdAt)}</time>
              </div>
              <Popover.Button onClick={togglePopover} >
               <ChevronDownIcon className={`${isOpen ? 'rotate-180 transform' : ''} h-5 w-5 `} aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          {isOpen && 
          <Popover.Panel static>
          <div className='w-full p-4 bg-slate-100' >
            
          <div className='flex justify-between' >
              <div className='text-xs' >
                Empresa: <strong>{rs.empresa.nombreEmpresa}</strong>
              </div>
              <div className='text-xs' >
                <Link  target='_blank' href={`/regulaciones/regulacionSalida/detalle/pdf/${rs._id}`}>
                  Regulacion: <strong className='text-purple-500 underline' >{String(rs.regulacionSalidaEmpresa).padStart(5, '0')}</strong>
                </Link>
              </div>
            </div>
            <div className='flex justify-between' >
              
            </div>
          </div>
        </Popover.Panel>
          }
          
        </Popover>
      </div>
    </>
  )
}

export default ItemFlujoSRF
