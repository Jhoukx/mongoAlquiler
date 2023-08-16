import { Router } from "express";
import { limitGet } from '../middleware/limit.js';
import { activeAlquiler, availableAutomovil } from "../controllers/contrato.js";
const appContrato = Router();

appContrato.get('/disponible', limitGet(),availableAutomovil);
appContrato.get('/alquiler/activo', limitGet(),activeAlquiler);
export default appContrato;