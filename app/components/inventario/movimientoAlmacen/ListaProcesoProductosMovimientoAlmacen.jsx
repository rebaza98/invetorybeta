import ItemProceso from "./ItemProceso"

const ListaProcesoProductosMovimientoAlmacen = ({proceso, formValues, setFormValues, calcularTotal}) => {


    return (
        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {proceso.productos.map((producto, ocIdx) => (
                <li key={producto.productoRef} className="flex py-6 sm:py-10">
                    <p>
                        {producto.productoRef}    
                    </p>   
                    {/* <ItemProducto product={product} productosSeleccionados={productosSeleccionados} formValues={formValues} setFormValues={setFormValues} calcularTotal={calcularTotal} /> */}
                    <ItemProceso producto={producto}  />
                </li>
            ))}
        </ul>
    )
}

export default ListaProcesoProductosMovimientoAlmacen
