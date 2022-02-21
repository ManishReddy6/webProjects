const express = require('express');
const app=express();
const con=require('./routers/sqlConnection.js');
const controller=require('./routers/controller.js');

require('dotenv').config();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res) {
  res.render('login',{message:""});
});

app.get('/forgotPassword',function(req,res) {
  res.render('password',{message:""});
});

app.post('/forgotPassword',function(req,res) {
  forgot=req.body;
  if(forgot.pass!='' && forgot.username!='')
  {
  if(forgot.pass==forgot.password)
  {
    con.query('update ccAdmin set pass=? where username = ?',[forgot.pass,forgot.username],(err,rows,fields)=>{
      res.render('login');
    })
  }
  else
  {
    res.render('password',{message:"passwords do not match"});
  }
}
  else
  {
   res.render('password',{message:"Enter The details"}); 
  }
});

app.post('/', (req,res)=>{
  const username=req.body.username;

  const pass=req.body.pass;
  con.query('select * from ccAdmin where username = ? and pass = ?',[username,pass],(err,results,fields)=>{
    if(results.length>0)
    {
      res.redirect("/home");
      res.render("nav",{items:results});
    }
    else
    {
      res.render('login',{message:'Invalid Username or Password'});
    }
  });
});

app.post('/home',controller.addComputer);

app.post('/updateComputer/:computerID',controller.updateComputer);

app.get('/home',controller.home);

app.get('/manageComputer',controller.manageComputer);

app.post('/addUser/:computerID',controller.addUser);

app.post('/updateUser/:computerID',controller.updateUser);

app.get('/manageComputer/:computerID',controller.deletecomputer);

app.get('/manageUser/:EntryID',controller.deleteUser);

app.get('/activeUser',controller.activeUser);

app.get('/oldUser',controller.oldUser);

app.post('/reports',controller.searchResults);

app.post('/oldUser',controller.searchResults1);

app.post('/manageComputer',controller.searchResults2);

app.get('/reports',controller.searchResultsget);

app.get('/oldUser',controller.searchResultsget2);

app.get('/manageComputer',controller.searchResultsget1);

app.use('/',require('./routers/routes'));

let port=process.env.PORT || 5050;
app.listen(port,()=>{
  console.log('Running at port 5050');
});