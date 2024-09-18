// import { Schema, model, models } from "mongoose";


// const rolesEnum = ["ADMIN", "USER"]

// const UsuarioSchema = new Schema({
    
//     user:{
//       type: String,
//       unique: true,
//       required: [true, "name es Obligarorio"]
//     },
//     password:{
//       type: String,
//       required: [true, "password es Obligarorio"]
//     },
//     nombre:{
//         type: String,
//     },
//     apellidoPaterno:{
//         type: String,
//     },
//     apellidoMaterno:{
//       type: String,
//     },
//     email:{
//         type: String,
//         unique: true,
//         required: [true, "password es Obligarorio"]
//     },
//     role: {
//       type: String,
//       enum: rolesEnum,
//       default: "USER" // Valor por defecto
//     },
//     permisos: [
//     ],
//     activo: {
//       type: Boolean,
//       default: true, // Valor por defecto
//     },
  
// }, { timestamps: true })

// UsuarioSchema.index({ email: 1, usuario: 1 }, { unique: true });
// const Usuario = models.Usuario || model('Usuario', UsuarioSchema)

// export default Usuario



import { retornaFechaHoraSistema } from "@/utils/core/utils";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const rolesEnum = ["ADMIN", "USER"];

const UsuarioSchema = new Schema({
  user: {
    type: String,
    unique: true,
    required: [true, "El nombre de usuario es obligatorio"]
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"]
  },
  nombre: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  email: {
    type: String,
    unique: true,
    required: [true, "El correo electrónico es obligatorio"]
  },
  role: {
    type: String,
    enum: rolesEnum,
    default: "USER" // Valor por defecto
  },
  permisos: [String],
  activo: {
    type: Boolean,
    default: true // Valor por defecto
  }
}, { 
  timestamps: { 
      currentTime: () => retornaFechaHoraSistema() // Ajuste para zona horaria GMT-5 (UTC-5)
  } 
})

UsuarioSchema.index({ email: 1, usuario: 1 }, { unique: true });

// Define el modelo Usuario
//const Usuario = model('Usuario', UsuarioSchema);
//const Usuario = mongoose.model('Usuario', UsuarioSchema) || models.Usuario
//export default  Usuario

//module.exports = mongoose.model('Usuario', UsuarioSchema) 
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);
export default  Usuario
