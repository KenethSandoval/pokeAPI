const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);
const teamController = require('../controllers/teams');
const { getUser } = require('../controllers/user');

router.route('/')
  .get(
    passport.authenticate("jwt", {session: false}),
    (req, res, next) => {
      let user = getUser(req.user.userId);
      res.status(200).json({
        trainer: user.userName,
        team: teamController.getTeamOfUser(req.user.userId)
      });
    })
  .put(
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
      teamController.setTeam(req.body.user, req.body.team); 
      res.status(200).send();
  });


router.route('/pokemons')
  .post((req, res) => {
    res.status(200).send('Hola mundo');
  });

router.route('/pokemons/:pokeid')
  .delete((req, res) => {
    res.status(200).send('Hola munod');
  })

exports.router = router;
