import { Router } from 'express';

import UserController from '../app/controllers/UserController.js';
import LoginController from '../app/controllers/LoginController.js';
import authMiddleware from '../app/middlewares/auth.js';
const routes = new Router();

routes.post('/login', LoginController.store);
routes.post('/users', UserController.store);
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
