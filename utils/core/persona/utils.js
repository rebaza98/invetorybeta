import axios from "axios"

export const retornaPersonaPorId = async (id) => {
    const response = await axios.get(`/api/core/persona/buscar/${id}`)
    const data = response.data
    return data
}



export const formPersonaInit = {
    _id: null,
    razonSocial: '',
    representante: '',
    numeroDoc: '',
    docId: {
        codigo: '',
        nombre: '',
        
    },
    email: '',
    ubigeo: {
        ubigeoRef: null,
        codigoInei: '',
        codigoReniec: '',
        ubicacion: '',
        desc: ''
    },
    telefono: [],
    direccion: [],
    cuentas: [],
    imagenUrl: '',
    mkp:false,
    activo:true,
    
}

export const personaLogoFolderUpload = "persona/imagenes/logo"


export const formUsuarioInit = {
    
    _id: null,
    user: null, 
    password: null,
    nombre: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    email: null,
    role: "USER",
    permisos: [],
    
}

export const usuarioForoFolderUpload = "usuario/imagenes/foto"
    

// //USAR ESTA FUNCNION EN BLOQUES CON CONEXION A BD
// export const actualizaContador = async (modelo, campoColeccion, campoModelo) => {
//     const contador = await modelo.findOneAndUpdate({}, { $inc: { campoColeccion: 1 } }, { new: true });
//     let retorno = null
//     if (!contador) {
//     // Si no existe un documento de Contadores, créalo con valores iniciales
//         const contador = await modelo.create({});
//         campoModelo = 1;
//         contador[campoColeccion] = campoModelo
//         contador.save()
//         console.log("DEBIO RETORNAR If = ", campoModelo)
//         retorno = campoModelo
    
//     } else {
//     //nroPersona = contador.contadorPersona;
//     console.log("DEBIO RETORNAR ELSE = ", contador[campoColeccion])
//         retorno = contador[campoColeccion]
//     }

//     console.log("RETORNO EN UTILS = ", retorno)
//     return retorno
// }