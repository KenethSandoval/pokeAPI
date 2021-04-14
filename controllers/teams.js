const teamsDatabase = {};

const bootstrapTeam = (userId) => {
  teamsDatabase[userId] = [{name: 'Charizard'}, {name: 'Blastoise'}];
}

const addPokemon = (userId, pokemonName) => {
  teamsDatabase[userId].push({name: pokemonName});
}

const getTeamOfUser = (userId) => {
  return teamsDatabase[userId];
}

const setTeam = (userId, team) => {
  teamsDatabase[userId] = team;
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
