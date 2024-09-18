import ItemProducto from "./ItemProducto"

const ListaItemProducto = ({productosSeleccionados, formValues, setFormValues, calcularTotal}) => {


    return (
        <ul role="list" className="divide-y item divide-gray-200 border-b border-t border-gray-200">
            {productosSeleccionados.map((product, productIdx) => (
                <li key={product.productoId} className="flex py-6 sm:py-10">
                    <ItemProducto product={product} productosSeleccionados={productosSeleccionados} formValues={formValues} setFormValues={setFormValues} calcularTotal={calcularTotal} />
                </li>
            ))}
        </ul>
    )
}

export default ListaItemProducto
