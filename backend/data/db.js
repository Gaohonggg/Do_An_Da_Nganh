const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "SmartHome"
}).promise();

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

module.exports = connection;