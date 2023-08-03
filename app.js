import dotenv from 'dotenv';
import express  from 'express';
import appCampus from './routes/campus.routes.js';
dotenv.config();
const app = express();


app.use(express.json());

app.use('/campus',appCampus);
const config = JSON.parse(process.env.SERVER);

app.listen(config,()=>{
console.log(`Server is running on http://${config.host}:${config.port}`);
});