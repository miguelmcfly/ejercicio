var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',     
  password: 'ewdigio01',     
  port: '3308',
  database: 'prospectos' 
}); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Conectado a BD');
});
module.exports = conn;