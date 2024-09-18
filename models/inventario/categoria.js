import { retornaFechaHoraSistema } from "@/utils/core/utils";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const CategoriaSchema = new Schema({
    nroCategoria:{
      type: Number,
    },
    nombreCategoria:{
        type: String,
        unique: true,
        required: [true, "Nombre es Obligarorio"]
    },
    desc:{
        type: String
    },
    especs: [
        {
          especRef:{
            type: Schema.Types.ObjectId,
            ref: 'Especificacion', 
          },
          nombreEspec: {
            type: String,
          },
          desc: {
            type: String,
          },
        },
      ],
    imagenUrl: {
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

//const Categoria = models.Categoria || model('Categoria', CategoriaSchema)
const Categoria = mongoose.models.Categoria || mongoose.model('Categoria', CategoriaSchema);


export default Categoria