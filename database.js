const mysql = require("mysql2");

// configurations for creating mysql connection
const connection = mysql.createConnection({
  host: 'localhost',     // host for connection
  port: 3306,            // default port for mysql is 3306
  database: 'foodwaste',      // database from which we want to connect our node application
  user: 'root',          // username of the mysql connection
  password: 'sanjitkour@gmail.com9149'       // password of the mysql connection
});

// executing connection
connection.connect(function(err) {
  if (err) {
      console.log("error occurred while connecting",err);
  } else {
      console.log("connection created with mysql successfully");
  }
});

connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM user_table", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  var sql = "insert into user_table(username,email,phone_number,address,password) values ('Harsh','hp','1234','abc','xy12');";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

// Export the database connection to use in other files
module.exports = db;
