import express from 'express';
import db from '../database';
import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {

    const { credentials } = req.body;

    console.log(credentials);

    User.findOne({where: {email: credentials.email}}).then(async  user => {

        if (!user) {

            res.status(400).json({errors: {global: 'Something wrong happened!'}});

        } else if (!await user.validPassword(credentials.password)) {

            res.status(400).json({errors: {global: 'Invalid credentials'}});

        } else {

            res.json({ user: user.toAuthJSON() });

        }
        
    }).catch(err=> console.log(err));

    
});

export default router;