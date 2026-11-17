import { Router } from 'express';
import { isAuth } from '../middlewares/auth.js';

const mainRouter = Router();

// Ruta raíz
mainRouter.get('/', (req, res) => {
    res.render('index');
});

// Ruta protegida
mainRouter.get('/protected', isAuth, (req, res) => {
    res.send('Esta es una ruta protegida');
});

// Formulario para crear post
mainRouter.get('/create-post', isAuth, (req, res) => {
    res.render('posts/create-post');
});

export default mainRouter;
