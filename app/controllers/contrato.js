import { con } from '../../config/connection/atlas.js';

let db = await con();
let contrato = await db.collection('Contrato');

const availableAutomovil = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    let result = await contrato.aggregate([
        {
            $lookup: {
                from: "Automovil",
                localField: "ID_Automovil",
                foreignField: "ID",
                as: "AutomovilesDeAlquiler"
            }
        },
        {
            $match: {
                Estado: "Disponible"
            }
        },
        {
            $project: {
                _id: 0,
                "AutomovilesDeAlquiler._id": 0
            }
        }
    ]).toArray();
    res.send(result);
}

export { availableAutomovil };