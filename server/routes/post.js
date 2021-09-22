const express = require("express");
const { createPost } = require("../controllers/post");
//middlewares
const { requireSignIn } = require("../middlewares/index");

const router = express.Router();

router.post("/create-post", requireSignIn, createPost);

module.exports = router;
