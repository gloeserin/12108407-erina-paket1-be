import express from 'express';
import {
    createUlasan,
    getUlasanById,
} from '../controller/UlasanController.js';

const router = express.Router();
router.post('/ulasan', createUlasan);
router.get('/ulasan/:id', getUlasanById);

export default router;