'use strict';

import { Router } from 'express';
import * as usuario from '../controllers/userController';

const userRoutes = Router();

userRoutes.get('/listar', usuario.listar);
userRoutes.post('/salvar', usuario.salvar);
userRoutes.put('/atualizar/:uid', usuario.atualizar);

export { userRoutes };
