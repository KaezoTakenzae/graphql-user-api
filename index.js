const { startDatabase } = require("./db/database");
const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;

startDatabase()
  .then(() => {
    app.listen(port, console.log(`Connected to Port ${port}.`));
  });

// mongoose
//     .connect(
//       'mongodb://localhost:27017/parkit',
//       {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true,
//       }
//     )
//     .then(() => {
//       app.listen(port, console.log(`Connected to Port ${port}.`));
//     });
