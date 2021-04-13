const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

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
      .send({user: 'keneth', password: '1234'})
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
