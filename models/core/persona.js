import { retornaFechaHoraSistema } from "@/utils/core/utils";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const PersonaSchema = new Schema({
    nroPersona:{
      type: Number,
    },
    razonSocial:{
        type: String,
        unique: true,
        required: [true, "Razon Social es Obligarorio"]
    },
    representante:{
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
    mkp: {
      type: Boolean,
      default: false, // Valor por defecto
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

PersonaSchema.index({ docId: 1, numeroDoc: 1 }, { unique: true });
//const Persona = models.Persona || mongoose.model('Persona', PersonaSchema)
const Persona = mongoose.models.Persona || mongoose.model('Persona', PersonaSchema);

export default Persona

