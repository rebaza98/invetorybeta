import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import CFormProducto from './CFormProducto'

export default function CModalProducto({open, setOpen, tituloModal}) {
    const cancelButtonRef = useRef(null)

    // useEffect( () => {

    //     if(!open){
    //         setTimeout(() => {
    //             setModal(false)
    //         },500)
    //         return   
    //     }

       
        

    // }, [open] )

  return (
    <Transition.Root show={open} as={Fragment}
        enter="ease-out duration-1000"
        enterFrom="translate-x-full opacity-0"
        enterTo="translate-x-0 opacity-100"
    >
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-400"
          leaveFrom="opacity-500"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-1000"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <CFormProducto tituloModal={tituloModal} cancelButtonRef={cancelButtonRef} open={open} setOpen={setOpen} />
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
