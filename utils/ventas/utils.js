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



export const formVentaRegularInit = {
    _id: "",
    ov: "",
    ovEmpresa: "",
    empresa: {
        empresaRef: '',
        nombreEmpresa: "",
        nroDocEmpresa: "",
    },
    usuario: "",
    cliente: {
        personaRef: '',
        razonSocial: '',
        docId: {
            codigo: '',
            nombre: '',
        },
        numeroDoc: ''
    },
    clienteFinal: {
        personaRef: '',
        razonSocial: '',
        docId: {
            codigo: '',
            nombre: '',
        },
        numeroDoc: '',
        direccion: {
            ubigeoRef:'',
            alias:'',
            codigoReniec: '',
            codigoInei: '',
            direc: '',
          },
    },
    direccion: {
        ubigeoRef:'',
        alias:'',
        codigoReniec: '',
        codigoInei: '',
        direc: '',
      },
    productos:[],
    alias: '',
    fechaVenta: retornaFechaSistema(),
    usaClienteFinal: false,
    ingresadoAlmacen: false,
    documentos:[],
    obs: '',
    impuesto: numeroCero.toFixed(2),
    subTotal: numeroCero.toFixed(2),
    total: numeroCero.toFixed(2),
    
}


export const estadosOVR = {
    seleccion: "SELECCION",
    pendiente: "PENDIENTE",
    ingresado: "INGRESADA",
    anulado: "ANULADA",

}

