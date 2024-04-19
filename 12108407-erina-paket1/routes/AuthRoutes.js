import express from 'express';
import {Login, Logout, Me} from '../controller/AuthController.js';

const router = express.Router();

router.get ('/me', Me);
router.post('/login', Login);
router.get('/logout', Logout);

export default router;