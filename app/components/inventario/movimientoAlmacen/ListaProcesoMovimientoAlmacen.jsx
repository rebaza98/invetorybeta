import DetalleProcesoEntrada from "./DetalleProcesoEntrada";
import DetalleProcesoSalida from "./DetalleProcesoSalida";
import CabeceraProcesoOC from "./cabecera/CabeceraProcesoOC";
import CabeceraProcesoRE from "./cabecera/CabeceraProcesoRE";
import CabeceraProcesoRS from "./cabecera/CabeceraProcesoRS";


const ListaProcesoMovimientoAlmacen = ({procesosSeleccionados, formValues, setFormValues, tipoMovimiento}) => {

    const handleRemoverProceso = (elemento) => {
        // Filtra todos los elementos excepto el que deseas eliminar
        const nuevosProcesos = formValues.proceso.filter((elegida) => elegida.idProceso !== elemento.idProceso);
        
        setFormValues({
        ...formValues,
        proceso: nuevosProcesos,
        });
    }
    


    return (
        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {procesosSeleccionados.map((proceso, ocIdx) => (
                <li key={proceso.idProceso} className="py-6 sm:py-10">
                    {tipoMovimiento == "ECP" && (
                        <CabeceraProcesoOC proceso={proceso} remueveProceso={handleRemoverProceso} />
                    )}
                    {tipoMovimiento == "ERF" && (
                        <CabeceraProcesoRE proceso={proceso} remueveProceso={handleRemoverProceso} />
                    )}
                    {tipoMovimiento == "SRF" && (
                        <CabeceraProcesoRS proceso={proceso} remueveProceso={handleRemoverProceso} />
                    )}
                    
                    
                    {/* <ItemProducto product={product} productosSeleccionados={productosSeleccionados} formValues={formValues} setFormValues={setFormValues} calcularTotal={calcularTotal} /> */}
                        {(tipoMovimiento == "ECP" || tipoMovimiento == "ERF") && (
                            <DetalleProcesoEntrada proceso={proceso} formValues={formValues} setFormValues={setFormValues}  />
                        )}
                        {(tipoMovimiento == "SRF" || tipoMovimiento == "SRF") && (
                            <DetalleProcesoSalida proceso={proceso} formValues={formValues} setFormValues={setFormValues}  />
                        )}
                        
                    
                </li>
            ))}
        </ul>
    )
}

export default ListaProcesoMovimientoAlmacen
