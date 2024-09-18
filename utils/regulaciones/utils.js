import { retornaFechaSistema } from "../core/utils"

const numeroCero = 0
export const formRegulacionEntradaInit = {
    _id: "",
    regulacionEntrada: "",
    regulacionEntradaEmpresa: "",
    empresa: {
        empresaRef: '',
        nombreEmpresa: "",
        nroDocEmpresa: "",
    },
    usuario: "",
    productos:[],
    alias: '',
    fechaRegulacion: retornaFechaSistema(),
    ingresadoAlmacen: false,
    documentos:[],
    obs: '',
    impuesto: numeroCero.toFixed(2),
    subTotal: numeroCero.toFixed(2),
    total: numeroCero.toFixed(2),
    
}


export const estadosRE = {
    pendiente: "PENDIENTE",
    ingresado: "INGRESADA",
    anulado: "ANULADA",

}



export const formRegulacionSalidaInit = {
    _id: "",
    regulacionSalida: "",
    regulacionSalidaEmpresa: "",
    empresa: {
        empresaRef: '',
        nombreEmpresa: "",
        nroDocEmpresa: "",
    },
    usuario: "",
    productos:[],
    alias: '',
    fechaRegulacion: retornaFechaSistema(),
    ingresadoAlmacen: false,
    documentos:[],
    obs: '',
    impuesto: numeroCero.toFixed(2),
    subTotal: numeroCero.toFixed(2),
    total: numeroCero.toFixed(2),
    
}


export const estadosRS = {
    seleccion: "SELECCION",
    pendiente: "PENDIENTE",
    ingresado: "INGRESADA",
    anulado: "ANULADA",

}

