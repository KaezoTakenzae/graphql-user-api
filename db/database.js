const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require('mongoose');
const data = require("./data");

let database = null;

const mongo = new MongoMemoryServer();

async function startDatabase() {
  const mongoDBURL = await mongo.getUri();
  const db = await mongoose
    .connect(
      mongoDBURL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );

  //Seed Database
  if (!database) {
    database = db.connection;
    await database.collection("users").insertMany(data.Users);
  }

  return database;
}

async function stopDatabase() {
  await database.close();
  await mongo.stop();
}

module.exports = {
  startDatabase,
  stopDatabase,
};
