const mongoose = require('mongoose');
let databaseName = 'pokeapidb';

if (process.env.NODE_ENV === 'test') {
  databaseName = 'pokeapidbtest';
}

mongoose.connect(`mongodb://localhost/${databaseName}`, {useNewUrlParser: true, useUnifiedTopology: true});
