const express = require('express');
const app=express();
const con=require('./sqlConnection.js')

app.use(express.static(__dirname+'/public'));

const home=function(req,res) {
  res.render('home',{message:""});
};

const addComputer=function(req,res) {
	res.render('addComputer',{message:""});
};

const manageComputer=function(req,res) {
	res.render('manageComputer',{message:""});
};

const activeUser=function(req,res) {
	res.render('activeUsers',{message:""});
};

const oldUser=function(req,res) {
  res.render('oldUsers',{message:""});
};

const reports=function(req,res) {
	res.render('reports',{message:""});
};

const add=(req,res)=>{
	con.query('select * from computer where computerID=?',[req.params.computerID],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('addUsers',{items:rows});
    }
  });
};

const update=(req,res)=>{
  con.query('select * from computer where computerID=?',[req.params.computerID],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('updateComputer',{items:rows});
    }
  });
};

const updateUser=(req,res)=>{
  con.query('select *,date_format(start_time, "%Y-%m-%d %H:%i:%s") as "time" from users where computerID=?',[req.params.computerID],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('updateUser',{items:rows});
    }
  });
};

const deletecomputer=(req,res)=>{
  con.query('select * from computer where computerID=?',[req.params.computerID],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('deletecomputer',{items:rows});
    }
  });
};

const viewuser=(req,res)=>{
  con.query('select *,date_format(start_time, "%Y-%m-%d %H:%i:%s") as "startTime",date_format(logout_time, "%Y-%m-%d %H:%i:%s") as "endTime",TIMESTAMPDIFF(second,start_time, logout_time) as "TotTime",TIMESTAMPDIFF(second,start_time, logout_time)*0.02 as "amount" from users,computer where users.EntryID=? and computer.computerID=users.computerID;',[req.params.EntryID],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('viewUser',{items:rows});
    }
  });
};

const deleteuser=(req,res)=>{
  con.query('select * from computer where EntryID=?',[req.params.EntryID],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('deleteuser',{items:rows});
    }
  });
};


module.exports={
 deleteuser,viewuser,deletecomputer,home,addComputer,updateUser,manageComputer,activeUser,reports,add,oldUser,update
}
