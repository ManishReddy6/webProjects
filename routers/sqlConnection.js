const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Manish/2001',
  database: 'adminDB'
});

con.connect((err)=>{
  if(err)
  {
    throw err;
  }  
  else
  {
    console.log("mysql connected...");
  }
});

module.exports=con;