import express from 'express';
import routes from './routes/routes.js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import './database/index.js';

class App {
  constructor() {
    this.app = express();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(
      '/specialty-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    );
    this.app.use(
      '/services-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
