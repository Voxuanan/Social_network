import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/link";
import AuthForm from "../../../components/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../../../context/index";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";

const ProfileUpdate = () => {
    const [username, setUsername] = useState("");
    const [about, setAbout] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [state, setState] = useContext(UserContext);

    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (state && state.user) {
            if (state.user.username) setUsername(state.user.username);
            if (state.user.about) setAbout(state.user.about);
            if (state.user.email) setEmail(state.user.email);
            if (state.user.name) setName(state.user.name);
            if (state.user.image) setImage(state.user.image);
        }
    }, [state && state.user]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, secret);
        setLoading(true);
        try {
            const { data } = await axios.put(`/profile-update`, {
                username,
                about,
                name,
                email,
                password,
                secret,
                image,
            });

            // update local storage
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({ ...state, user: data });

            setOk(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>Profile</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <label className="d-flex justify-content-center h2 mt-3">
                        {uploading ? (
                            <LoadingOutlined className="mt-2" />
                        ) : image && image.url ? (
                            <Avatar src={image.url} size={100} className="mt-1" />
                        ) : (
                            <CameraOutlined className="mt-2" />
                        )}

                        <input onChange={handleImage} type="file" accept="image/*" hidden />
                    </label>

                    <AuthForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        secret={secret}
                        setSecret={setSecret}
                        loading={loading}
                        username={username}
                        setUsername={setUsername}
                        about={about}
                        setAbout={setAbout}
                        uploading={uploading}
                        page="profile/update"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Modal
                        title="Congratulation"
                        visible={ok}
                        onCancel={() => setOk(false)}
                        footer={null}
                    >
                        <p>You have successfully update profile</p>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;
