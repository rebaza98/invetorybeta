
import { retornaFechaHoraSistema } from "@/utils/core/utils";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const EmpresaSchema = new Schema({
    razonSocial:{
        type: String,
        unique: true,
        required: [true, "Razon Social es Obligarorio"]
    },
    nombreComercial:{
      type: String,
      unique: true,
      required: [true, "Nombre Comercial es Obligarorio"]
  },
    representante:{
        type: String,
    },
    siglas:{
      type: String,
      required: [true, "Siglas de empresa es Obligatorio"]
    },
    contadores: {
      type: Map,
      of: Number,
      default:{
        "ordenCompra": 0, 
        "ordenVentaRegular": 0, 
        "ordenVentaMarket": 0, 
        "regulacionEntrada": 0, 
        "regulacionSalida": 0, 
        "movAlmacen": 0, 
        "despachoRegular": 0, 
        "despachoMKP": 0, 
      }

    },
    url1:{
      type: String,
    },
    url2:{
      type: String,
    },
    url3:{
      type: String,
    },
    url4:{
      type: String,
    },
    url5:{
      type: String,
    },
    numeroDoc:{
      type: String,
      unique: true,
    },
    docId: {
      codigo: {
        type: Number,
      },
      nombre: {
        type: String,
      }
    },
    email:{
        type: String,
    },
    ubigeo: {
      ubigeoRef:{
        type: Schema.Types.ObjectId,
        ref: 'Ubigeo', 
      },
      codigoReniec: {
        type: String,
      },
      codigoInei: {
        type: String,
      },
      ubicacion:{
        type: String,
      },
      desc: {
        type: String,
      },
    },
    
    telefono: [
      {
        alias: {
          type: String,
        },
        numero: {
          type: String,
        },
        operador: {
          type: String,
        },
      },
    ],
    
    direccion: [
      {
        ubigeoRef:{
          type: Schema.Types.ObjectId,
        ref: 'Ubigeo', 
        },
        alias: {
          type: String,
        },
        codigoReniec: {
          type: String,
        },
        codigoInei: {
          type: String,
        },
        direc: {
          type: String,
        }
      },
    ],
    cuentas: [
      { 
        alias: {
        type: String,
        },
        banco: {
          type: String,
        },
        nroCuenta: {
          type: String,
        },
        tipo: {
          type: String,
        },
        cci: {
          type: String,
        },
        titular: {
          type: String,
        },
      },
    ],
    imagenUrl:{
        type: String,
    },
    activo: {
      type: Boolean,
      default: true, // Valor por defecto
    },

}, { 
    timestamps: { 
        currentTime: () => retornaFechaHoraSistema() // Ajuste para zona horaria GMT-5 (UTC-5)
    } 
})

EmpresaSchema.index({ docId: 1, numeroDoc: 1 }, { unique: true });
//const Empresa = models.Empresa || model('Empresa', EmpresaSchema)
const Empresa = mongoose.models.Empresa || mongoose.model('Empresa', EmpresaSchema);

export default Empresa

