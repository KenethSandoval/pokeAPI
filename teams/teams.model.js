const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  userId: String,
  team: []
});

module.exports = model('teamModel', teamSchema);
