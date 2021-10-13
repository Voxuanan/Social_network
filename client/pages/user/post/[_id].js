import { useRouter } from "next/router";
import { UserContext } from "../../../context/index";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PostForm from "../../../components/forms/PostForm";
import UserRoute from "../../../components/routes/UserRoute";
import PostList from "../../../components/cards/PostList";

import { toast } from "react-toastify";

const EditPost = () => {
    const [state, setState] = useContext(UserContext);
    const [post, setPost] = useState({});
    const [content, setContent] = useState("");
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);

    const router = useRouter();
    // console.log("router =>",router);
    const _id = router.query._id;

    useEffect(() => {
        if (_id) fetchPost();
    }, [_id]);

    const fetchPost = async () => {
        try {
            const { data } = await axios.get(`/user-post/${_id}`);
            // console.log(data);
            setContent(data.content);
            setImage(data.image);
            setPost(data);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const postSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/update-post/${_id}`, { content, image });
            toast.success("Update post successfully");
            router.push("/user/dashboard");
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

    return state && state.user && post && post.postedBy && state.user._id != post.postedBy._id ? (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>Newsfeed</h1>
                </div>
            </div>

            <div className="row py-3">
                <div className="col-md-8 offset-md-2">
                    <PostList posts={[post]} />
                </div>
            </div>
        </div>
    ) : (
        <UserRoute>
            <div className="container-fluid">
                <div className="row py-5 bg-default-image text-light">
                    <div className="col text-center">
                        <h1>Newsfeed</h1>
                    </div>
                </div>

                <div className="row py-3">
                    <div className="col-md-8 offset-md-2">
                        <PostForm
                            handleSubmit={postSubmit}
                            content={content}
                            setContent={setContent}
                            handleImage={handleImage}
                            uploading={uploading}
                            image={image}
                        />
                    </div>
                </div>
            </div>
        </UserRoute>
    );
};

export default EditPost;
