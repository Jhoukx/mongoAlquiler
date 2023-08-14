import dotenv from 'dotenv';
import express from 'express';
import appCampus from './app/routes/campus.routes.js';
import appCliente from './app/routes/cliente.routes.js';
import appContrato from './app/routes/contrato.routes.js';
dotenv.config();
const app = express();


app.use(express.json());

app.use('/cliente', appCliente);
app.use('/contrato', appContrato);
const config = JSON.parse(process.env.SERVER);

app.listen(config, () => {
    console.log(`Server is running on http://${config.host}:${config.port}`);
});