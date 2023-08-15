import { Router } from 'express';
import { limitGet } from '../middleware/limit.js';
import allclients from '../controllers/cliente.js';

const appCliente = Router();


appCliente.get('/', limitGet(), allclients);

export default appCliente;