import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import auth from './routes/auth';
import users from './routes/users';
import lists from './routes/lists';

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/lists', lists);

app.listen(8080, () => {
    console.log('Running on localhost:8080');
});