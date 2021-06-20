const { startDatabase } = require("./db/database");
const app = require('./app')
const port = 3000;

startDatabase()
  .then(() => {
    app.listen(port, console.log(`Connected to Port ${port}.`));
  })
