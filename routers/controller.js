const express=require('express');
const app=express();
const con=require('./sqlConnection.js');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const flash  = require('connect-flash');

const home=(req,res)=>{
  con.query('select * from computer',(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
        res.render('home',{title:'Computer Details',items:rows});
    }
  });
 } 

const manageComputer=(req,res)=>{
  con.query('select * from computer',(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('manageComputer',{title:'Computer Details',items:rows});
    }
  });
} 

const addComputer=(req,res)=>{
  let table=req.body;
  let checkComputerName=/^[a-zA-Z]+$/.test(req.body.ComputerName);
  let checkComputerId=/^[0-9]+$/.test(req.body.ComputerID);
  if(checkComputerName && checkComputerId)
  {
  con.query('insert into computer(computerID,computerName,computerIP,computer_status) values(? ,? ,? ,?)',[table.ComputerID,table.ComputerName,table.ComputerIP,"inactive"],(err,results,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      console.log('Inserted Successfully');
      res.redirect('/home');
    }
  });
  }
  else if(!checkComputerId)
  {
    console.log("Only Numbers are Accepted");
    res.redirect('/home');
  }
  else
  {
    console.log("Only Alphabets are Accepted");
    res.redirect('/home');
  }
}

const addUser=(req,res)=>{
  let tableUser=req.body;
  con.query('select * from users where Email=?',[req.body.Email],(err,results,fields)=>{
  if(results.length==0)
  {
  con.query('insert into users(Username,User_Address,Mobile_Number,Email,ID_proof,IdProof,computerID,user_status) values(? ,? ,? ,? ,? ,? ,?,?);update computer set computer_status="active" where computerID=?',[tableUser.Username,tableUser.UserAddress,tableUser.Mobile,tableUser.Email,tableUser.IDproofNo,tableUser.IDproof,tableUser.computerID,"active",tableUser.computerID],(err,results,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      console.log("Inserted Successfully");
      res.redirect("/home"); 
    }
  });
  }
  else
  {
  con.query('update users set Username=?,User_Address=?,Mobile_Number=?,Email=?,ID_proof=?,IdProof=?,computerID=?,user_status=? where Email=?;update computer set computer_status="active" where computerID=?',[tableUser.Username,tableUser.UserAddress,tableUser.Mobile,tableUser.Email,tableUser.IDproofNo,tableUser.IDproof,tableUser.computerID,"active",tableUser.Email,tableUser.computerID],(err,results,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      console.log("Inserted Successfully");
      res.redirect("/home"); 
    }
  }); 
  }
});
}

const activeUser=(req,res)=>{
  con.query('select *,date_format(start_time, "%Y-%m-%d %H:%i:%s") as "time" from users where user_status="active"',(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('activeUsers',{items:rows});
    }
  });
}

const oldUser=(req,res)=>{
  con.query('select * from users,computer where users.computerID=computer.computerID and users.user_status="inactive"',(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('oldUser',{items:rows});
    }
  });
}

const updateComputer=(req,res)=>{
  const tableComputer=req.body;

  con.query('update computer set computerName=?, computerIP=? where computerID=?',[tableComputer.ComputerName,tableComputer.ComputerIP,req.params.computerID],(err,results,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      console.log("Updated Successfully");
      res.redirect("/manageComputer"); 
    }
  });
}

const updateUser=(req,res)=>{
  const tableUser=req.body;

  con.query('update users set user_status=? where computerID=?;update computer set computer_status=? where computerID=?',["inactive",req.params.computerID,"inactive",req.params.computerID],(err,results,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      console.log("Updated Successfully");
      res.redirect("/oldUser"); 
    }
  });
}

const searchResults=(req,res)=>{
  const tablesearch=req.body;
  con.query('select * from users where logout_time between ? and ? and user_status=?',[tablesearch.search,tablesearch.searchDate,"inactive"],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('reports',{items:rows});
    }
  });
}
const searchResults1=(req,res)=>{
  const tablesearch=req.body;
  con.query('select * from users where computerID=? and user_status=?',[tablesearch.search,"inactive"],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('oldUser',{items:rows});
    }
  });
}
const searchResults2=(req,res)=>{
  const tablesearch=req.body;
  con.query('select * from computer where computerID=?',[tablesearch.search],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('manageComputer',{items:rows});
    }
  });
};

const searchResultsget=(req,res)=>{
  const tablesearch=req.body;
  con.query('select * from users,computer where users.computerID=computer.computerID and users.user_status="inactive"',(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('reports',{items:rows});
    }
  });
}
const searchResultsget2=(req,res)=>{
  const tablesearch=req.body;
  con.query('select * from users',(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('oldUser',{items:rows});
    }
  });
}
const searchResultsget1=(req,res)=>{
  const tablesearch=req.body;
  con.query('select * from computer',(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.render('manageComputer',{items:rows});
    }
  });
};

const deletecomputer=(req,res)=>{
    con.query('delete from computer where computerID=?',[req.params.computerID],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.redirect('/manageComputer');
    }
  });
}

const deleteUser=(req,res)=>{
    con.query('delete from users where EntryID=?',[req.params.EntryID],(err,rows,fields)=>{
    if(err)
    {
      console.log(err);
    }      
    else
    {
      res.redirect('/oldUser');
    }
  });
}

 module.exports={
  searchResultsget2,
  searchResultsget1,
  searchResultsget,
  searchResults,
  searchResults1,
  searchResults2,
 	home,
  deleteUser,
 	manageComputer,
 	addComputer,
  addUser,
  updateComputer,
  activeUser,
  oldUser,
  updateUser,
  deletecomputer,
 };