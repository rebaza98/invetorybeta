import { connectToDB } from "@/utils/databse"
import Categoria from "@/models/inventario/categoria"
import aws from 'aws-sdk'

export const POST = async (request) => {
    try {
        const data = await request.formData();
        const file = data.get('file');
        const categoriaId = data.get('categoriaId');
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

        const existingCategoria = await Categoria.findById(categoriaId)

        if(!existingCategoria) return new Response("Categoria not found", {status:404})
        
        existingCategoria.imagenUrl = imagenUrl

        await existingCategoria.save()
        console.log("SE actualizo URL de Categoria")
        return new Response(JSON.stringify(response), { status: 201 })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }
  
  
  }
  


//   export const POST = async (req, res) => {
//     const { razonSocial, representante, numeroDoc, docId, email, ubigeo, telefono, direccion, cuentas, imagenUrl} = await req.json()
    
//     try {
//         await connectToDB()
//         const newPersona = new Persona({ razonSocial, representante, numeroDoc, docId, email, ubigeo, telefono, direccion, cuentas, imagenUrl });
//         const savedPersona = await newPersona.save(); // Guardar y obtener el objeto guardado
        
//         return new Response(JSON.stringify(savedPersona), { status: 201 })
//     } catch (error) {
//         return new Response("Failed to craete new Persona", { status: 500 })
//     }

// }