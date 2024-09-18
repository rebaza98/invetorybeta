import { PhotoIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

const ItemProductoStock = ({producto}) => {
    return (
        <>
            <div className="flex w-full items-center justify-between space-x-6 p-4">

                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-gray-900">{producto.nombreProducto}</h3>
                    </div>
                    <p className="mt-1 truncate text-xs text-gray-500"><strong>SKU:</strong>  {producto.sku}</p>
                    <p className="mt-1 truncate text-xs text-gray-500"><strong>MODELO:</strong>  {producto.modelo}</p>
                    <p className="mt-1 truncate text-xs text-gray-500"><strong>MARCA:</strong>  {producto.marca.nombreMarca}</p>
                </div>

                <div className="max-w-full max-h-14">
                    {producto.imagenUrl ? (
                        <Image
                            src={producto.imagenUrl}
                            alt="Descripción de la imagen"
                            className="max-w-full max-h-14 bg-gray-300 rounded"
                            key={producto._id}
                            width={56}
                            height={56}
                            style={{
                                objectFit: "contain"
                            }}
                        />
                    ) : (
                        <PhotoIcon className="h-14 w-14 text-gray-300" aria-hidden="true" />
                    )}

                </div>
            </div>
            <div className="flex justify-between p-2"  >
                <p className="mt-1 truncate text-xs text-red-500"><strong>REPOSICION:</strong>  {producto.reposicion}</p>
                <p className="mt-1 truncate text-xs text-gray-500"><strong>STOCK:</strong>  {producto.stock}</p>
            </div>
        </>



    )
}

export default ItemProductoStock
