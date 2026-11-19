// Logica para implementar la creacion de posts
import { Router } from 'express';
import { isAuth } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import { createPost, deletePost, getFeed } from '../services/posts.service.js';

const postsRouter = Router();

postsRouter.post('/create-post', isAuth, upload.single('image'), createPost);

postsRouter.get('/feed', isAuth, getFeed);

postsRouter.delete('/delete-post/:id', isAuth, deletePost)

export default postsRouter