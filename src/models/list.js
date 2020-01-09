import db  from '../database';
import Sequelize from 'sequelize';

const List = db.define('lists',{
    user_id: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = List;