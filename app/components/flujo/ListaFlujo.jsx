//TEST
import { CheckIcon, ChevronDownIcon, HandThumbUpIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/20/solid'
import ItemFlujoMEA from './ItemFlujoMEA'
import { Popover } from '@headlessui/react'
import ItemFlujoECP from './ItemFlujoECP'
import ItemFlujoERF from './ItemFlujoERF'
import ItemFlujoSRF from './ItemFlujoSRF'
import ItemFlujoMSA from './ItemFlujoMSA'

const ListaFlujo = ({flujos}) => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

      //TEST
    
      
    //FIN TEST


    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {flujos?.map((event, eventIdx) => (
                    <li key={event.data._id}>
                        <div className="relative pb-8">
                            {eventIdx !== flujos.length - 1 ? (
                                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            {/* <div className="relative flex space-x-3"> */}
                                {event.tipo == "ECP" && (
                                    <ItemFlujoECP oc={event.data} />
                                )}
                                {event.tipo == "MEA" && (
                                    <ItemFlujoMEA mea={event.data} />
                                )}
                                {event.tipo == "MSA" && (
                                    <ItemFlujoMSA msa={event.data} />
                                )}
                                {event.tipo == "ERF" && (
                                    <ItemFlujoERF re={event.data} />
                                )}
                                {event.tipo == "SRF" && (
                                    <ItemFlujoSRF rs={event.data} />
                                )}
                            {/* </div> */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default ListaFlujo
