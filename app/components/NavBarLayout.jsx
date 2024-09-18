'use client'
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { signIn, signOut, useSession } from "next-auth/react"

import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  TruckIcon
} from '@heroicons/react/24/outline'
import MainLayout from './MainLayout'
import PopOverCustom from './PopOverCustom'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
 // { name: 'Reportes', href: '#', icon: ChartPieIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const comprasNavigation = [
  { name: 'Ordenes de Compra', href: '/compras/ordenesCompra' },

]

const ventasNavigation = [
  { name: 'Venta Regular', href: '/ventas/ventaRegular' },
  { name: 'Ordenes de Venta MKP', href: '/ventas/ordenesVentaMKP' },

]

const inventarioNavigation = [
  { name: 'Movimientos de Almacen', href: '/inventario/movimientosAlmacen' },
  { name: 'Stock', href: '/inventario/stock' },
]

const regulacionesNavigation = [
  { name: 'Regulacion de Entrada', href: '/regulaciones/regulacionEntrada' },
  { name: 'Regulacion de Salida', href: '/regulaciones/regulacionSalida' },
]

const adminNavigation = [
  { name: 'Usuarios', href: '#' },
  { name: 'Empresas', href: '/core/empresas' },
  { name: 'Personas', href: '/core/personas' },

  { name: 'Categorias', href: '/inventario/categorias' },
  { name: 'Marcas', href: '/inventario/marcas' },
  { name: 'Productos', href: '/inventario/productos' },
  { name: 'Especificaciones', href: '/inventario/especificaciones' },
  { name: 'Almacenes', href: '/core/almacenes' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBarLayOut({children}) {
  const {data: session } = useSession()
  console.log("SESSION = ", session)
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
          <Disclosure as="nav" className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0">
                        <img
                          className="block h-8 w-8"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                        {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-indigo-700 text-white relative'
                                  : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                'rounded-md py-1 px-3 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                          <PopOverCustom modulo={"Core"} navigation={adminNavigation} />
                          <PopOverCustom modulo={"Compras"} navigation={comprasNavigation} />
                          <PopOverCustom modulo={"Ventas"} navigation={ventasNavigation} />
                          <PopOverCustom modulo={"Regulaciones"} navigation={regulacionesNavigation} />
                          
                          
                          <PopOverCustom modulo={"Inventario"} navigation={inventarioNavigation}  />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                      <div className="w-full max-w-lg lg:max-w-xs">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <input
                            id="search"
                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Buscar"
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:ml-4 lg:block">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3 flex-shrink-0">
                          <div>
                            <Menu.Button className="flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                              <span className="sr-only">Open user menu</span>
                              <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a 
                                      href={item.href}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                    

                                  )}
                                  
                                </Menu.Item>
                              ))}
                              <Menu.Item>
                                <button onClick={() => signOut()}
                                  type="button"
                                  className="rounded bg-indigo-600 block px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  SignOut
                                </button>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                        <p className='text-sm text-white' >{session?.user?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                  <PopOverCustom/>
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-700 text-white'
                            : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                          'block rounded-md py-2 px-3 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                      
                    ))}
                    <PopOverCustom/>
                  </div>
                  <div className="border-t border-indigo-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">{user.name}</div>
                        <div className="text-sm font-medium text-indigo-300">{user.email}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/* <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
            </div>
          </header> */}
        </div>
          <MainLayout >
            {children}
          </MainLayout>
        
      </div>
    </>
  )
}













// /*
//   This example requires some changes to your config:
  
//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */

// 'use client'
// import { Fragment, useState } from 'react'
// import { Dialog, Menu, Transition } from '@headlessui/react'
// import {
//   Bars3Icon,
//   BellIcon,
//   CalendarIcon,
//   ChartPieIcon,
//   Cog6ToothIcon,
//   DocumentDuplicateIcon,
//   FolderIcon,
//   HomeIcon,
//   UsersIcon,
//   XMarkIcon,
//   TruckIcon

// } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
// import CSidebar from './CSidebar'

// const navigation = [
//   { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
//   { name: 'Productos', href: '/inventario/productos', icon: UsersIcon, current: false },
//   { name: 'Personas', href: '/core/personas', icon: UsersIcon, current: false },
//   { name: 'Despachos', href: '#', icon: TruckIcon, current: false },
//   { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
//   { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
//   { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
// ]
// const teams = [
//   { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
//   { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
//   { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
// ]
// const userNavigation = [
//   { name: 'Your profile', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Example({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <>
//       {/*
//         This example requires updating your template:

//         ```
//         <html class="h-full bg-white">
//         <body class="h-full">
//         ```
//       */}
//       <div>
//         <Transition.Root show={sidebarOpen} as={Fragment}>
//           <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
//             <Transition.Child
//               as={Fragment}
//               enter="transition-opacity ease-linear duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="transition-opacity ease-linear duration-300"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-gray-900/80" />
//             </Transition.Child>

//             <div className="fixed inset-0 flex">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transition ease-in-out duration-300 transform"
//                 enterFrom="-translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transition ease-in-out duration-300 transform"
//                 leaveFrom="translate-x-0"
//                 leaveTo="-translate-x-full"
//               >
//                 <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
//                   <Transition.Child
//                     as={Fragment}
//                     enter="ease-in-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in-out duration-300"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                   >
//                     <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
//                       <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
//                         <span className="sr-only">Close sidebar</span>
//                         <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
//                       </button>
//                     </div>
//                   </Transition.Child>
//                   {/* Sidebar component, swap this element with another sidebar if you like */}
//                   <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
//                     <div className="flex h-16 shrink-0 items-center">
//                       <img
//                         className="h-8 w-auto"
//                         src="https://tailwindui.com/img/logos/mark.svg?color=white"
//                         alt="Your Company"
//                       />
//                     </div>
//                     <nav className="flex flex-1 flex-col">
//                       <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                         <li>
//                           <ul role="list" className="-mx-2 space-y-1">
//                             {navigation.map((item) => (
//                               <li key={item.name}>
//                                 <a
//                                   href={item.href}
//                                   className={classNames(
//                                     item.current
//                                       ? 'bg-indigo-700 text-white'
//                                       : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
//                                     'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
//                                   )}
//                                 >
//                                   <item.icon
//                                     className={classNames(
//                                       item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
//                                       'h-6 w-6 shrink-0'
//                                     )}
//                                     aria-hidden="true"
//                                   />
//                                   {item.name}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </li>
//                         <li>
//                           <div className="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
//                           <ul role="list" className="-mx-2 mt-2 space-y-1">
//                             {teams.map((team) => (
//                               <li key={team.name}>
//                                 <a
//                                   href={team.href}
//                                   className={classNames(
//                                     team.current
//                                       ? 'bg-indigo-700 text-white'
//                                       : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
//                                     'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
//                                   )}
//                                 >
//                                   <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
//                                     {team.initial}
//                                   </span>
//                                   <span className="truncate">{team.name}</span>
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </li>
//                         <li className="mt-auto">
//                           <a
//                             href="#"
//                             className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
//                           >
//                             <Cog6ToothIcon
//                               className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
//                               aria-hidden="true"
//                             />
//                             Settings
//                           </a>
//                         </li>
//                       </ul>
//                     </nav>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </Dialog>
//         </Transition.Root>

//         {/* Static sidebar for desktop */}
//         <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
//           {/* Sidebar component, swap this element with another sidebar if you like */}
//           <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
//             <div className="flex h-16 shrink-0 items-center">
//               <img
//                 className="h-8 w-auto"
//                 src="https://tailwindui.com/img/logos/mark.svg?color=white"
//                 alt="Your Company"
//               />
//             </div>
//             <nav className="flex flex-1 flex-col">
//               <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                 <li>
//                   <ul role="list" className="-mx-2 space-y-1">
//                     {navigation.map((item) => (
//                       <li key={item.name}>
//                         <a
//                           href={item.href}
//                           className={classNames(
//                             item.current
//                               ? 'bg-indigo-700 text-white'
//                               : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
//                             'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
//                           )}
//                         >
//                           <item.icon
//                             className={classNames(
//                               item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
//                               'h-6 w-6 shrink-0'
//                             )}
//                             aria-hidden="true"
//                           />
//                           {item.name}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//                 <li>
//                   <div className="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
//                   <ul role="list" className="-mx-2 mt-2 space-y-1">
//                     {teams.map((team) => (
//                       <li key={team.name}>
//                         <a
//                           href={team.href}
//                           className={classNames(
//                             team.current
//                               ? 'bg-indigo-700 text-white'
//                               : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
//                             'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
//                           )}
//                         >
//                           <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
//                             {team.initial}
//                           </span>
//                           <span className="truncate">{team.name}</span>
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//                 <li className="mt-auto">
//                   <a
//                     href="#"
//                     className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
//                   >
//                     <Cog6ToothIcon
//                       className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
//                       aria-hidden="true"
//                     />
//                     Settings
//                   </a>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//           {/* <CSidebar /> */}
//         </div>

//         <div className="lg:pl-72">
//           <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
//             <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
//               <span className="sr-only">Open sidebar</span>
//               <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//             </button>

//             {/* Separator */}
//             <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

//             <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
//               {/* <form className="relative flex flex-1" action="#" method="GET">
//                 <label htmlFor="search-field" className="sr-only">
//                   Search
//                 </label>
//                 <MagnifyingGlassIcon
//                   className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//                 <input
//                   id="search-field"
//                   className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
//                   placeholder="Search here..."
//                   type="search"
//                   name="search"
//                 />
//               </form> */}
//               <div className="flex items-center gap-x-4 lg:gap-x-6">
//                 <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
//                   <span className="sr-only">View notifications</span>
//                   <BellIcon className="h-6 w-6" aria-hidden="true" />
//                 </button>

//                 {/* Separator */}
//                 <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

//                 {/* Profile dropdown */}
//                 <Menu as="div" className="relative">
//                   <Menu.Button className="-m-1.5 flex items-center p-1.5">
//                     <span className="sr-only">Open user menu</span>
//                     <img
//                       className="h-8 w-8 rounded-full bg-gray-50"
//                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                       alt=""
//                     />
//                     <span className="hidden lg:flex lg:items-center">
//                       <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
//                         Tom Cook
//                       </span>
//                       <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
//                     </span>
//                   </Menu.Button>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
//                       {userNavigation.map((item) => (
//                         <Menu.Item key={item.name}>
//                           {({ active }) => (
//                             <a
//                               href={item.href}
//                               className={classNames(
//                                 active ? 'bg-gray-50' : '',
//                                 'block px-3 py-1 text-sm leading-6 text-gray-900'
//                               )}
//                             >
//                               {item.name}
//                             </a>
//                           )}
//                         </Menu.Item>
//                       ))}
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//               </div>
//             </div>
//           </div>

//           <main className="py-10">
//             <div className="px-4 sm:px-6 lg:px-8">{children}</div>
//           </main>
//         </div>
//       </div>
//     </>
//   )
// }
