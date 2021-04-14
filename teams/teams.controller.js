let teamsDatabase = {};

const clearUpTeam = () => {
  for (let user in teamsDatabase) {
    teamsDatabase[user] = [];
  }
}

const bootstrapTeam = (userId) => {
  teamsDatabase[userId] = [];
}

const addPokemon = (userId, pokemon) => {
  teamsDatabase[userId].push(pokemon);
}

const removePokemon = (userId, index) => {
  if (teamsDatabase[userId][index]) {
    teamsDatabase[userId].splice(index, 1);
  }
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
exports.clearUpTeam = clearUpTeam;
exports.removePokemon = removePokemon;

