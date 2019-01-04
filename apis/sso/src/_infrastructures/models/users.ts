import mongoose, { Model, Document } from 'mongoose';
import crypto from 'crypto';
import { IUser } from '../../_core/models/IUser';
const jwt = require('jsonwebtoken');


export interface IUserModel extends IUser, Document {}

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: String,
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: expirationDate.getTime() / 1000 // parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    user: {
      id: this._id,
      email: this.email
    },
    token: this.generateJWT()
  };
};

export const Users: Model<IUserModel> = mongoose.model<IUserModel>(
  "Users",
  UsersSchema
);
export default Users;
