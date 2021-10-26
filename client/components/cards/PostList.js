import renderHTML from "react-render-html";
import { Avatar } from "antd";
import PostImage from "../Images/PostImage";
import moment from "moment";
import {
    LikeOutlined,
    LikeFilled,
    CommentOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Post from "../../components/cards/Post";

const PostList = ({
    posts,
    handleDelete,
    handleLike,
    handleUnlike,
    handleComment,
    removeComment,
}) => {
    return (
        <>
            {posts.map((post) => (
                <Post
                    key={post._id}
                    post={post}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                    handleComment={handleComment}
                    handleUnlike={handleUnlike}
                    removeComment={removeComment}
                />
            ))}
        </>
    );
};

export default PostList;
