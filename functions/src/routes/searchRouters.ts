'use strict';

import { Router } from 'express';
import * as search from '../controllers/searchController';

const searchRoutes = Router();

searchRoutes.get('/index', search.index);

export { searchRoutes };
