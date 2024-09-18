import { retornaFechaHoraSistema } from "@/utils/core/utils";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const ContadorSchema = new Schema({
    contadorPersona:{
      type: Number,
      default: 0
    },  
    contadorProducto:{
        type: Number,
        default: 0
    },
    contadorCategoria:{
      type: Number,
      default: 0
    },
    contadorEspecificacion:{
      type: Number,
      default: 0
    },
    contadorMarca:{
      type: Number,
      default: 0
    },
    contadorOrdenCompra:{
      type: Number,
      default: 0
    },
    contadorOrdenVentaRegular:{
      type: Number,
      default: 0
    },
    contadorOrdenVentaMKP:{
      type: Number,
      default: 0
    },
    contadorAlmacen:{
      type: Number,
      default: 0
    },
    contadorMovimientoAlmacen:{
      type: Number,
      default: 0
    },
    contadorItemInventario:{
      type: Number,
      default: 0
    },
    contadorRegulacionEntrada:{
      type: Number,
      default: 0
    },
    contadorRegulacionSalida:{
      type: Number,
      default: 0
    },
    activo: {
      type: Boolean,
      default: true, // Valor por defecto
    },
    
}, { 
    timestamps: { 
        currentTime: () => retornaFechaHoraSistema () // Ajuste para zona horaria GMT-5 (UTC-5)
    } 
})

//const Contador = models.Contador || model('Contador', ContadorSchema)
const Contador = mongoose.models.Contador || mongoose.model('Contador', ContadorSchema);
export default Contador

// import { Schema, model, models } from "mongoose";

// const ContadorSchema = new Schema({
//     contadorPersona:{
//       type: Number,
//     },  
//     contadorProducto:{
//         type: Number,
//     },
//     contadorCategoria:{
//       type: Number,
//     },
//     contadorEspecificacion:{
//       type: Number,
//     },
//     contadorMarca:{
//       type: Number,
//     },
//     contadorOrdenCompra:{
//       type: Number,
//     },
//     contadorOrdenVenta:{
//       type: Number,
//     },

// }, { timestamps: true })

// const Contador = model.Contador || model("Contador", ContadorSchema)

// export default Contador

