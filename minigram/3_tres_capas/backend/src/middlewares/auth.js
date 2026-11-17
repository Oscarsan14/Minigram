import jwt from 'jsonwebtoken';

const secretKey = 'patata';

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log('Token user: ', data.username);
    req.username = data.username;
    next();
  });
}

const addUserToLocals = (req, res, next) => {
  const username = req.cookies.username;
  if(username){
    res.locals.username = username
  }
  next();
}

export { isAuth, addUserToLocals };