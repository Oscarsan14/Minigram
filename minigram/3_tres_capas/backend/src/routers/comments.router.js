import { Router } from 'express';
import { isAuth } from '../middlewares/auth.js';
import { listComments, createComment, deleteComment } from '../services/comments.services.js';

const commentsRouter = Router();

// Devuelve todos los comentarios
commentsRouter.get('/list/:postId', isAuth, listComments);

// Crear un comentario
commentsRouter.post('/create/:postId', isAuth, createComment)

// Eliminar un comentario
commentsRouter.delete('/delete/:commentId', isAuth, deleteComment);

// Al final exportamos el router
export default commentsRouter;