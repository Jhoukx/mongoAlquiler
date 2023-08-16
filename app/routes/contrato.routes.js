import { Router } from "express";
import { limitGet } from '../middleware/limit.js';
import { activeAlquiler, availableAutomovil, idAlquiler, pendingClienteYAutomovil } from "../controllers/contrato.js";
const appContrato = Router();

appContrato.get('/disponible', limitGet(),availableAutomovil);
appContrato.get('/alquiler', limitGet(), activeAlquiler);
appContrato.get('/pendiente', limitGet(), pendingClienteYAutomovil);
appContrato.get('/alquiler/:id', limitGet(), idAlquiler);
export default appContrato;