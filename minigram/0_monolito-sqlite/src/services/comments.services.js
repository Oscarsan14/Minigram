import db from "../database/database.js";

const listComments = (req, res) => {
    const { postId } = req.params;

    const comentarios = db.prepare(`
        SELECT comments.*, users.username
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.post_id = ?
    `).all(postId);

    res.send(comentarios);
}

const createComment = (req, res) => {
    const { postId } = req.params;
    const username = req.cookies.username;
    const { comment } = req.body;

    const user = db.prepare('SELECT id FROM users WHERE username = ?').get(username)
    
    // Comprobamos que el comentario no esté vacío
    if (!comment || !comment.trim()) {
        return res.status(400).send('Comentario vacío');
    }

    // Guardar el comentario
    db.prepare('INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)').run(postId, user.id, comment);
    res.send("Comentario creado")
}

const deleteComment = (req, res) => {
    const { commentId } = req.params;
    const username = req.cookies.username;

    const user = db.prepare(
        'SELECT id FROM users WHERE username = ?'
    ).get(username);

    if (!user) {
        return res.status(401).send('Usuario no encontrado');
    }

    const result = db.prepare(
        'DELETE FROM comments WHERE id = ? AND user_id = ?'
    ).run(commentId, user.id);

    if (result.changes === 0) {
        return res.status(404).send('Comentario no encontrado o no autorizado');
    }

    res.send('Comentario eliminado');
}

export { listComments, createComment, deleteComment };