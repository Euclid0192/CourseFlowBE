import { MongoClient} from "mongodb";
import mongoose from "mongoose";

const connectToMongo = async () => {
    try {
        // const client: MongoClient = new MongoClient(process.env.DB_URL!)

        // await client.connect()

        await mongoose.connect(process.env.DB_URL!)

        console.log("Sucessfully connect to MongoDB...")

    } catch (err) {
        console.log(err)   
    }
}

export default connectToMongo