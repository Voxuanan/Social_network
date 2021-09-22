import Post from "../models/post";
export const createPost = async (req, res) => {
    // console.log("POST =>", req.body);
    try {
        const { content } = req.body;
        if (!content.length) return res.status(400).send("Content is required");
        const post = new Post({ content, postedBy: req.user._id });
        post.save();
        return res.json(post);
    } catch (error) {
        console.log("POST ERROR =>", error);
        res.status(400).send("Error, please try again");
    }
};
