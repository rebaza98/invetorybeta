import { procesosEnum, retornaFechaHoraSistema } from "@/utils/core/utils";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";



const estadosEnum = ["ANULADA", "PENDIENTE", "INGRESADA"];


const OrdenCompraSchema = new Schema({
    oc: {
      type: Number,
    },
    empresa: {
      empresaRef:{
        type: Schema.Types.ObjectId,
        required: [true, "Empresa es Obligatoria"],
        ref: 'Empresa', 
      },
      nombreEmpresa: {
        type: String,
        required: [true, "Razon Social es Obligatoria"],
      },
      nroDocEmpresa: {
        type: String,
        required: [true, "RUC es Obligatorio"],
      },
    },
    usuario: {
      usuarioRef:{
        required: [true, "Usuario es Obligatorio"],
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
      },
      user: {
        type: String,
        required: [true, "Usuario es Obligatorio"],
      },
    },
    
    ocEmpresa: {
      type: Number,
      default: "0"
    },
    estado: {
      type: String,
      enum: estadosEnum,
      default: "PENDIENTE"
    },
    proveedor: {
      personaRef:{
        type: Schema.Types.ObjectId,
        required: [true, "Persona es Obligatoria"],
        ref: 'Persona', 
      },
      razonSocial: {
        type: String,
        required: [true, "Razon Social es Obligatoria"],
      },
      docId: {
        codigo: {
          type: Number,
        },
        nombre: {
          type: String,
        }
      },
      numeroDoc:{
        type: String,
      },
      
    },
    productos: [
        {
          productoRef:{
            type: Schema.Types.ObjectId,
            ref: 'Producto', 
          },
          productoId:{
            type: Schema.Types.ObjectId,
            ref: 'Producto', 
          },
          detalle:[
            {
              index: {
                type: Number,
              },
              serie: {
                type: String,
              },
              nroItem: {
                type: Number,
              },
              itemId:{
                type: ObjectId,
              },
            }
          ],
          cantidad: {
            type: Number,
          },
          precio: {
            type: Number,
          },
        },
    ],
    alias:{
        type: String,
    },
    fechaCompra:{
        type: Date,
    },
    fechaEntrega:{
        type: Date,
    },
    ingresadoAlmacen:{
      type: Boolean,
      default: false, // Valor por defecto
    },
    pagada:{
      type: Boolean,
    },
    pagos: [
      {
        concepto: {
          type: String,
        },
        fechaPago:{
        type: Date,
        },
        abona:{
        type: Boolean,
        },
        obs:{
        type: String,
        },

      }

    ],
    documentos: [],
    
    obs:{
        type: String,
    },
    impuesto:{
      type:Number,
    },
    subTotal:{
      type:Number,
    },
    total:{
      type:Number,
    },
    cantidadItems: {
      type:Number,
    },
    movAlmacen: {
      movimientoRef:{
        type: Schema.Types.ObjectId,
        ref: 'MovimientoAlmacen', 
      },
      movimientoId:{
        type: Schema.Types.ObjectId,
        ref: 'MovimientoAlmacen', 
      },
    },
    flujo: [
      {
        procesoId:{
          type: ObjectId,
        },
        tipoProceso:{
          type: String,
          enum: procesosEnum,
        },
      }
    ],

    activo: {
      type: Boolean,
      default: true, // Valor por defecto
    },
  
}, { 
  timestamps: { 
      currentTime: () => retornaFechaHoraSistema() // Ajuste para zona horaria GMT-5 (UTC-5)
  } 
})

//const OrdenCompra = models.OrdenCompra || model('OrdenCompra', OrdenCompraSchema)
const OrdenCompra = mongoose.models.OrdenCompra || mongoose.model('OrdenCompra', OrdenCompraSchema );

export default OrdenCompra




