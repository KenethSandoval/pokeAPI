const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');
const { to } = require('../tools/to');

const AuthModel = require('./auth.model');

const clearUpUser = () => {
  return new Promise(async (resolve, reject) => {
    await AuthModel.deleteMany({}).exec();
    resolve();
  })
}

const registerUser = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    let hashedPwd = crypto.hashPasswordSync(password);
    //Guardar en la base de datos nuestro usuario
    let userId = uuid.v4();
    let newUser = new AuthModel({
      userId: userId,
      userName: userName,
      password: hashedPwd
    });
    await newUser.save();
    await teams.bootstrapTeam(userId);
    resolve();
  });
}

const getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(AuthModel.findOne({userId: userId}).exec());
    if(err) {
      return reject(err);
    }
    resolve(result);
  });
}

const getUserIdFromUserName = (userName) => {
  return new Promise(async(resolve, reject) => {
    let [err, result] = await to(AuthModel.findOne({userName: userName}).exec());
    if(err) {
      return reject(err);
    }
    resolve(result);
  });
}

const checkUserCredentials = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    //comprobar que las credenciales son correctas
    let [err, user] = await to(getUserIdFromUserName(userName));
  
    if (!err || user) {
      crypto.comparePassword(password, user.password, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      reject('Missing user');
    }
  });
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;
exports.clearUpUser = clearUpUser;
