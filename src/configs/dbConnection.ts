import { MongoClient} from "mongodb";

const connectToMongo = async () => {
    try {
        const client: MongoClient = new MongoClient(process.env.DB_URL!)

        await client.connect()

        console.log("Sucessfully connect to MongoDB...")

    } catch (err) {
        console.log(err)   
    }
}

export default connectToMongo