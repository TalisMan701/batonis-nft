import express from 'express';
import sign from './sign.routes';

const router = express.Router();

router.use('/api/v0/sign', sign);

export default router;