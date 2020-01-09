import express from 'express';
import User from '../models/user';
import parseErrors from '../utils/parseErrors';

 const router = express.Router();

 router.post('/', (req,res) => {

    const { email, password, username } = req.body.user;

    User.create({email: email, password: password, username: username}).then(result =>{

      res.json({user: result.toAuthJSON()});
    }).catch(err => {

      const { errors } = err;


      res.status(400).json({ errors: 'TESTE' });
    });


 });

 export default router;