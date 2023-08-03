import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config('../');
export async function con() {
    try {
        const uri = `mongodb+srv://root:${process.env.ATLAS_PASSWORD}@automoviles.swurmvg.mongodb.net/${process.env.ATLAS_DB}`
        const options ={
            useNewUrlParser:true,
            useUnifiedTopology:true
        };
        const client = await MongoClient.connect(uri, options);
        return client.db();
    } catch (error) {
        return {status:500, message:error.message}
    }
}