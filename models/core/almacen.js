import { retornaFechaHoraSistema } from "@/utils/core/utils";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const AlmacenSchema = new Schema({
    alias:{
        type: String,
        unique: true,
    },
    encargado:{
        type: String,
    },
    email:{
        type: String,
    },
    prioridad: {
        type: Number,
        default: 1
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
    
    telefono: {
      type: String,
    },
    
    direccion: {
      type: String,
    },
    // totalItems:{
    //     type:Number,
    //     default: 0
    // },
    // totalItemsFisico:{
    //     type:Number,
    //     default: 0
    // },
    // totalValoracion:{
    //     type:Number,
    //     default: 0.00
    // },
    // totalValoracionFisico:{
    //     type:Number,
    //     default: 0.00
    // },
    
    activo: {
      type: Boolean,
      default: true, // Valor por defecto
    },
  
}, { 
    timestamps: { 
        currentTime: () => retornaFechaHoraSistema() // Ajuste para zona horaria GMT-5 (UTC-5)
    } 
})

//AlmacenSchema.index({ docId: 1, numeroDoc: 1 }, { unique: true });
//const Persona = models.Persona || mongoose.model('Persona', PersonaSchema)
const Almacen = mongoose.models.Almacen || mongoose.model('Almacen', AlmacenSchema);

export default Almacen

