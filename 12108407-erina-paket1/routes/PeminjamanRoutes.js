import express from 'express';
import {
    createPinjam,  getPinjam,  getPinjamByUserId, pengembalian,
} from '../controller/PeminjamanController.js';

const router = express.Router();
router.post('/pinjam/:id', createPinjam);
router.get('/peminjaman/user', getPinjamByUserId);
router.post('/pengembalian/:id', pengembalian);  
router.get('/peminjaman/admin', getPinjam);               

export default router;