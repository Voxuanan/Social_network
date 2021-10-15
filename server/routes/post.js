const express = require("express");
const {
    createPost,
    uploadImage,
    postsByUser,
    userPost,
    updatePost,
    deletePost,
    newsFeed,
} = require("../controllers/post");
const formidableMiddleware = require("express-formidable");

//middlewares
const { requireSignIn, canEditDeletePost } = require("../middlewares/index");

const router = express.Router();

router.post("/create-post", requireSignIn, createPost);
router.post(
    "/upload-image",
    requireSignIn,
    formidableMiddleware({ maxFileSize: 5 * 1024 * 1024 }),
    uploadImage
);
router.get("/user-posts", requireSignIn, postsByUser);
router.get("/user-post/:_id", requireSignIn, userPost);
router.put("/update-post/:_id", requireSignIn, canEditDeletePost, updatePost);
router.delete("/delete-post/:_id", requireSignIn, canEditDeletePost, deletePost);
router.get("/news-feed", requireSignIn, newsFeed);

module.exports = router;
