import axios from "axios"

export const retornaPersonaPorId = async (id) => {
    const response = await axios.get(`/api/core/persona/buscar/${id}`)
    const data = response.data
    return data
}




export const formEspecInit = {
    _id: null,
    nombreEspecificacion: '',
    desc: '',
    activo: true,
}


export const formMarcaInit = {
    _id: null,
    nombreMarca: '',
    pais: '',
    desc: '',
    activo: true,
}

export const formCategoriaInit = {
    _id: null,
    nombreCategoria: '',
    desc: '',
    especs: [],
    imagenUrl:'',
    activo: true,
}

export const formProductoInit = {
    _id: null,
    esProducto: true,
    nombreProducto: '',
    sku: '',
    modelo: '',
    marca: {
        marcaRef: '',
        nombreMarca: '',
    },
    categoria: {
        categoriaRef: '',
        nombreCategoria: '',
    },
    desc: '',
    codigo: '',
    barCode: '',
    garantia: 0,
    anio: 0,
    stock: 0,
    stockMinimo: 0,
    especificaciones: [],
    categoriaRelacionadas: [],
    usaSerie: true,
    esCombo: false,
    productosCombo: [],
    imagenUrl: '',
    imagenesRelacionadas: [],
    skuEquivalentes: [],
    activo: true,
}

export const formMovAlmacenInit = {
    _id: "",
    almacen: {
        almacenRef: '',
        alias: "",
    },
    empresa: {
        empresaRef: '',
        nombreEmpresa: "",
        nroDocEmpresa: "",
    },
    usuario: "",
    proceso: [],
    alias: "",
    obs: ""
 
    
}

export const entradaSalidaValor = {
    "ECP": true,
    "ERF": true,
    "SDC": false,
    "SRF": false
  }

export const categoriaImagenFolderUpload = "categoria/imagenes"

export const productoImagenFolderUpload = "producto/imagenes"


export const areEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};





