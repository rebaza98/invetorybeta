
// Obtener la fecha y hora actual

// export const retornaFechaSistema = () => {
//     return new Date().toISOString().substring(0, 10)
// }

export const retornaFechaHoraSistema = () => {
    // Obtener la fecha y hora actual en UTC
    const fechaActualUTC = new Date();

    // Ajustar la fecha y hora a la zona horaria GMT-5 (UTC-5)
    const offsetHorario = -5 * 60; // -5 horas en minutos
    const fechaHoraGMT5 = new Date(fechaActualUTC.getTime() + offsetHorario * 60000);

    // Obtener la fecha y hora en formato ISO
    const fechaHoraISO = fechaHoraGMT5.toISOString();

    return fechaHoraISO;
}

export const retornaFechaSistema = () => {
    // Obtener la fecha y hora actual en UTC
    const fechaActualUTC = new Date();

    // Ajustar la fecha y hora a la zona horaria GMT-5 (UTC-5)
    const offsetHorario = -5 * 60; // -5 horas en minutos
    const fechaHoraGMT5 = new Date(fechaActualUTC.getTime() + offsetHorario * 60000);

    // Obtener la fecha en formato ISO sin la hora
    const fechaISO = fechaHoraGMT5.toISOString().substring(0, 10);

    return fechaISO;
}

export const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString('en-US', {timeZone: 'UTC'})
    return fechaFormateada

}


export const fetchEmpresaSeleccionada = async (numeroDoc) => {
    const response = await fetch(`/api/core/empresa/buscar/${numeroDoc}`)
    const data = await response.json()  
    return ({
        empresaRef: data._id,
        nombreEmpresa: data.nombreComercial,
        nroDocEmpresa: data.numeroDoc
    })
}

export const fetchAlmacenSeleccionado = async (id) => {
    const response = await fetch(`/api/core/almacen/buscar/${id}`)
    const data = await response.json()  
    return ({
        almacenRef: data._id,
        alias: data.alias,
    })
}


export const verificaFechaRetornaStringVacio = (fecha) => {
    if (fecha != ""){
        return new Date(fecha).toISOString().substring(0, 10)
    }else{
        //return new Date().toISOString().substring(0, 10)
        return retornaFechaSistema(z)
    }
}


export const validaCantidadMayorOoString = (value) => {
    //VALIDA SI SE USO VALOR MAYOR IGUAL A CERO o STRING VACIO, retorna 0 si no es valido
    return !isNaN(parseFloat(value)) ? Math.abs(parseFloat(value)) : 0;
}

export const retornaCantidadItemsProductosOc = (productos) => {
    let cantidadItems = 0
    for(let i = 0; i < productos.length; i++){
        cantidadItems += productos[i].cantidad
    }
    return cantidadItems

}



export const procesosEnum = ["ECP", "ERF", "MEA", "MSA", "VNC", "VEC", "DNC", "DEC", "PDC", "SRF"];


export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }