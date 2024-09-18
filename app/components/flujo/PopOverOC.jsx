import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React from 'react'

const PopOverOC = ({oc}) => {
  return (
      <Popover className="">
          <Popover.Button className={"flex"} >
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </Popover.Button>
          <Popover.Panel>
              <div className='w-full bg-slate-100' >
                <div className='flex' >
                <div>
                      Proveedors: <strong>{oc.proveedor.razonSocial}</strong>
                </div>
                <div>
                      {oc.proveedor.docId.nombre}: <strong>{oc.proveedor.razonSocial}</strong>
                </div>
                </div>
                  
              </div>
          </Popover.Panel>
      </Popover>
  )
}

export default PopOverOC
