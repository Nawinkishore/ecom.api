import mysql from 'mysql2';
const conn = mysql.createPool({
    host: '183.83.189.23:3306',
    port: 3306,
    user: 'fsd',
    password: 'q2@NF~xCm71IRM$gr7!<lb@P<',
    database: 'shophub',
});
export default conn;