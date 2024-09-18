import { procesosEnum, retornaFechaHoraSistema } from "@/utils/core/utils";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";





// Subesquema para los procesos de reserva
const ReservaProcesoSchema = new Schema({
  proceso: {
    tipoProceso: {
      type: String,
      enum: procesosEnum,
    },
    cantidadReservada: {
      type: Number,
      default: 0,
    },
  }

});

// Subesquema para el detalle de stock
const StockDetalleSchema = new Schema({
  empresa: {
    empresaRef: {
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
  stockEmpresa: {
    type: Number,
    default: 0,
  },
  reposicionEmpresa: {
    type: Number,
    default: 0,
  },
  ingresoEmpresa: {
    type: Number,
    default: 0,
  },
  transferenciaEmpresa: {
    type: Number,
    default: 0,
  },
  salidaEmpresa: {
    type: Number,
    default: 0,
  },
  reservaTotalEmpresa: {
    type: Number,
    default: 0,
  },
  stockFisicoEmpresa: {
    type: Number,
    default: 0,
  },

  reservasEmpresa: [ReservaProcesoSchema], // Array de procesos de reserva
});

const ProductoSchema = new Schema({
    nroProducto:{
      type: Number,
    },
    esProducto:{
      type: Boolean,
    },
    nombreProducto:{
        type: String,
        required: [true, "Nombre es Obligarorio"]
    },
    sku:{
        type: String,
        unique: true,
        required: [true, "SKU es Obligatorio"]
    },
    marca: {
      marcaRef:{
        type: Schema.Types.ObjectId,
        required: [true, "Marca es Obligatoria"],
        ref: 'Marca', 
      },
      nombreMarca: {
        type: String,
        required: [true, "Marca es Obligatoria"],
      },
      
    },
    modelo:{
      type: String,
      unique: true,
      required: [true, "Marca es Obligatoria"],
    },
    categoria:{
      categoriaRef:{
        type: Schema.Types.ObjectId,
        required: [true, "Categoria es Obligatoria"],
        ref: 'Categoria', 
      },
      nombreCategoria: {
        type: String,
        required: [true, "Categoria es Obligatoria"],
      },
      imagenUrl: {
        type: String,
      },
    },
    desc:{
      type: String,
    },
    codigo:{
      type: String,
    },
    barCode:{
        type: String,
    },
    anio:{
      type: Number,
    },
    garantia:{
      type: Number,
    },
    stockDetalle: [StockDetalleSchema], // Uso del subesquema actualizado Detalle x Empresa
    cantidadIngresos:{
      type: Number,
      default: 0,
    },
    cantidadSalidas:{
      type: Number,
      default: 0,
    },
    stock:{
      type: Number,
      default: 0,
    },
    stockReservado:{
      type: Number,
      default: 0,
    },
    stockMinimo:{
      type: Number,
      default: 0,
    },
    reposicion:{
      type: Number,
      default: 0,
    },
    stockFisico:{
      type: Number,
      default: 0,
    },
    especificaciones: [
      {
        especificacionRef: {
          type: Schema.Types.ObjectId,
          ref: "Especificacion"
        },
        nombre: {
          type: String
        },
        valor: {
          type: String
        }
      }
    ],
    categoriaRelacionadas:[
      {
        categoriaRef:{
          type: Schema.Types.ObjectId,
          ref: 'Categoria', 
        },
        nombre: {
        type: String,
        },
        imagenUrl: {
          type: String,
          }
      },

    ],
    usaSerie:{
        type: Boolean,
    },
    esCombo:{
        type: Boolean,
    },
    productosCombo: [
      {
        productoRef:{
          type: Schema.Types.ObjectId,
          ref: 'Producto', 
        },
        nombreProducto: {
          type: String,
        },
        sku: {
          type: String,
        },
        nombreMarca: {
          type: String,
        },
        modelo: {
          type: String,
        },
        esCombo:{
          type: Boolean,
        },
        esProducto:{
          type: Boolean,
        },
        imagenUrl: {
          type: String,
        },
      },
    ],
    imagenUrl:{
      type: String,
    },
    // imagenesRelacionadas: [
    //   {
    //     alias: {
    //       type: String,
    //     },
    //     imagenUrl:{
    //       type: String,
    //     },
    //   }
    // ],
    skuEquivalentes: [
      {
        personaRef:{
          type: Schema.Types.ObjectId,
          ref: 'Persona', 
        },
        razonSocial: {
          type: String,
        },
        numeroDoc: {
          type: String,
        },
        equivalente: {
          type: String,
        },
      },
    ],
    activo: {
      type: Boolean,
      default: true, // Valor por defecto
    },

//}, { timestamps: true })
}, { 
  timestamps: { 
      currentTime: () => retornaFechaHoraSistema() // Ajuste para zona horaria GMT-5 (UTC-5)
  } 
})

//const Producto = models.Producto || model('Producto', ProductoSchema)
const Producto = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);

export default Producto