const Post = require("../models/post");
var cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPost = async (req, res) => {
    // console.log("POST =>", req.body);
    try {
        const { content, image } = req.body;
        if (!content.length) return res.status(400).send("Content is required");
        const post = new Post({ content, postedBy: req.user._id, image });
        post.save();
        return res.json(post);
    } catch (error) {
        console.log("POST ERROR =>", error);
        res.status(400).send("Error, please try again");
    }
};

export const uploadImage = async (req, res) => {
    // console.log("UPLOAD IMAGE =>", req.files);
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path);
        // console.log("UPLOAD IMAGE RESULT =>", result);
        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        console.log("UPLOAD IMAGE ERROR =>", error);
        res.status(400).send("Error, please try again");
    }
};

export const postsByUser = async (req, res) => {
    try {
        // const posts = await Post.find({ postedBy: req.user._id })
        const posts = await Post.find()
            .populate("postedBy", "_id name image")
            .sort({ createdAt: -1 })
            .limit(10);
        // console.log("posts", posts);
        res.json(posts);
    } catch (error) {
        console.log("POSTS BY USER ERROR =>", error);
        res.status(400).send("Error, please try again");
    }
};

export const userPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params._id).populate("postedBy", "_id name image");
        // console.log(JSON.stringify(post, null, 2));
        // console.log(req.user);
        res.json(post);
    } catch (error) {
        console.log("USER POST ERROR =>", error);
        res.status(400).send("Error, please try again");
    }
};

export const updatePost = async (req, res) => {
    // console.log("UPDATE POST", req.body);
    try {
        let post = await Post.findById(req.params._id);
        if (post.image && post.image.public_id) {
            const image = await cloudinary.uploader.destroy(post.image.public_id);
        }
        post = await Post.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
        });
        return res.json(post);
    } catch (error) {
        console.log("UPDATE POST ERROR =>", error);
        res.status(400).send("Error, please try again");
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params._id);
        // remove imagfe
        if (post.image && post.image.public_id) {
            const image = await cloudinary.uploader.destroy(post.image.public_id);
        }
        console.log("ok");
        return res.json({ ok: true });
    } catch (error) {
        console.log("DELETE POST ERROR =>", error);
        res.status(400).send("Error, please try again");
    }
};
