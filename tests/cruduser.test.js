const app = require("../app");
const supertest = require("supertest");
const { startDatabase, stopDatabase } = require("../db/database");

let request, userToUpdateAndDelete;

beforeAll(async () => {
  await startDatabase();
  request = supertest(app);
});

afterAll(async () => {
  await stopDatabase();
});

test("get users", (done) => {
  request
    .get("/graphql")
    .send({
      query: "{ users{_id, givenName, familyName, email, created} }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      }
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.users.length).toEqual(5);
      done();
    });
});

test("add user", (done) => {
  request
    .post("/graphql")
    .send({
      query: `mutation{
        createUser(
          userInput: {
    	    givenName: "Kaezo",
    	    familyName: "Takenzae",
    	    email: "kyle@kmcv.com"
  	    }){
          _id,
          givenName,
          familyName,
          email,
          created,
        }
      }`,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      }
      let { createUser } = res.body.data;
      expect(res.body).toBeInstanceOf(Object);
      expect(createUser._id).toBeTruthy();
      expect(createUser.givenName).toEqual('Kaezo');
      expect(createUser.familyName).toEqual('Takenzae');
      expect(createUser.email).toEqual('kyle@kmcv.com');
      expect(createUser.created).toBeTruthy();
      userToUpdateAndDelete = createUser._id;
      done();
    });
});

test("get single user", (done) => {
  request
    .get("/graphql")
    .send({
      query: `{ user(id: "${userToUpdateAndDelete}"){_id, givenName, familyName, email, created} }`,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      }
      let { user } = res.body.data;
      expect(res.body).toBeInstanceOf(Object);
      expect(user._id).toEqual(userToUpdateAndDelete);
      expect(user.givenName).toEqual('Kaezo');
      expect(user.familyName).toEqual('Takenzae');
      expect(user.email).toEqual('kyle@kmcv.com');
      expect(user.created).toBeTruthy();
      done();
    });
});

test("update user single field", (done) => {
  request
    .post("/graphql")
    .send({
      query: `mutation{
        updateUser(id: "${userToUpdateAndDelete}",
          userInput: {
            givenName: "Kai",
        	}){
          _id,
          givenName,
          familyName,
          email
        }
      }`,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      }
      let { updateUser } = res.body.data;
      expect(res.body).toBeInstanceOf(Object);
      expect(updateUser._id).toBeTruthy();
      expect(updateUser.givenName).toEqual('Kai');
      expect(updateUser.familyName).toEqual('Takenzae');
      expect(updateUser.email).toEqual('kyle@kmcv.com');
      done();
    });
});

test("update user all fields", (done) => {
  request
    .post("/graphql")
    .send({
      query: `mutation{
        updateUser(id: "${userToUpdateAndDelete}",
          userInput: {
            givenName: "Kyle",
            familyName: "Moxham",
            email: "thisismynewemail@newbie.com"
        	}){
          _id,
          givenName,
          familyName,
          email
        }
      }`,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      }
      let { updateUser } = res.body.data;
      expect(res.body).toBeInstanceOf(Object);
      expect(updateUser._id).toBeTruthy();
      expect(updateUser.givenName).toEqual('Kyle');
      expect(updateUser.familyName).toEqual('Moxham');
      expect(updateUser.email).toEqual('thisismynewemail@newbie.com');
      done();
    });
});

test("delete user", (done) => {
  request
    .post("/graphql")
    .send({
      query: `mutation{
        deleteUser(id: "${userToUpdateAndDelete}"){
          _id,
          givenName,
          familyName,
          email
        }
      }`,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      }
      let { deleteUser } = res.body.data;
      expect(res.body).toBeInstanceOf(Object);
      expect(deleteUser._id).toBeTruthy();
      expect(deleteUser.givenName).toEqual('Kyle');
      expect(deleteUser.familyName).toEqual('Moxham');
      expect(deleteUser.email).toEqual('thisismynewemail@newbie.com');
      done();
    });
});
