import db  from '../database';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = db.define('users',{
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});

function encryptPasswordIfChanged(user) {
    
    if(typeof user.attributes.password !== 'undefined' && user.attributes.password) {

        user.attributes.password = encryptPassword(user.attributes.password);

    }

   
}

function encryptPasswordForNewAccount(user) {

    if (user.password) {

        user.password = encryptPassword(user.password);

    }


}

function encryptPassword(password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

}

User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

User.prototype.generateJWT = function generateJWT() {

    return jwt.sign({
        email: this.email
    }, process.env.JWT_SECRET);
}

User.prototype.toAuthJSON = function toAuthJSON() {

    return {
        email:this.email,
        token:this.generateJWT()
    }
}

User.beforeCreate(encryptPasswordForNewAccount);
User.beforeUpdate(encryptPasswordIfChanged);
User.beforeBulkUpdate(encryptPasswordIfChanged);

module.exports = User;