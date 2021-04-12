//punto de entrada de todo nuestro servidor
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const userController = require('./controllers/user');
userController.registerUser('keneth', '1234');

require('./auth')(passport);

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Hola mundo');
});

app.post('/login', (req, res) => {
  if (!req.body) {
    return res.status(400).json({message: 'Missing data'});
  } else if (!req.body.user || !req.body.password) { 
    return res.status(400).json({message: 'Missing data'});
  }
  //Comprobamos credenciales
  userController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
    //sino son validad error
    if (err || !result) {
      return res.status(401).json({message: 'Invalid credentials'});
    }

    //si son validad generamos un JWT y lo devolvemos
    let token = jwt.sign({userId: result}, 'secretPassword');
    res.status(200).json({token: token});
  });
});

app.post('/team/pokemons', () => {
  res.status(200).send('Hola mundo');
});

app.get('/team', passport.authenticate("jwt", {session: false}), (req, res) => {
  res.status(200).send('Hola mundo');
});

app.delete('/team/pokemons/:pokeid', () => {
  res.status(200).send('Hola mundo');

});

app.put('/team', () => {
  res.send('Hola mundo');
  
});

app.listen(port, () => {
  console.log('Server started at port: ', port);
});

exports.app = app;
