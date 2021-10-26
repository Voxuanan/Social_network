import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar } from "antd";
import moment from "moment";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { UserContext } from "../../context/index";
import Post from "../../components/cards/Post";
import { Modal } from "antd";
import CommentForm from "../../components/forms/CommentForm";

const PostComments = () => {
    const [state, setState] = useContext(UserContext);
    const [post, setPost] = useState({});
    const [comment, setComment] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentPost, setCurrentPost] = useState("");

    const router = useRouter();
    const _id = router.query._id;

    useEffect(() => {
        if (_id) fetchPost();
    }, [_id]);

    const fetchPost = async (req, res) => {
        try {
            const { data } = await axios.get(`/user-post/${_id}`);
            setPost(data);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleDelete = async (post) => {
        try {
            const answer = window.confirm("Are you sure you want to delete this post?");
            if (!answer) return;
            const { data } = await axios.delete(`/delete-post/${post._id}`);
            toast.success("Post deleted");
            router.push("/user/dashboard");
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleLike = async (post) => {
        try {
            const { data } = await axios.put(`/like-post`, { _id: post._id });
            fetchPost();
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleUnlike = async (post) => {
        try {
            const { data } = await axios.put(`/unlike-post`, { _id: post._id });
            fetchPost();
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleComment = async (post) => {
        setCurrentPost(post);
        setVisible(true);
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/add-comment", {
                postId: currentPost._id,
                comment,
            });
            setComment("");
            setVisible(false);
            fetchPost();
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const removeComment = async (postId, comment) => {
        let answer = window.confirm("Are you sure you want to remove this comment?");
        if (!answer) return;
        try {
            const { data } = await axios.put("/remove-comment", {
                postId,
                comment,
            });
            fetchPost();
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    return (
        <>
            {post && (
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="col-md-6 offset-md-3 pt-5">
                            <Post
                                post={post}
                                commentCount={100}
                                handleDelete={handleDelete}
                                handleLike={handleLike}
                                handleUnlike={handleUnlike}
                                handleComment={handleComment}
                                removeComment={removeComment}
                            />
                        </div>
                    </div>

                    <Link href="/user/dashboard">
                        <a className="d-flex justify-content-center pt-5 h4">
                            <RollbackOutlined />
                        </a>
                    </Link>

                    <Modal
                        title="Comment"
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        footer={null}
                    >
                        <CommentForm
                            comment={comment}
                            addComment={addComment}
                            setComment={setComment}
                        />
                    </Modal>
                </div>
            )}
        </>
    );
};

export default PostComments;
