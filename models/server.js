const express = require('express');
const { transferRouter } = require('../routes/transfer.router');
const cors = require('cors');
const { usersRouter } = require('../routes/users.router');
const { db } = require('../dataBase/db');

//1. Creamos una clase

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      transfer: '/api/v1/transfer',
      user: '/api/v1/users',
    };

    this.dataBase();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  // Rutas
  routes() {
    this.app.use(this.paths.transfer, transferRouter);
    this.app.use(this.paths.user, usersRouter);
  }

  dataBase() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  //Metodos para escuchar solicitudes por el puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

//2. Exportamos el servidor
module.exports = Server;
