import { con } from '../../config/connection/atlas.js';

const db = await con();
const sucursal = await db.collection('Sucursal');

const allSucursal = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    let result = await sucursal.find({}, { _id: 0 }).toArray();
    res.send(result);
}

export { allSucursal}