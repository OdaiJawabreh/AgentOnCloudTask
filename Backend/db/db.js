const mysql = require("mysql2")
require("dotenv").config()

const connection = mysql.createConnection({
  host: 5000,
  user: "root",
  password: "0000",
  database: "appointmentBooking",
})

connection.connect((err)=>{
  if(err){
    console.log("error connecting: " + err.stack);
  }
  // console.log(connection);
  console.log("connected as id=> " + connection.threadId);
})

module.exports=connection