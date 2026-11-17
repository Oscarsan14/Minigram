import { Pool } from 'pg'

// Docker comopose usara las variables de entorno
// npm run dev usara las constantes por defecto
const db = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'monolito',
    user :process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Clase1441.',
})

export default db;