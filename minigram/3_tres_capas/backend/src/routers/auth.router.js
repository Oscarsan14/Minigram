import { Router } from 'express';
import { login, logout, register} from '../services/auth.service.js';

const authRouter = Router();

//login
authRouter.get('/login', (req, res) => {
  res.render('auth/login', {error: null});
});

authRouter.post('/login', login);

//logout
authRouter.get('/logout', logout);

//Register

authRouter.get('/register', (req, res) => {
  res.render('auth/register', {error: null});
});

authRouter.post('/register', register);

export default authRouter;