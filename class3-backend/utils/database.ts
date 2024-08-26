const mysql = require('mysql')
export let database = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "zxcvbnm123.",
    database: "wx-search"
});