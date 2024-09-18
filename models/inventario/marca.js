import { retornaFechaHoraSistema } from "@/utils/core/utils";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const MarcaSchema = new Schema({
    nombreMarca:{
        type: String,
        required: [true, "Nombre es Obligarorio"],
        unique: true,
    },
    pais:{
        type: String
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

//const Marca = models.Marca || model('Marca', MarcaSchema)
const Marca = mongoose.models.Marca || mongoose.model('Marca', MarcaSchema);

export default Marca