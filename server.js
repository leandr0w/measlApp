require('dotenv').config();
const app = require('./app');
const { db } = require('./database/db');
const initModel = require('./models/initModel');

db.authenticate()
  .then(() => console.log('Database Authenticated'))
  .catch((error) => console.log(error));

initModel();

db.sync()
  .then(() => console.log('Database Synced'))
  .catch((error) => console.log(error));

const port = +process.env.PORT || 3400;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
