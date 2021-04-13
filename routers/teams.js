const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../auth')(passport);

router.route('/')
  .get(
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
      res.status(200).send('Hola mundo');
    })
  .put((req, res) => {
    res.send('Hola mundo');  
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
