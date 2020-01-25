'use strict';

import { Router } from 'express';
import * as dispositivo from '../controllers/devideController';

const deviceRoutes = Router();

deviceRoutes.get('/listar', dispositivo.listar);
deviceRoutes.post('/salvar', dispositivo.salvar);
deviceRoutes.patch('/atualizar/', dispositivo.atualizarLocalizacao);

export { deviceRoutes };
