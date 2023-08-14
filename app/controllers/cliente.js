import { con } from '../../config/connection/atlas.js';

const allclients = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    
}