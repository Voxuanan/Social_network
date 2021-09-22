import { useContext, useState } from "react";
import { UserContext } from "../../context/index";
import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const dashboard = () => {
    const [state, setState] = useContext(UserContext);

    const [content, setContent] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/create-post", { content });
            console.log("CREATE POST RESPONSE =>", data);
            setContent("");
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
                    <div className="col-md-8">
                        <CreatePostForm
                            handleSubmit={handleSubmit}
                            content={content}
                            setContent={setContent}
                        />
                    </div>
                    <div className="col-md-4">Sidebr</div>
                </div>
            </div>
        </UserRoute>
    );
};

export default dashboard;
