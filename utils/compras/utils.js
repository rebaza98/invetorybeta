import { retornaFechaSistema } from "../core/utils"

const numeroCero = 0
export const formOrdenCompraInit = {
    _id: "",
    oc: "",
    ocEmpresa: "",
    empresa: {
        empresaRef: '',
        nombreEmpresa: "",
        nroDocEmpresa: "",
    },
    usuario: "",
    proveedor: {
        personaRef: '',
        razonSocial: '',
        docId: {
            codigo: '',
            nombre: '',
        },
        numeroDoc: ''
    },
    productos:[],
    alias: '',
    fechaCompra: retornaFechaSistema(),
    fechaEntrega: '',
    ingresadoAlmacen: false,
    pagada: true,
    pagos:[],
    documentos:[],
    obs: '',
    impuesto: numeroCero.toFixed(2),
    subTotal: numeroCero.toFixed(2),
    total: numeroCero.toFixed(2),
    
}


export const estadosOC = {
    pendiente: "PENDIENTE",
    ingresado: "INGRESADA",
    anulado: "ANULADA",

}


