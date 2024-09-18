import { HomeIcon } from '@heroicons/react/20/solid'




const SBreadCrumb = ({pages, titulo}) => {
  return (
    <div className='p-4' >
      <div className="md:flex md:items-center md:justify-between mb-2 ">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
            {titulo}
          </h2>
        </div>

      </div>

      <nav className="flex  " aria-label="Breadcrumb">
        <ol role="list" className="flex space-x-4  px-6 border-gray-800">
          <li className="flex">
            <div className="flex items-center">
              <a href="/" className="text-gray-200 hover:text-white">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  className="h-1/2 w-1 flex-shrink-0 text-gray-200"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <a
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-200 hover:text-white"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>

    </div>

  )
}

export default SBreadCrumb