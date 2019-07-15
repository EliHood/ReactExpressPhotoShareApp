import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../main';


chai.use(chaiHttp);

// should get /

describe('should GET / Images', () => {
  it('should get 200 status', (done) => {
    chai
      .request(server)
      .get('/uploads')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
