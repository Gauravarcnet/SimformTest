const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },

  email: {
    type: String,
    default: '',
    // lowercase: true
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  status: {
    type: Number,
    default: 1   // 1 : active : 2 : deleted
  },


}, {
    timestamps: true
  })
// userSchema.plugin(autopopulate);

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  let user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', userSchema)