import mysql from 'mysql2';
const conn = mysql.createPool({
    host: '183.83.189.23',
    port: 3306,
    user: 'nawin',
    password: 'W#j&QIKttV^pq}ZCyuh6W$b{x',
    database: 'nawin',
});
export default conn;