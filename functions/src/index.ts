'use strict';
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { userRoutes } from './routes/usersRouters';
import { deviceRoutes } from './routes/devicesRouters';
import { searchRoutes } from './routes/searchRouters';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/usuarios', userRoutes);
app.use('/dispositivos', deviceRoutes);
app.use('/search', searchRoutes);

// userService is your functions name, and you will pass app as 
// a parameter
export const apiService = functions.https.onRequest(app);
