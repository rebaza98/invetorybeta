import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const UbigeoSchema = new Schema({

  ubigeoInei:{
    type: String,
    unique: true,
    required: [true, "Ubigeo es Obligarorio"]
  },
  ubigeoReniec:{
    type: String,
    unique: true,
    required: [true, "Ubigeo es Obligarorio"]
  },
  departamentoInei:{
    type: String,
  },
  departamento:{
    type: String,
  },
  provinciaInei:{
    type: String,
  },
  provincia:{
    type: String,
  },
  distrito:{
    type: String,
  },
  region:{
    type: String,
  },
  macroregionInei:{
    type: String,
  },
  macroregionMinsa:{
    type: String,
  },
  iso_3166_2:{
    type: String,
  },
  fips:{
    type: String,
  },
  superficie:{
    type: String,
  },
  altitud:{
    type: String,
  },
  latitud:{
    type: String,
  },
  longitud:{
    type: String,
  },

})
//PersonaSchema.index({ tipoDoc: 1, numeroDoc: 1 }, { unique: true });
//const Ubigeo = models.Ubigeo || model('Ubigeo', UbigeoSchema)
const Ubigeo = mongoose.models.Ubigeo || mongoose.model('Ubigeo', UbigeoSchema);

export default Ubigeo

