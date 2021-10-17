const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const postSchema = new Schema(
    {
        content: {
            type: {},
            required: true,
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        image: {
            url: String,
            public_id: String,
        },
        likes: [{ type: ObjectId, ref: "User" }],
        comments: [
            {
                text: String,
                created: { type: Date, default: Date.now },
                postedBy: { type: ObjectId, ref: "User" },
            },
        ],
    },
    { timestamps: true }
);

module.exports = Post = mongoose.model("Post", postSchema);
