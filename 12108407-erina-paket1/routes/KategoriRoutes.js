import express from 'express';

import { createKategori, deleteKategori, getKategori, getKategoriById, updateKategori } from '../controller/KategoriController.js';
const router = express.Router();

router.post('/kategori', createKategori);
router.get('/kategori', getKategori);
router.get ('/kategori/:id', getKategoriById);
router.patch('/kategori/:id', updateKategori);
router.delete('/kategori/:id', deleteKategori);




export default router;