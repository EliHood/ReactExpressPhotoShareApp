import chai from "chai"
import chaiHttp from 'chai-http';
import request from 'request';
import server from '../main';
const expect = chai.expect;
const should = chai.should();


chai.use(chaiHttp);

// should get / 

describe('should GET /',  () => {
    it('should get 200 status', (done) =>{
        chai.request(server)
        .get('/')
        .end( (err, res) => {
            res.should.have.status(200);
            done();
        });
    });

})
// should check for Hello World!
describe('Should check for Hello World! text', () => {
    it('should check for hello world text', (done) =>{
        chai.request(server)
        .get('/')
        .end( (err, res) => {
            expect(res.body).to.be.an('object') // works
            expect(res.text).to.equal('Hello World!')  // use res.text to check for res.send() text
            done();
        })
    })

})

