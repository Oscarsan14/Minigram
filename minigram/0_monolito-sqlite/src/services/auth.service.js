import bcrypt from 'bcrypt';
import db from '../database/database.js';

// Register
export const register = async (req, res) => {
    const { username, email, password } = req.body
    console.log("Usuario:", username, "| Correo:", email, "| Password:", password)
    
    // vamos a hashear 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Comprobar si el usuario existe 
    const userExist = db.prepare('Select * FROM users WHERE username = ? OR email = ?').get(username, email);

    if(userExist){
        return res.status(400).send('El usuario o el correo electronico ya estan registrados');
    }

    //Guardar usuario en la base de datos
    const insertUser = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    insertUser.run(username, email, hashedPassword);

    // Vamos a poner una cookie de sesion para el usuario que luego cambiaremos por JWT

    res.cookie('username', username, {maxAge: 900000, httpOnly: true})
    

    // Guardar usuario en la base de datos 

    res.send('registro exitoso')

    
    console.log('registro exitoso')
}

// Login
export const login = async (req, res) => {
  //Implementar logica  de inicio de sesion
 

  // Leer parametros del body: usuario y contraseña

  const {username, password} = req.body
  console.log('Usuario:', username)

  // Consultar en la base de datos si el usuario existe
  const userExist = db.prepare('Select * FROM users WHERE username = ?').get(username);

  if(!userExist){
    return res.status(400).render('login', {error: 'Usuario no encontrado'});
  }

  // Si existe, comparar la contraseña hasheada con la que esta en la base de datos

  const esCorrecto = bcrypt.compareSync(password, userExist.password);

  if (esCorrecto){
    console.log('Contraseña correcta')
    res.cookie('username', username, {maxAge: 900000, httpOnly: true})
    res.redirect('/protected')
  }else{
    console.log('Contraseña incorrecta')
    res.send('Usuario o contraseña incorrecto')
    res.redirect('/login')
  }
  
  if(userExist){
    
  }

  // Si coincide, crear una cookie de sesion para el usuario que luego cambiaremos por el JWT
  // Si no coincide enviar al register
}

// Logout
export const logout = (req, res) => {
  res.clearCookie('username')
  res.redirect('/')
}




