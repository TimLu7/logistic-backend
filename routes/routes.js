const express = require('express');
const myDB=require('mongodb');
const { ObjectId } = require('mongodb');

const PORT = process.env.PORT || 3000;

const router = express.Router();
const dbFunctions = require('../db/dbFunctions');
// The route definitions for get, post and delete

router.get('/api/allnames', async (req, res) => {
  try {
    if(!req.session.login){
      res.redirect("/?msg=login needed");
      return;
    }
    const docs = await dbFunctions.getAllDocs();
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/login', async (req, res) => {
  let data = req.body;

  let user=await dbFunctions.findUser(data.username);
  if(user){
    if(user.password==data.password){
      req.session.user = user;
      req.session.login=true;
      if(user.position=="manager"){
        res.redirect("/manager.html");
      }else{

      }
    }else{
      res.redirect("/?msg=wrong password");
    }
  }else{
    res.redirect("/?msg=user not exists");
  }
});

router.post('/api/register', async (req, res) => {
  let data = req.body;
  //console.log("register:"+data);
  try{
    if(await dbFunctions.findUser(data.username)){
      res.redirect("/register.html?msg=user already exist");
    }else{
      await dbFunctions.addUser(data);
      res.redirect("/?msg=register succeed");
    }
  }catch(err){
    console.error('# Post Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/addname', async (req, res) => {
  if(!req.session.login){
    res.redirect("/?msg=login needed");
    return;
  }
  let data = req.body;
  console.log(req.body);
  try {
    data = await dbFunctions.addDoc(data);
    res.json(data);
  } catch (err) {
    console.error('# Post Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});
router.delete('/api/deletename/:id', async (req, res) => {
  if(!req.session.login){
    res.redirect("/?msg=login needed");
    return;
  }
  const id = req.params.id;
  console.log(id);
  console.log(ObjectId.isValid(id));
  let respObj = {};

  if (id && ObjectId.isValid(id)) {
    try {
      respObj = await dbFunctions.deleteDoc(id);
    } catch (err) {
      console.error('# Delete Error', err);
      res.status(500).send({ error: err.name + ', ' + err.message });
      return;
    }
  } else {
    respObj = { message: 'Data not deleted; the id to delete is not valid!' };
  }

  res.json(respObj);
});

module.exports = router;
