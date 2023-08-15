import { Router } from "express";
import { limitGet } from '../middleware/limit.js';
import { availableAutomovil } from "../controllers/contrato.js";
const appContrato = Router();

appContrato.get('/', limitGet(),availableAutomovil);

export default appContrato;