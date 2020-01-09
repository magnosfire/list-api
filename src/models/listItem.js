import db  from '../database';
import Sequelize from 'sequelize';

const ListItem = db.define('list_items',{
    title: {
        type: Sequelize.STRING
    },
    check: {
        type: Sequelize.BOOLEAN
    },
    list_id: {
        type: Sequelize.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = ListItem;