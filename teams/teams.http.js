const axios = require('axios');
const teamController = require('./teams.controller');
const { getUser } = require('../auth/user.controller');
const { to } = require('../tools/to');

const getTeamFromUser = async (req, res) => {
  let user = await getUser(req.user.userId);
  let [teamErr, team] = await to(teamController.getTeamOfUser(req.user.userId));

  if (teamErr) {
    return res.status(400).json({message: teamErr});
  }

  res.status(200).json({
      trainer: user.userName,
      team: team
   });
}

const setTeamToUser = async (req, res) => {
  let [error, response] = await to(teamController.setTeam(req.user.userId, req.body.team));
  if (error) {
    return res.status(400).json({message: error});
  }
  res.status(200).send();
}

const addTeamToUser = async (req, res) => {
  let pokemonName = req.body.name;
  let [pokeApiError, pokeApiRespone] = await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`));

  if (pokeApiError) {
    return res.status(400).json({message: pokeApiError});
  }

  let pokemon = {
    name: pokemonName,
    pokedexNumber: pokeApiRespone.data.id
  }

  let [errorAdd, response] = await to(teamController.addPokemon(req.user.userId, pokemon));
  if (errorAdd) {
    return res.status(400).json({message: errorAdd});
  }

  res.status(201).json(pokemon); 
}

const removeTeamToUser = async (req, res) => {
  let [error, response ] = await to(teamController.removePokemon(req.user.userId, req.params.pokeid));
  if (error) {
    return res.status(400).json({message: error});
  }
  res.status(200).send();
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addTeamToUser = addTeamToUser;
exports.removeTeamToUser = removeTeamToUser;

