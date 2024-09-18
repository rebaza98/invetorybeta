import { procesosEnum, retornaFechaHoraSistema } from "@/utils/core/utils";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const estadosEnum = ["NUEVO", "VENDIDO", "USADO", "DEVUELTO", "PERDIDO", "MALOGRADO"];

const ItemInventarioSchema = new Schema({
    nroItem:{
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
    movimientoAlmacenEntrada:{
        movimientoAlmacenEntradaRef:{
            type: Schema.Types.ObjectId,
            required: [true, "Empresa es Obligatoria"],
            ref: 'MovimientoAlmacen', 
        },
        movimientoAlmacenEntradaId:{
            type: Schema.Types.ObjectId,
            required: [true, "Empresa es Obligatoria"],
            ref: 'MovimientoAlmacen', 
        },
    },
    movimientoAlmacenSalida:{
        movimientoAlmacenSalidaRef:{
            type: Schema.Types.ObjectId,
            ref: 'MovimientoAlmacen', 
        },
        movimientoAlmacenSalidaId:{
            type: Schema.Types.ObjectId,
            ref: 'MovimientoAlmacen', 
        },
    },
    fechaEntrada:{
        type: Date,
    },
    fechaSalida:{
        type: Date,
    },
    libre:{
        type: Boolean,
        default: true
    },
    fisico:{
        type: Boolean,
        default: true
    },
    precioEntrada:{
        type:Number,
    },
    precioSalida:{
        type:Number,
        default: 0.00
    },
    nroSerie:{
        type: String,
    },
    indice:{
        type: Number,
    },
    producto: {
        productoRef:{
            type: Schema.Types.ObjectId,
            ref: 'Producto', 
        },
        productoId:{
            type: Schema.Types.ObjectId,
            ref: 'Producto', 
        },
    },
    estado: {
        type: String,
        enum: estadosEnum,
        default: "NUEVO"
    },
    procesosId: {
        type: Map,
        of: String,
        default:{
          "ordenCompra": null, 
          "movimientoAlmacenEntrada": null, 
          "venta": null, 
          "despachoSalida": null, 
          "despacho": null, 
          "movimientoAlmacenSalida": null, 
          
        }
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
    empresaExterna: {
        empresaRef:{
          type: Schema.Types.ObjectId,
          ref: 'Empresa', 
        },
        nombreEmpresa: {
          type: String,
        },
        nroDocEmpresa: {
          type: String,
        },
    },
    reservaExterna:{
        type: Boolean,
        default: false
    },

    desc:{
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
//const Producto = models.Producto || model('Producto', ProductoSchema)
const ItemInventario = mongoose.models.ItemInventario || mongoose.model('ItemInventario', ItemInventarioSchema);

export default ItemInventario