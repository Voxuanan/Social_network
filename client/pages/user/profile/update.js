import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../../../components/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../../../context/index";

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
    useEffect(() => {
        if (state && state.user) {
            if (state.user.username) setUsername(state.user.username);
            if (state.user.about) setAbout(state.user.about);
            if (state.user.email) setEmail(state.user.email);
            if (state.user.name) setName(state.user.name);
        }
    }, [state && state.user]);

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
