var mysql = require('mysql');
// buat koneksi database
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbnode'
});

conn.connect((err)=>{
    if(err)throw err;
    console.log("koneksi berjalan")
})
module.exports = conn;