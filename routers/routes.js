const express=require('express');
const routes=require('./pages.js');
const router=express.Router();

router.get('/home',routes.home);
router.get('/addComputer',routes.addComputer);
router.get('/manageComputer',routes.manageComputer);
router.get('/activeUser',routes.activeUser);
router.get('/oldUser',routes.oldUser);
router.get('/reports',routes.reports);
router.get('/addUser/:computerID',routes.add);
router.get('/updateComputer/:computerID',routes.update);
router.get('/updateUser/:computerID',routes.updateUser);
router.get('/manageComputer/:computerID',routes.deletecomputer);
router.get('/viewUser/:EntryID',routes.viewuser);
router.get('/manageUser/:EntryID',routes.deletecomputer);

module.exports=router;
