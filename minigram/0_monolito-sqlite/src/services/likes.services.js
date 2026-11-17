import db from "../database/database.js";

const countLikes = (req, res) => {
    const { postId } = req.params;

    const likes = db.prepare('SELECT COUNT(*) AS count FROM likes WHERE post_id = ?').get(postId);

    res.send(likes);
}

const switchLike = (req, res) => {
    const username = req.cookies.username;
    const { postId } = req.params;

    const user = db.prepare('SELECT id FROM users WHERE username = ?').get(username);

    if (!user) {
        return res.send('Usuario no encontrado');
    }

    const like = db.prepare('SELECT * FROM likes WHERE post_id = ? AND user_id = ?').get(postId, user.id);

    if (like) {
        db.prepare('DELETE FROM likes WHERE post_id = ? AND user_id = ?').run(postId, user.id);
    } else {
        db.prepare('INSERT INTO likes (post_id, user_id) VALUES (?, ?)').run(postId, user.id);
    }
    res.send(like ? 'Unlike' : 'Like');
}

const checkLike = (req, res) => {
    const username = req.cookies.username;
    const { postId } = req.params;

    const user = db.prepare('SELECT id FROM users WHERE username = ?').get(username);

    const like = db.prepare('SELECT * FROM likes WHERE post_id = ? AND user_id = ?').get(postId, user.id);

    if (like) {
        res.send('true');
    } else {
        res.send('false');
    }
}

export { countLikes, switchLike, checkLike };