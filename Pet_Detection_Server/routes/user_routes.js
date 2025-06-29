import { Router } from 'express';
import { login, register } from '../services/authServices.js';
import tokenVerifier from '../middleware/tokenVerifier.js';
import { getUser, analyzeImage } from '../services/userServices.js';


const router = Router();

router.post('/login', login);

router.post("/register", register);

router.get('/user', tokenVerifier, getUser);

router.post('/analyzeImage', tokenVerifier, analyzeImage);


export default router;