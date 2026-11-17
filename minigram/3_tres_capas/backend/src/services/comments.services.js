import db from "../database/database.js";

const listComments = async (req, res) => {
    const { postId } = req.params;

    const comentarios = await db.query(`
        SELECT  comments.id,
                comments.comment, 
                users.username,
                users.avatar_filename
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.post_id = $1
    `, [postId]);

    res.send(comentarios.rows);
}

const createComment = async (req, res) => {
    const { postId } = req.params;
    const username = req.username;
    const { comment } = req.body;

    const resultado = await db.query(
        'SELECT id FROM users WHERE username = $1',
        [username]
    );

    const user = resultado.rows[0];

    if (!user) {
        return res.status(401).send('Usuario no encontrado');
    }

    // Comprobamos que el comentario no esté vacío
    if (!comment || !comment.trim()) {
        return res.status(400).send('Comentario vacío');
    }

    // Guardar el comentario
    await db.query(
        'INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3)',
        [postId, user.id, comment]
    );

    res.send("Comentario creado");
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const username = req.username;

    const resultado = await db.query(
        'SELECT id FROM users WHERE username = $1',
        [username]
    );

    const user = resultado.rows[0];

    if (!user) {
        return res.status(401).send('Usuario no encontrado');
    }

    const result = await db.query(
        'DELETE FROM comments WHERE id = $1 AND user_id = $2',
        [commentId, user.id]
    );

    if (result.rowCount === 0) {
        return res.status(404).send('Comentario no encontrado o no autorizado');
    }

    res.send('Comentario eliminado');
}

export { listComments, createComment, deleteComment };