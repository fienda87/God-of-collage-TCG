import mysql from 'mysql2/promise';

async function test() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tcg_god_of_college'
  });
  const [rows] = await connection.query('SELECT id, name, stage, evolves_from FROM cards WHERE stage > 0 LIMIT 5');
  console.log(rows);
  const [rows2] = await connection.query('SELECT id, name, stage FROM cards WHERE name LIKE "%Koten%" LIMIT 5');
  console.log(rows2);
  connection.end();
}
test();
