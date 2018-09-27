const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:  {type: String},
  password:  {type: String},
  nome:  {type: String},
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now }
});

module.exports = userSchema;