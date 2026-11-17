import fs from 'node:fs';
import db from './database.js';

const schema = fs.readFileSync(
    new URL('./schema.sql', import.meta.url),
    'utf8'
);

db.query(schema)
    .then(() => {
        console.log('Base de datos inicializada correctamente.');
    })
    .catch((error) => {
        console.error('Error al inicializar la base de datos', error);
    })