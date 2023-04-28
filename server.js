require('dotenv').config();
const app = require('./app');
const { db } = require('./database/db');

//LA AUTENTICACIÓN CON LA BASE DE DATOS
db.authenticate()
  .then(() => console.log('Database Authenticated'))
  .catch((error) => console.log(error));

//LA SINCRONIZACIÓN CON LA BASE DE DATOS
db.sync()
  .then(() => console.log('Database Synced'))
  .catch((error) => console.log(error));

const port = +process.env.PORT || 3400;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
