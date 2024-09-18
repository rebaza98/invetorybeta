import { connectToDB } from "@/utils/databse"
import Producto from "@/models/inventario/producto"

import aws from 'aws-sdk'


export const POST = async (request) => {
    try {
        const data = await request.formData();
        const file = data.get('file');
        const productoId = data.get('productoId');
        const awsKey = data.get('awsKey');

        

        if (!file) {
            return new Response("Failed to upload File to S3", { status: 500 })
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        //S3
        const s3 = new aws.S3({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region: process.env.REGION,
        });
    
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: awsKey,
            Body: buffer,
        };

        //  // Verifica si el objeto ya existe en S3
        // const headObjectParams = {
        //     Bucket: process.env.BUCKET_NAME,
        //     Key: awsKey,
        // };

        // try {
        //     await s3.headObject(headObjectParams).promise();
        //     // Si llega aquí, significa que el objeto existe, por lo que lo eliminamos antes de cargar el nuevo.
        //     await s3.deleteObject(headObjectParams).promise();
        // } catch (error) {
        //     // Ignora el error si el objeto no existe, ya que eso es normal si es la primera carga.
        // }

        const response =  await s3.upload(params).promise();
        const imagenUrl = response.Location;
        console.log('File uploaded successfully!', imagenUrl);

    
        await connectToDB()

        const existingProducto = await Producto.findById(productoId)

        if(!existingProducto) return new Response("Producto not found", {status:404})
        
        existingProducto.imagenUrl = imagenUrl

        await existingProducto.save()
        console.log("SE actualizo URL de Producto")
        return new Response(JSON.stringify(response), { status: 201 })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }
  
  
  }
  

