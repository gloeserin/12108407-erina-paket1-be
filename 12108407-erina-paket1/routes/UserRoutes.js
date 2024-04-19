import express from 'express';
import { createUser, getUserById, updatePetugas, createPetugas, getPetugas, getPetugasById, deletePetugas, register } from '../controller/UserController.js';
const router = express.Router();

router.post('/register', register);
router.get('/user/:id', getUserById);
router.get ('/petugas', getPetugas);
router.get ('/petugas/:id', getPetugasById);
router.post('/create/petugas', createPetugas);
router.patch('/petugas/:id', updatePetugas);
router.delete('/petugas/:id', deletePetugas);
router.post('/create/user',  createUser)




export default router;