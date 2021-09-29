import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/index";
import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";

const dashboard = () => {
    const [state, setState] = useContext(UserContext);

    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);

    const router = useRouter();
    useEffect(() => {
        if (state && state.token) fetchUserPosts();
    }, [state && state.token]);

    const fetchUserPosts = async (req, res) => {
        try {
            const { data } = await axios.get("/user-posts");
            setPosts(data);
            console.log("POST BY USER =>", data);
        } catch (error) {}
    };

    const postSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/create-post", { content, image });
            // console.log("CREATE POST RESPONSE =>", data);
            fetchUserPosts();
            setImage({});
            setContent("");
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

    return (
        <UserRoute>
            <div className="container-fluid">
                <div className="row py-5 bg-default-image text-light">
                    <div className="col text-center">
                        <h1>Newsfeed</h1>
                    </div>
                </div>

                <div className="row py-3">
                    <div className="col-md-8">
                        <CreatePostForm
                            handleSubmit={postSubmit}
                            content={content}
                            setContent={setContent}
                            handleImage={handleImage}
                            uploading={uploading}
                            image={image}
                        />

                        <PostList posts={posts} />
                    </div>

                    {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}

                    <div className="col-md-4">Sidebr</div>
                </div>
            </div>
        </UserRoute>
    );
};

export default dashboard;
