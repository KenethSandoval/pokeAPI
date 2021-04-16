const { Schema, model } = require('mongoose');

const authSchema = new Schema({
  userName: String,
  password: String,
  userId: String
});

module.exports = model('authModel', authSchema)
