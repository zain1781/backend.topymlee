const express = require('express');

const router = express.Router();
const { validateSignup } = require('../middleware/secure.js');

const { signup ,getAllUsers,Loginuser,Deleteuser,userbyid,updateuser,resetPass ,NewPass} = require('../controllers/user.controller.js');



router.post('/signup',validateSignup, signup);
router.post('/login', Loginuser);
router.get('/', getAllUsers);
router.delete('/:id', Deleteuser);
router.get('/:id', userbyid);
router.put('/:id', updateuser);
router.post("/reset",resetPass)
router.post("/newpass", NewPass)
module.exports = router