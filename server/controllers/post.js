const Post = require("../models/post");
var cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPost = async (req, res) => {
    try {
        const { content, image } = req.body;
        if (!content.length) return res.status(400).send("Content is required");
        const post = new Post({ content, postedBy: req.user._id, image });
        post.save();
        return res.json(post);
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path);
        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const postsByUser = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("postedBy", "_id name image")
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(posts);
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const userPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params._id).populate("postedBy", "_id name image");
        res.json(post);
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const updatePost = async (req, res) => {
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
        return res.json({ ok: true });
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const newsFeed = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        let following = user.following;
        following.push(req.user._id);

        const posts = await Post.find({ postedBy: { $in: following } })
            .populate("postedBy", "_id name image")
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(posts);
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};
