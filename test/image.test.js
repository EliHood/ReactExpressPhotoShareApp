import chai from "chai";
import chaiHttp from "chai-http";
import request from "request";
import server from "../main";

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

// should get /

describe("should GET / Images", () => {
  it("should get 200 status", done => {
    chai
      .request(server)
      .get("/uploads")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
