import pgPromise from 'pg-promise';
import dotenv from "dotenv"
dotenv.config()
const pgp = pgPromise({});

const HOST = process.env.DB_HOST;
const PASS = process.env.DB_PASS;
const cn = {
  host: HOST,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: PASS,
  max: 30
};
export const db = pgp(cn);
db.connect()
  .then((obj) => {
    console.log('Connected to database');
    obj.done(); // success, release connection;
  })
  .catch((error) => {
    console.error('ERROR:', error.message);
  });


