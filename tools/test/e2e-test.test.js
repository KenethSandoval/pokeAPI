const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

//necesitamos tener acceso a nuestro servidor para testearlo
const app = require('../../app').app;

describe('Suite de prueba 2e2', () => {
  it('should return hello world', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        chai.assert.equal(res.text, 'Hola mundo');
        done();
      });
  });
});
