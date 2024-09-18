'use server'
import SBreadCrumb from '@/app/components/SBreadCrumb'
import SForm from '@/app/components/SForm'




const Initpage = async () => {


  const pages = [
    { name: 'CORE', href: '#', current: false },
    { name: 'INIT', href: '#', current: true },
  ]

const titulo = "INIT"
  const handleSubmit = (formData) => {
    console.log(formData)
  }

  let state = 0

  
  


  

  return (
    <>
      <SBreadCrumb pages={pages} titulo={titulo} />
      <div className="bg-gray-200 rounded-lg shadow-md p-4 mt-2 " >
        {/* <form action="">
          <input  className='flex rounded-md  focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500' name='inputToken' type="text" />
          <button  className="mt-2  rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" type="submit">Init</button>
        </form> */}
        <SForm />

      {/* {state > 0 ? (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Atencion</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Ya existe Usuario Admin
                  </p>
                </div>
              </div>
            </div>
          </div>
      ) : (
        <p>No Hay</p>
      )
      
      }
         */}
        
      </div>
    </>
    
    
  )
}
export default Initpage