// tests/dbController.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();
const dbController = require("../controllers/dbController");
chai.use(chaiHttp);

// Load test data from the JSON file
const testData = {
  users: {
    id: 1,
    name: "Tim",
    email: "Tim@usc.edu",
    age: 25,
  },
};

describe("Database Controller", () => {
  beforeEach((done) => {
    done();
  });

  it("should create a new row in the specified collection", (done) => {
    chai
      .request(app)
      .post("/api/users")
      .send(testData.users) // Use test data for the new row
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        chai
          .request(app)
          .get("/api/users/1")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            // Verify that the fetched rows are the same with testData
            res.body.should.have.property("id").eql(1);
            res.body.should.have.property("name").eql("Tim");
            res.body.should.have.property("email").eql("Tim@usc.edu");
            res.body.should.have.property("age").eql(25);
            done();
          });
      });
  });

  it("should get a row from the specified collection by ID", (done) => {
    chai
      .request(app)
      .get("/api/users/1") // Assume '1' is the ID of the row to retrieve
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("id").eql(1);
        res.body.should.have.property("name").eql("Tim");
        res.body.should.have.property("email").eql("Tim@usc.edu");
        res.body.should.have.property("age").eql(25);
        done();
      });
  });

  it("should update a row in the specified collection by ID", (done) => {
    chai
      .request(app)
      .put("/api/users/1") // Assume '1' is the ID of the row to update
      .send({ age: 26 }) // Use test data for the updated row
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");

        chai
          .request(app)
          .get("/api/users/1")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            // Verify that the fetched row has the updated age
            res.body.should.have.property("age").eql(26);

            done();
          });
      });
  });

  it("should delete a row from the specified collection by ID", (done) => {
    chai
      .request(app)
      .delete("/api/users/1") // Assume '1' is the ID of the row to delete
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
