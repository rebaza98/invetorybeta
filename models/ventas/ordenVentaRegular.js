import { procesosEnum, retornaFechaHoraSistema } from "@/utils/core/utils";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";



const estadosEnum = ["ANULADA", "SELECCION", "PENDIENTE", "INGRESADA"];


const OrdenVentaRegularSchema = new Schema({
    ovr: {
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
    
    ovrEmpresa: {
      type: Number,
      default: "0"
    },
    estado: {
      type: String,
      enum: estadosEnum,
      default: "PENDIENTE"
    },
    cliente: {
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
    usaClienteFinal:{
      type: Boolean,
      default: false,
      },
    clienteFinal: {
      personaRef:{
        type: Schema.Types.ObjectId,
        ref: 'Persona', 
        required: false,
        default: null,
      },
      razonSocial: {
        type: String,
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
      direccion: {
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
      
    },
    direccion: {
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
          comision: {
            type: Number,
            default: 0,
          },
          usaComision:{
            type: Boolean,
            default: false, // Valor por defecto
          },
          precioBase: {
            type: Number,
            default: 0,
          },
          impuestoBase: {
            type: Number,
            default: 0,
          },
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
    fechaVenta:{
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
const OrdenVentaRegular = mongoose.models.OrdenVentaRegular || mongoose.model('OrdenVentaRegular', OrdenVentaRegularSchema );

export default OrdenVentaRegular




