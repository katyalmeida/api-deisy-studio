import { Router } from 'express';

import UserController from '../app/controllers/UserController.js';
import LoginController from '../app/controllers/LoginController.js';
import SpecialtyController from '../app/controllers/SpecialtyController.js';
import ServicesController from '../app/controllers/ServicesController.js';
import authMiddleware from '../app/middlewares/auth.js';
import multer from 'multer';
import multerConfig from '../config/multer.js';
const upload = multer(multerConfig);
const routes = new Router();

routes.post('/login', LoginController.store);
routes.post('/users', UserController.store);
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/specialty', SpecialtyController.index);
routes.post('/specialty', upload.single('file'), SpecialtyController.store);
routes.put('/specialty/:id', upload.single('file'), SpecialtyController.update);

routes.get('/services', ServicesController.index);
routes.post('/services', upload.single('file'), ServicesController.store);
routes.put('/services/:id', upload.single('file'), ServicesController.update);

export default routes;
