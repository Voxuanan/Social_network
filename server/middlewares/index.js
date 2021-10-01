const expressJwt = require("express-jwt");
const Post = require("../models/post");

export const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

export const canEditDeletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        // console.log(post.postedBy._id);
        if (post.postedBy._id == req.user._id) {
            next();
        } else return res.status(400).send("Unauthorized");
    } catch (error) {}
};
