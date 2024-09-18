import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
import CErrorAlert from '@/app/components/CErrorAlert'



const CModalIngresaCtaBancaria = ({ open, setOpen, formValues, setFormValues }) => {

    
    const [errorAlert, setErrorAlert] = useState(false)
    const [listaErrores, setListaErrores] = useState([])


    const [formCtaValues, setFormCtaValues] = useState({
        alias:'',
        nroCuenta:'',
        cci: '',
        banco: '',
        tipo: 'Soles',
        titular: '',
        desc: ''
      })
    
    
    // ESTADO ERROR
    const [nroCuentaInput, setNroCuentaInput] = useState(false)

    const handleIngresar = () => {
        setNroCuentaInput(false)
        setErrorAlert(false)
        let errores = []

        if (formCtaValues.nroCuenta === ""){
            setNroCuentaInput(true)
            errores.push("Ingrese Algun Nro Cuenta Valido")
            toast.error('Ingrese Algun Nro Cuenta Valido', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        if (errores.length == 0){
            setFormValues({
                ...formValues,
                cuentas: [...formValues.cuentas, formCtaValues]
            })
            setOpen(false)

        }else{
            console.log("ERRORES = ", errores)
            //setErrorAlert(true)
            setListaErrores(errores)
        }


    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-screen items-center justify-center p-4 text-center sm:items-start sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    {/* <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"> */}
                    <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <div>
                            <div className="mt-3  sm:mt-5">
                                <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                Ingrese Informacion de Cuenta
                                </Dialog.Title>
                                {errorAlert && <CErrorAlert listaErrores={listaErrores} />}
                                <form className="mt-2 mb-2 w-80 max-w-screen-sm sm:w-full">
                                    <div className='mt-2' >
                                        <label htmlFor="idalias" className="block text-sm font-medium leading-6 text-gray-900">
                                            Alias
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="alias"
                                                id="idalias"
                                                value={formCtaValues.alias} 
                                                onChange={e => setFormCtaValues({ ...formCtaValues, alias: e.target.value.toLocaleUpperCase() })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-2' >
                                        <label htmlFor="idnrocuenta" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nro Cuenta
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="nrocuenta"
                                                id="idnrocuenta"
                                                value={formCtaValues.nroCuenta} 
                                                className={`block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                    nroCuentaInput ? 'border-1 border-red-500 ' : 'border-0' // Agrega la clase border-red-500 si hay error en dirección
                                                }`}
                                                onChange={e => {
                                                    setNroCuentaInput(false)
                                                    setFormCtaValues({...formCtaValues, nroCuenta: e.target.value})
                                                }}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-2' >
                                        <label htmlFor="idcci" className="block text-sm font-medium leading-6 text-gray-900">
                                            CCI
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="cci"
                                                id="idcci"
                                                value={formCtaValues.cci} 
                                                onChange={e => setFormCtaValues({ ...formCtaValues, cci: e.target.value.toLocaleUpperCase() })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-2' >
                                        <label htmlFor="idtitular" className="block text-sm font-medium leading-6 text-gray-900">
                                            Titular
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="titular"
                                                id="idtitular"
                                                value={formCtaValues.titular} 
                                                onChange={e => setFormCtaValues({ ...formCtaValues, titular: e.target.value.toLocaleUpperCase() })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-2' >
                                        <label htmlFor="idbanco" className="block text-sm font-medium leading-6 text-gray-900">
                                            Banco
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="banco"
                                                list='listaBancos'
                                                value={formCtaValues.banco} 
                                                onChange={e => setFormCtaValues({ ...formCtaValues, banco: e.target.value.toLocaleUpperCase() })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                autoComplete='off'
                                            />
                                            <datalist id="listaBancos">
                                                <option value="BANCO DE COMERCIO">BANCO DE COMERCIO</option>
                                                <option value="BANCO DE CREDITO DEL PERU (BCP)">BANCO DE CREDITO DEL PERU (BCP)</option>
                                                <option value="BANCO INTERAMERICANO DE FINANZAS (BANBIF)">BANCO INTERAMERICANO DE FINANZAS (BANBIF)</option>
                                                <option value="BANCO PICHINCHA">BANCO PICHINCHA</option>
                                                <option value="BBVA">BBVA</option>
                                                <option value="CITIBANK PERU">CITIBANK PERU</option>
                                                <option value="INTERBANK">INTERBANK</option>
                                                <option value="MIBANCO">MIBANCO</option>
                                                <option value="SCOTIABANK PERU">SCOTIABANK PERU</option>
                                                <option value="BANCO GNB PERU">BANCO GNB PERU</option>
                                                <option value="BANCO FALABELLA">BANCO FALABELLA</option>
                                                <option value="BANCO RIPLEY">BANCO RIPLEY</option>
                                                <option value="BANCO SANTANDER PERU">BANCO SANTANDER PERU</option>
                                                <option value="ALFIN BANCO">ALFIN BANCO</option>
                                                <option value="BANK OF CHINA">BANK OF CHINA</option>
                                                <option value="BCI PERU">BCI PERU</option>
                                                <option value="ICBC PERU BANK">ICBC PERU BANK</option>
                                                <option value="AGROBANCO">AGROBANCO</option>
                                                <option value="BANCO DE LA NACION">BANCO DE LA NACION</option>
                                                <option value="COFIDE">COFIDE</option>
                                                <option value="FONDO MIVIVIENDA">FONDO MIVIVIENDA</option>
                                                <option value="FINANCIERA CREDISCOTIA">FINANCIERA CREDISCOTIA</option>
                                                <option value="FINANCIERA CONFIANZA">FINANCIERA CONFIANZA</option>
                                                <option value="FINANCIERA COMPARTAMOS">FINANCIERA COMPARTAMOS</option>
                                                <option value="FINANCIERA CREDINKA">FINANCIERA CREDINKA</option>
                                                <option value="FINANCIERA EFECTIVA">FINANCIERA EFECTIVA</option>
                                                <option value="FINANCIERA PROEMPRESA">FINANCIERA PROEMPRESA</option>
                                                <option value="FINANCIERA MITSUI AUTO FINANCE">FINANCIERA MITSUI AUTO FINANCE</option>
                                                <option value="FINANCIERA OH!">FINANCIERA OH!</option>
                                                <option value="FINANCIERA QAPAQ">FINANCIERA QAPAQ</option>
                                                <option value="CAJA AREQUIPA">CAJA AREQUIPA</option>
                                                <option value="CAJA CUSCO">CAJA CUSCO</option>
                                                <option value="CAJA DEL SANTA">CAJA DEL SANTA</option>
                                                <option value="CAJA TRUJILLO">CAJA TRUJILLO</option>
                                                <option value="CAJA HUANCAYO">CAJA HUANCAYO</option>
                                                <option value="CAJA ICA">CAJA ICA</option>
                                                <option value="CAJA MAYNAS">CAJA MAYNAS</option>
                                                <option value="CAJA PAITA">CAJA PAITA</option>
                                                <option value="CAJA PIURA">CAJA PIURA</option>
                                                <option value="CAJA SULLANA">CAJA SULLANA</option>
                                                <option value="CAJA TACNA">CAJA TACNA</option>
                                                <option value="CAJA METROPOLITANA DE LIMA">CAJA METROPOLITANA DE LIMA</option>
                                                <option value="INCASUR">INCASUR</option>
                                                <option value="LOS ANDES">LOS ANDES</option>
                                                <option value="PRYMERA">PRYMERA</option>
                                                <option value="DEL CENTRO">DEL CENTRO</option>
                                                <option value="RAIZ">RAIZ</option>
                                                <option value="CENCOSUD SCOTIA">CENCOSUD SCOTIA</option>
                                            </datalist>
                                        </div>
                                    </div>
                                    <div className='mt-2' >
                                        <label htmlFor="iddesc" className="block text-sm font-medium leading-6 text-gray-900">
                                            Descripcion
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="desc"
                                                id="iddesc"
                                                value={formCtaValues.desc} 
                                                onChange={e => setFormCtaValues({ ...formCtaValues, desc: e.target.value.toLocaleUpperCase() })}
                                                className="block w-full uppercase rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                            onClick={()=> handleIngresar()}
                                        >
                                            Ingresar
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default CModalIngresaCtaBancaria