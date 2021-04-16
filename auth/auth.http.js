const jwt = require('jsonwebtoken');
const userController = require('./user.controller');
const { to } = require('../tools/to');

const loginUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({message: 'Missing data'});
  } else if (!req.body.user || !req.body.password) {
    return res.status(400).json({message: 'Missing data'});
  }
  //Comprobamos credenciales
  let [err, result] = await to(userController.checkUserCredentials(req.body.user, req.body.password));
  //sino son validas error
  if (err || !result) {
    return res.status(401).json({message: 'Invalid credentials'});
  }
     
  //si son validad generamos un JWT y lo devolvemos
  let user = await userController.getUserIdFromUserName(req.body.user);
  let token = jwt.sign({userId: user.userId}, 'secretPassword');
  res.status(200).json({token: token});
}

exports.loginUser = loginUser;
