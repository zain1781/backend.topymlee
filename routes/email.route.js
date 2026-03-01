const express = require("express")

const router = express.Router();
const  {emailusers} = require("../controllers/email.controller.js")

router.post("/email",emailusers)

module.exports = router;