import { procesosEnum, retornaFechaHoraSistema } from "@/utils/core/utils";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";



const estadosEnum = ["ANULADA", "SELECCION", "PENDIENTE", "INGRESADA"];


const RegulacionSalidaSchema = new Schema({
    regulacionSalida: {
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
    
    regulacionSalidaEmpresa: {
      type: Number,
      default: "0"
    },
    estado: {
      type: String,
      enum: estadosEnum,
      default: "SELECCION"
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
    fechaRegulacion:{
        type: Date,
    },
    ingresadoAlmacen:{
      type: Boolean,
      default: false, // Valor por defecto
    },
    itemsSeleccionados:{
      type: Boolean,
      default: false, // Valor por defecto
    },
    
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
    cantidadItemsSeleccionados: {
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
const RegulacionSalida = mongoose.models.RegulacionSalida || mongoose.model('RegulacionSalida', RegulacionSalidaSchema );

export default RegulacionSalida




//INDICES:
//RegulacionSalidaSchema.index({ estado: 1 });
//RegulacionSalidaSchema.index({ 'productos.productoId': 1 });
