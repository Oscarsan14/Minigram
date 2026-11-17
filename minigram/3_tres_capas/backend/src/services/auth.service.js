import bcrypt from 'bcrypt';
import db from '../database/database.js';
import jwt from 'jsonwebtoken';

// Register
export const register = async (req, res) => {
    const { username, email, password } = req.body
    console.log("Usuario:", username, "| Correo:", email, "| Password:", password)
    
    // vamos a hashear 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Comprobar si el usuario existe 
    const userExist = await db.query('Select * FROM users WHERE username = $1 OR email = $2', [username, email]);

    if(userExist.rows.length > 0){
        return res.status(400).send('El usuario o el correo electronico ya estan registrados');
    }

    //Guardar usuario en la base de datos
    await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

    // Vamos a poner una cookie de sesion para el usuario que luego cambiaremos por JWT

    res.cookie('username', username, {maxAge: 900000, httpOnly: true})
    

    // Guardar usuario en la base de datos 

    res.send('registro exitoso')

    
    console.log('registro exitoso')
}

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;

  const userExist = await db.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  ).then((res) => res.rows[0]);

  if (!userExist) {
    return res.status(401).json({
      error: 'Usuario o contraseña incorrectos'
    });
  }

  const esCorrecto = bcrypt.compareSync(
    password,
    userExist.password
  );

  if (esCorrecto) {
    const token = jwt.sign(
      { id: userExist.id, username: userExist.username },
      'patata',
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } else {
    return res.status(401).json({
      error: 'Usuario o contraseña incorrectos'
    });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie('username')
  res.redirect('/')
}