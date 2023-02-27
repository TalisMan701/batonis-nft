import express from 'express';
import SignControllers from '../controllers/sign.controllers';
import { validate } from '../middleware/validate.middleware';
import * as SignSchemas from '../schemas/sign.schema';

const router = express.Router();

router.get('/', validate(SignSchemas.getSign), SignControllers.getSign);

export default router;

