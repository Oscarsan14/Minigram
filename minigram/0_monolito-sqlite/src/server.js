import express from 'express';
import mainRouter from './routers/main.router.js';
import authRouter from './routers/auth.router.js';
import cookieParser from 'cookie-parser'; // Luego se cambia a JWT
import postsRouter from './routers/posts.router.js';
import { addUserToLocals } from './middlewares/auth.js'
import likesRouter from './routers/likes.router.js';
import commentRouter from './routers/comments.router.js'

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views',  'src/views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser()); // Luego se cambia a JWT
app.use(addUserToLocals);

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/like', likesRouter);
app.use('/comment', commentRouter);
app.use('/uploads', express.static('uploads')); // Para poder ver imagenes


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})