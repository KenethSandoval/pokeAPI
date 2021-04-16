let teamsDatabase = {};

const clearUpTeam = () => {
  return new Promise((resolve, reject) => {
    for (let user in teamsDatabase) {
      teamsDatabase[user] = [];
    }
    resolve()
  });
}

const bootstrapTeam = (userId) => {
  return new Promise((resolve, reject) => {
    teamsDatabase[userId] = [];
    resolve();
  });
}

const addPokemon = (userId, pokemon) => {
  return new Promise((resolve, reject) => {
    if (teamsDatabase[userId].length == 6) {
      reject('Already have 6 pokemon');
    } else {
      teamsDatabase[userId].push(pokemon);
      resolve();
    }
  });
}

const removePokemon = (userId, index) => {
  return new Promise((resolve, reject) => {
    if (teamsDatabase[userId][index]) {
      teamsDatabase[userId].splice(index, 1);
    }
    resolve();
  });
}

const getTeamOfUser = (userId) => {
  return new Promise((resolve, reject) => {
    resolve(teamsDatabase[userId]);
  });
}

const setTeam = (userId, team) => {
  return new Promise((resolve, reject) => {
    teamsDatabase[userId] = team;
    resolve();
  });
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.clearUpTeam = clearUpTeam;
exports.removePokemon = removePokemon;

