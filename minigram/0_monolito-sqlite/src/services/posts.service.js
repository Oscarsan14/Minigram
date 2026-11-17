import db from '../database/database.js';

// Create Post
const createPost = (req, res) => {
    if(!req.file){
        return res.status(400).send('Debe seleccionar una imagen')
    }

    // Guardar la informacion en la base de datos
    const { caption } = req.body;        
    const username = req.cookies.username;
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    const userId = user.id;

    const insertPost = db.prepare('INSERT INTO posts (user_id, caption, image_filename) VALUES(?, ?, ?)');
    insertPost.run(userId, caption, req.file.filename);

    res.send('Post creado exitosamente')
}

const deletePost = (req, res) => {
    // Asegurarnos de que el post pertenece al usuario que lo esta eliminando
    // si pertenece, eliminarlo de la base de datos 
    const { id } = req.params;

    // para leer el usuario de la cookie de sesion, necesitamos el middleware
    const username = req.cookies.username;

    // tendremos que borrar
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
    if(!post){
        return res.status(404).send('Post no encontrado');
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (post.user_id !== user.id){
        return res.status(403).send('No tienes permiso para eliminar este post')
    }

    db.prepare('DELETE FROM posts WHERE id = ?').run(id)
    res.redirect('/posts/feed')
}

const getFeed = (req, res) => {
    const posts = db.prepare(`
        SELECT  posts.id,
                posts.caption,
                posts.image_filename,
                posts.created_at,
                users.username
        FROM posts 
        JOIN users 
        ON posts.user_id = users.id 
        ORDER BY posts.created_at 
        DESC LIMIT 20
    `).all();
    res.render('posts/feed', { posts });
}

export { createPost, deletePost, getFeed};