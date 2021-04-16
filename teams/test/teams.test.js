const chai = require('chai');
const chaiHttp = require('chai-http');
const userController = require('../../auth/user.controller');
const teamController = require('../teams.controller');

chai.use(chaiHttp);

const app = require('../../app').app;

before((done) => {
  userController.registerUser('keneth', '1234');
  userController.registerUser('eunice', '4321');
  done();
});

afterEach(async () => {
  await teamController.clearUpTeam();
});

describe('Suite de prueba teams', () => {
  it('should return the team of the given user', (done) => {
    let team = [{name: 'Charizard'}, {name: 'Blastoise'}];

    chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({user: 'eunice', password: '4321'})
      .end((err, res) => {
        let token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai.request(app)
         .put('/teams')
         .send({team: team})
         .set('Authorization', `JWT ${token}`)
         .end((err, res) => {
          chai.request(app)
            .get('/teams')
            .set('Authorization', `JWT ${token}`)
            .end((err, res) => {
              // tiene equipo con Charizard y Blastoine
              chai.assert.equal(res.statusCode, 200);
              chai.assert.equal(res.body.trainer, 'eunice');
              chai.assert.equal(res.body.team.length, team.length);
              chai.assert.equal(res.body.team[0].name, team[0].name);
              chai.assert.equal(res.body.team[1].name, team[1].name);
              done();
           });
        });
      });
  });

  it('should return pokedex number', (done) => {
    let pokeName = 'Bulbasaur';

    chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({user: 'eunice', password: '4321'})
      .end((err, res) => {
        let token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai.request(app)
          .post('/teams/pokemons')
          .send({name: pokeName})
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .get('/teams')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                chai.assert.equal(res.body.trainer, 'eunice');
                chai.assert.equal(res.body.team.length, 1);
                chai.assert.equal(res.body.team[0].name, pokeName);
                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                done();
              });
          });
      });
  });

  it('should remove the pokemon at index', (done) => {
    let team = [{name: 'Charizard'}, {name: 'Blastoise'}, {name: 'Keneth'}];
    
    chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({user: 'eunice', password: '4321'})
      .end((err, res) => {
        let token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai.request(app)
          .put('/teams')
          .send({team: team})
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .delete('/teams/pokemons/1')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                  .get('/teams')
                  .set('Authorization', `JWT ${token}`)
                  .end((err, res) => {
                     chai.assert.equal(res.statusCode, 200);
                     chai.assert.equal(res.body.trainer, 'eunice');
                     chai.assert.equal(res.body.team.length, team.length - 1);
                     done();
                 });
             });
          });
       });
    });

  it('should not be able to add pokemon if you already have 6', (done) => {
      let team = [
        {name: 'Charizard'}, 
        {name: 'Blastoise'},
        {name: 'Keneth'},
        {name: 'Charizard'}, 
        {name: 'Blastoise'},
        {name: 'Keneth'}

      ];
    
     chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({user: 'eunice', password: '4321'})
      .end((err, res) => {
        let token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai.request(app)
          .put('/teams')
          .send({team: team})
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .post('/teams/pokemons')
              .send({name: 'Vibraba'})
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.assert.equal(res.statusCode, 400);
                done();
              });
          });
       });
    });
});

after((done) => {
  userController.clearUpUser();
  done();
});


