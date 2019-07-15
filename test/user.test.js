import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../main';

chai.use(chaiHttp);

// should get /

describe('should GET /users', () => {
  it('should get users 200 status', (done) => {
    chai
      .request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('should make a post on /users/register', () => {
  it('should make a post request', (done) => {
    const mockData = {
      username: 'billy',
      password: 'fish124',
      email: 'example@example.com',
    };
    chai
      .request(server)
      .post('/users/register')
      .send({
        username: mockData.username,
        password: mockData.password,
        email: mockData.email,
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        done();
      });
  });
});

// describe('Should check for im an owl text', () => {
//     it('should check for im an owl text', (done) =>{
//         chai.request(server)
//         .get('/users/login')
//         .end( (err, res) => {
//             expect(res.body).to.be.an('object') // works
//             expect(res.text).to.equal('im an owl')  // use res.text to check for res.send() text
//             done();
//         })
//     })

// })

describe('should make a post request on /users/login', () => {
  it('should make a login request', (done) => {
    const mockData = {
      username: 'billy',
      password: 'fish124',
    };

    chai
      .request(server)
      .post('/users/login')
      .send({
        username: mockData.username,
        password: mockData.password,
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        done();
      });
  });
});

describe('should make a get request on /users/logout', () => {
  it('should make a logout request', (done) => {
    chai
      .request(server)
      .get('/users/logout')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        done();
      });
  });
});
