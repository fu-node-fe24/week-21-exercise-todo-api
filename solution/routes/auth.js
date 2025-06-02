import { Router } from 'express';
import { getUser, registerUser } from '../services/users.js';
import { createNewUser } from '../utils/index.js';
import { validateAuthBody } from '../middlewares/validation.js';

const router = Router();

router.get('/logout', (req, res) => {
    if(global.user) {
        let user = global.user;
        global.user = null;
        res.json({
            success : true,
            message : `User ${user.username} logged out successfully`
        })
    } else {
        res.json({
            success : false,
            message : 'No user to log out'
        });
    }
});

router.post('/login', validateAuthBody, async (req, res) => {
    const user = await getUser(req.body.username);
    if(user) {
        if(user.password === req.body.password) {
            global.user = user;
            res.json({
                success : true,
                message : `User ${user.username} logged in successfully`
            });
        } else {
            res.status(400).json({
                success : false,
                message : `Authentication failed`
            });
        }
    } else {
        res.status(400).json({
            success : false,
            message : 'User does not exist'
        });
    }
});

router.post('/register', validateAuthBody, async (req, res) => {   
    const result = await registerUser(createNewUser(req.body));
    res.json({
        success : true,
        user : result
    });
});

export default router;