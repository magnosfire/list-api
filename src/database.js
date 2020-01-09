import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

module.exports = new Sequelize({
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    host: process.env.MYSQL_URL,
    dialect: 'mysql',
    pool: {
        max: 5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
});
