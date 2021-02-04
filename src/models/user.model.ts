import * as crypto from 'crypto';
// import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: String,
    salt: String,
});

userSchema.statics.create = function(email: string, username: string, password: string, callback) {
    const user = new this({
        email,
        username,
    });
    user.setPassword(password);

    user.save(callback);
};

userSchema.methods.setPassword = function(password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(new Buffer(password), this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password: string) {
    const hash = crypto.pbkdf2Sync(new Buffer(password), this.salt, 10000, 512, 'sha512').toString('hex');
    return hash === this.password;
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({
        _id: this._id,
        exp: moment().add(7, 'hours').unix(),
    }, 'DO NOT SAVE YOUR SECRET HERE');
};

mongoose.model('User', userSchema);
