import dotenv from 'dotenv';
import express from 'express';
import appCliente from './app/routes/cliente.routes.js';
import appContrato from './app/routes/contrato.routes.js';
import appEmpleado from './app/routes/empleado.routes.js';
import appSucursal from './app/routes/sucursal.routes.js';
dotenv.config();
const app = express();


app.use(express.json());

app.use('/cliente', appCliente);
app.use('/contrato', appContrato);
app.use('/empleado', appEmpleado);
app.use('/sucursal', appSucursal);
const config = JSON.parse(process.env.SERVER);

app.listen(config, () => {
    console.log(`Server is running on http://${config.host}:${config.port}`);
});