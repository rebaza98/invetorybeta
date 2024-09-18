import { procesosEnum, retornaFechaHoraSistema } from "@/utils/core/utils";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";



const tipoMovimientoEnum = ["ECP", "ERF", "SDC", "SRF"];



const MovimientoAlmacenSchema = new Schema({
    almacen: {
      almacenRef:{
        required: [true, "Almacen es Obligatorio"],
        type: Schema.Types.ObjectId,
        ref: 'Almacen', 
      },
      alias: {
        type: String,
        required: [true, "Almacen es Obligatorio"],
      },
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
    
    tipoMovimiento: {
      type: String,
      enum: tipoMovimientoEnum,
    },
    proceso: [
      {
        idProceso: {
          type: ObjectId,
        },
        productos: [
          {
            productoRef:{
              type: Schema.Types.ObjectId,
              ref: 'Producto', 
            },
            productoId: {
              type: String,
            },
            cantidad: {
              type: Number,
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
            precio: {
              type: Number,
            },
          },
        ],  
      }
    ],
    
    alias:{
        type: String,
    },
    fechaMovimiento:{
        type: Date,
    },
    
    esEntrada: {
      type: Boolean,
      default: true, // Valor por defecto
    },
    
    obs:{
        type: String,
    },
    impuesto:{
      type:Number,
    },
    subTotal:{
      type:Number,
    },
    totalValor:{
      type:Number,
    },
    totalItems:{
      type:Number,
    },
    movimiento:{
      type:Number,
    },
    movimientoEmpresa:{
      type:Number,
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
  
// }, { timestamps: true })
}, { 
  timestamps: { 
      currentTime: () => retornaFechaHoraSistema() // Ajuste para zona horaria GMT-5 (UTC-5)
  } 

})

const MovimientoAlmacen = mongoose.models.MovimientoAlmacen || mongoose.model('MovimientoAlmacen', MovimientoAlmacenSchema );

export default MovimientoAlmacen




