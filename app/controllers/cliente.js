import { con } from '../../config/connection/atlas.js';

let db = await con();
let cliente = db.collection("Cliente");

const allclients = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    let result = await cliente.find({}).toArray();
    res.send(result);
}

export default allclients;