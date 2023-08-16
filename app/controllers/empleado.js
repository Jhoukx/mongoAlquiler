import { con } from '../../config/connection/atlas.js';

const db = await con();;
const empleado = await db.collection('Empleado');

const cargoEmployee = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const cargo  = req.query.Cargo 

    let result = await empleado.find({ Cargo: cargo }, { _id: 0 }).toArray()
    res.send(result);
}

export default cargoEmployee;