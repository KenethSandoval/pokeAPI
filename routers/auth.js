const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user');
userController.registerUser('keneth', '1234');

router.route('/login')
  .post((req, res) => {
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

exports.router = router;


