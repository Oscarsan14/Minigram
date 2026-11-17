import db from "../database/database.js";

const countLikes = async (req, res) => {
    const { postId } = req.params;

    const resultado = await db.query(
        'SELECT COUNT(*) AS count FROM likes WHERE post_id = $1',
        [postId]
    );

    const likes = resultado.rows[0];

    res.send(likes);
}

const switchLike = async (req, res) => {
    const username = req.username;
    const { postId } = req.params;

    const resultado = await db.query(
        'SELECT id FROM users WHERE username = $1',
        [username]
    );

    const user = resultado.rows[0];

    if (!user) {
        return res.send('Usuario no encontrado');
    }

    const resultadoLike = await db.query(
        'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
        [postId, user.id]
    );

    const like = resultadoLike.rows[0];

    if (like) {
        await db.query(
            'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
            [postId, user.id]
        );
    } else {
        await db.query(
            'INSERT INTO likes (post_id, user_id) VALUES ($1, $2)',
            [postId, user.id]
        );
    }

    res.send(like ? 'Unlike' : 'Like');
}

const checkLike = async (req, res) => {
    const username = req.username;
    const { postId } = req.params;

    const resultado = await db.query(
        'SELECT id FROM users WHERE username = $1',
        [username]
    );

    const user = resultado.rows[0];

    if (!user) {
        return res.send('false');
    }

    const resultadoLike = await db.query(
        'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
        [postId, user.id]
    );

    const like = resultadoLike.rows[0];

    if (like) {
        res.send('true');
    } else {
        res.send('false');
    }
}

export { countLikes, switchLike, checkLike };