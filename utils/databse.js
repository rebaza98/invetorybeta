import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log("MONGO DB IS CONNECTED")
        return
    } 

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"inventario24",
            //useNewUrlParser: true,
            //useUnifiedTopology: true,

        })
        isConnected = true
        console.log("MONGO DB IS CONNECTED")
    } catch (error) {
        console.log("ERROR = ", error)
    }

}