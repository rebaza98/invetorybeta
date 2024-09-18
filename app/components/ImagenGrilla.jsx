import Image from 'next/image'
import React from 'react'

const ImagenGrilla = ({ url }) => {
    return (
        <>
            <Image
                src={url ? url : '/images/perfil/user-1.jpg'}
                alt="Descripción de la imagen"
                className="max-w-full max-h-14 bg-gray-300 rounded"
                width={56}
                height={56}
                style={{
                    objectFit: "contain", width: "auto"
                }
                }
            />
        </>
    )
}

export default ImagenGrilla
