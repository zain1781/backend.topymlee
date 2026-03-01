const express = require("express");
const router = express.Router();
const { createMessage, AllMessages ,DeleteMessage } = require("../controllers/message.controller.js");
router.post("/", createMessage); // Route to create a new message
router.get("/", AllMessages);
router.delete("/:id", DeleteMessage); // Route to delete a message by ID    
module.exports = router;