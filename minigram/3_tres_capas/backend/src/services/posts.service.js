import db from '../database/database.js';

// Create Post
const createPost = async (req, res) => {
    if(!req.file){
        return res.status(400).send('Debe seleccionar una imagen')
    }

    // Guardar la informacion en la base de datos
    const { caption } = req.body;
    const username = req.cookies.username;

    const resultado = await db.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );

    const user = resultado.rows[0];

    if (!user) {
        return res.status(401).send('Usuario no encontrado');
    }

    const userId = user.id;

    await db.query(
        'INSERT INTO posts (user_id, caption, image_filename) VALUES($1, $2, $3)',
        [userId, caption, req.file.filename]
    );

    res.send('Post creado exitosamente')
}

const deletePost = async (req, res) => {
    // Asegurarnos de que el post pertenece al usuario que lo esta eliminando
    // si pertenece, eliminarlo de la base de datos
    const { id } = req.params;

    // para leer el usuario de la cookie de sesion, necesitamos el middleware
    const username = req.cookies.username;

    // tendremos que borrar
    const resultadoPost = await db.query(
        'SELECT * FROM posts WHERE id = $1',
        [id]
    );

    const post = resultadoPost.rows[0];

    if(!post){
        return res.status(404).send('Post no encontrado');
    }

    const resultadoUser = await db.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );

    const user = resultadoUser.rows[0];

    if (!user) {
        return res.status(401).send('Usuario no encontrado');
    }

    if (post.user_id !== user.id){
        return res.status(403).send('No tienes permiso para eliminar este post')
    }

    await db.query(
        'DELETE FROM posts WHERE id = $1',
        [id]
    );

    res.redirect('/posts/feed')
}

const getFeed = async (req, res) => {
    const posts = await db.query(`
        SELECT  posts.id,
                posts.caption,
                posts.image_filename,
                posts.created_at,
                users.username,
                users.avatar_filename
        FROM posts
        JOIN users
        ON posts.user_id = users.id
        ORDER BY posts.created_at
        DESC LIMIT 20
    `);
    res.json(posts.rows)
}

export { createPost, deletePost, getFeed };