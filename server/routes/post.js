const express = require("express");
const { createPost, uploadImage } = require("../controllers/post");
const formidableMiddleware = require("express-formidable");

//middlewares
const { requireSignIn } = require("../middlewares/index");

const router = express.Router();

router.post("/create-post", requireSignIn, createPost);
router.post(
    "/upload-image",
    requireSignIn,
    formidableMiddleware({ maxFileSize: 5 * 1024 * 1024 }),
    uploadImage
);

module.exports = router;
