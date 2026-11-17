import fs from 'node:fs';
import db from './database.js';

const schema = fs.readFileSync(
    new URL('./schema.sql', import.meta.url),
    'utf8'
);

db.exec(schema);
console.log('Base de datos actualizada correctamente');
db.close();
