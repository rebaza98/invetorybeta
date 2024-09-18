import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    razonSocial: '',
    representante: '',
    numeroDoc:'',
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
    cuentas:[],
    imagenURL: "",

}

export const personaSlice = createSlice({
    name : 'personaValores',
    initialState,
    reducers:{
        actualizarDatosGenerales: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
            
        },
        actualizarEstadoPersonaDocId: (state, action) => {
            return {
                ...state,
                docId: {
                ...state.docId,
                ...action.payload,
                },
            };
        },
        actualizarEstadoPersonaUbigeo: (state, action) => {
            
            return {
                ...state,
                ubigeo: {
                ...state.ubigeo,
                ...action.payload,
                },
            };
        },
        actualizarEstadoPersonaDireccionInsertar: (state, action) => {
            state.direccion = [...state.direccion, action.payload]
        },
        actualizarEstadoPersonaDireccionUpdate: (state, action) => {
            return {
                ...state,
                direccion: action.payload
            };
        },
        actualizarEstadoPersonaTelefonoInsertar: (state, action) => {
            state.telefono = [...state.telefono, action.payload]
        },
        actualizarEstadoPersonaTelefonoUpdate: (state, action) => {
            return {
                ...state,
                telefono: action.payload
            };
        },
        actualizarEstadoPersonaCuentasInsertar: (state, action) => {
            state.cuentas = [...state.cuentas, action.payload]
        },
        actualizarEstadoPersonaCuentasUpdate: (state, action) => {
            return {
                ...state,
                cuentas: action.payload
            };
        },
        
        actualizarEstadoImagenURL: (state, action) => {
            state.imagenURL = action.payload 
        },
        resetEstadoPersona: () => {
            return initialState
        },
        
        
    }
})

export const { 
    actualizarDatosGenerales, 
    actualizarEstadoPersonaDocId, 
    actualizarEstadoPersonaUbigeo, 
    actualizarEstadoPersonaDireccionInsertar,
    actualizarEstadoPersonaDireccionUpdate, 
    actualizarEstadoPersonaTelefonoInsertar, 
    actualizarEstadoPersonaTelefonoUpdate, 
    actualizarEstadoPersonaCuentasInsertar,
    actualizarEstadoPersonaCuentasUpdate,
    resetEstadoPersona
 } = personaSlice.actions