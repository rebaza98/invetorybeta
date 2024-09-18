import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const solutions = [
  { name: 'Analytics', href: '#' },
  { name: 'Engagement', href: '#' },
  { name: 'Security', href: '#' },
  { name: 'Integrations', href: '#' },
  { name: 'Automations', href: '#' },
  { name: 'Reports', href: '#' },
]

export default function PopOverCustom({ modulo, navigation }) {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && !event.target.closest('.popover')) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-white" onClick={() => setIsOpen(true)} >
        <span className='text-white hover:bg-indigo-500 hover:bg-opacity-75' >{modulo}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        show={isOpen}
      >
        <Popover.Panel className="absolute left-1/3 z-10 mt-1 flex w-screen max-w-min -translate-x-1/2 px-4" static  >
          <div className="w-56 shrink rounded-xl bg-indigo-600 p-1 text-sm font-semibold leading-6 text-white shadow-lg ring-1 ring-gray-900/5">
            {navigation?.map((item) => (
              <Link legacyBehavior key={item.name} href={item.href} className="block p-2 hover:bg-indigo-500 " >
               <a key={item.name}  className="block p-2 hover:bg-indigo-500 " onClick={() =>  setIsOpen(false)} >
                 {item.name}
               </a>
              </Link>
              
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}