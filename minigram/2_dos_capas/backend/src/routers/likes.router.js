import { Router } from 'express';
import { isAuth } from '../middlewares/auth.js';
import { countLikes, switchLike, checkLike } from '../services/likes.services.js';

const likesRouter = Router();

// Aqui iran los metodos

// El primero devuelve el contador de likes que tiene
likesRouter.get('/count/:postId', isAuth, countLikes);

// El segundo permite cambiar el estado del like 
likesRouter.get('/switch-like/:postId', isAuth, switchLike);


// El tercero devuelve si le ha dado like a un post especifico
likesRouter.post('/doILike/:postId', isAuth, checkLike);

// Al final exportamos el router
export default likesRouter;