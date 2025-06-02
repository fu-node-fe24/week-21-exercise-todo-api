import { Router } from 'express';
import { getRandomKey } from '../services/keys.js';

const router = Router();

router.get('/', async (req, res) => {
    const key = await getRandomKey();
    res.json({
        success : true,
        key : key
    });
});

export default router;