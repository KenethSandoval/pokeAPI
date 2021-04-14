const chai = require('chai');
const chaiHttp = require('chai-http');
const userController = require('../user.controller');

chai.use(chaiHttp);

const app = require('../../app').app;

before((done) => {
  userController.registerUser('keneth', '1234');
  userController.registerUser('eunice', '4321');
  done();
});

describe('Suite de prueba auth', () => { 
  it('should return 401 when no jwt available', (done) => {
     //Cuando la llamada no tiene correctamente la llave
    chai.request(app)
      .get('/teams')
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 401);
        done();
      });
  });

  it('should return 400 when no data is provide', (done) => {
    chai.request(app)
      .post('/auth/login')
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 400);
        done();
      });
  });

  it('should return 200 and token for sucessful login', (done) => {
    chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({user: 'keneth', password: '1234'})
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 200);
        done();
      });
  });

  it('should return 200 when jwt valid', (done) => {
   
    chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({user: 'eunice', password: '4321'})
      .end((err, res) => {
        chai.request(app)
        .get('/teams')
        .set('Authorization', `JWT ${res.body.token}`)
        .end((err, res) => {
          chai.assert.equal(res.statusCode, 200);
          done();
        });
      });    
  });
});

after((done) => {
  userController.clearUpUser();
  done();
});
