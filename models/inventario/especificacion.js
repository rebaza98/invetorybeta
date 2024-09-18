import { retornaFechaHoraSistema } from "@/utils/core/utils";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const EspecificacionSchema = new Schema({
    nombreEspecificacion:{
        type: String,
        unique: true,
        required: [true, "Nombre es Obligarorio"]
    },
    desc:{
        type: String
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

//const Especificacion = models.Especificacion || model('Especificacion', EspecificacionSchema)
const Especificacion = mongoose.models.Especificacion || mongoose.model('Especificacion', EspecificacionSchema);

export default Especificacion