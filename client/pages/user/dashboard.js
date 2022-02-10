import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/index";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { Modal, Pagination } from "antd";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import Link from "next/link";
import CommentForm from "../../components/forms/CommentForm";
import { route } from "next/dist/server/router";
import Search from "../../components/Search";

const dashboard = () => {
    const [state, setState] = useContext(UserContext);

    const [content, setContent] = useState("");
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    const [people, setPeople] = useState([]);
    const [total, setTotal] = useState(0);

    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentPost, setCurrentPost] = useState("");
    const [page, setPage] = useState(1);

    const router = useRouter();
    useEffect(() => {
        if (state && state.token) {
            findPeople();
            totalPosts();
            newsFeed();
        }
    }, [state && state.token, page]);

    const totalPosts = async (req, res) => {
        try {
            const { data } = await axios.get("/total-posts");
            setTotal(data);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const newsFeed = async (req, res) => {
        try {
            const { data } = await axios.get(`/news-feed/${page}`);
            setPosts(data);
            // console.log("POST BY USER =>", data);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const findPeople = async (req, res) => {
        try {
            const { data } = await axios.get("/find-people");
            setPeople(data);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const postSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/create-post", { content, image });
            // console.log("CREATE POST RESPONSE =>", data);
            newsFeed();
            setImage({});
            setContent("");
            toast.success("Post successfully");
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        // console.log([...formData]);
        setUploading(true);
        try {
            const { data } = await axios.post("/upload-image", formData);
            // console.log("UPLOAD IMAGE RESPONSE =>", data);
            setUploading(false);
            setImage({
                url: data.url,
                public_id: data.public_id,
            });
        } catch (error) {
            setUploading(false);
            toast.error(error.response?.data);
        }
    };

    const handleDelete = async (post) => {
        try {
            const answer = window.confirm("Are you sure you want to delete this post?");
            if (!answer) return;
            const { data } = await axios.delete(`/delete-post/${post._id}`);
            toast.success("Post deleted");
            newsFeed();
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleFollow = async (user) => {
        try {
            const { data } = await axios.put(`/user-follow`, { _id: user._id });
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({ ...state, user: data });
            toast.success(`Following "${user.name}"`);
            let filtered = people.filter((person) => person._id !== user._id);
            setPeople(filtered);
            newsFeed();
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleLike = async (post) => {
        try {
            const { data } = await axios.put(`/like-post`, { _id: post._id });
            newsFeed();
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleUnlike = async (post) => {
        try {
            const { data } = await axios.put(`/unlike-post`, { _id: post._id });
            newsFeed();
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
            newsFeed();
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
            newsFeed();
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    return (
        <UserRoute>
            <div className="container-fluid">
                <div className="row py-5 bg-default-image text-light">
                    <div className="col text-center">
                        <h1>Newsfeed</h1>
                    </div>
                </div>

                <div className="row py-3">
                    <div className="col-md-8 px-4">
                        <PostForm
                            handleSubmit={postSubmit}
                            content={content}
                            setContent={setContent}
                            handleImage={handleImage}
                            uploading={uploading}
                            image={image}
                        />

                        <PostList
                            posts={posts}
                            handleDelete={handleDelete}
                            handleLike={handleLike}
                            handleUnlike={handleUnlike}
                            handleComment={handleComment}
                            removeComment={removeComment}
                        />

                        <div className="d-flex justify-content-center  ">
                            <Pagination
                                current={page}
                                total={total}
                                onChange={(value) => setPage(value)}
                                className="pb-5"
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <Search></Search>
                        <br />
                        {state && state.user && state.user.following && (
                            <Link href={"/user/following"}>
                                <a className="h6 pt-2">{state.user.following.length} following</a>
                            </Link>
                        )}
                        <a className="h6 d-block pt-2">People you may know</a>
                        <People people={people} handleFollow={handleFollow} />
                    </div>
                </div>

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
        </UserRoute>
    );
};

export default dashboard;
