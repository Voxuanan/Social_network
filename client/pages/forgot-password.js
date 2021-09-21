import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { useRouter } from "next/router";
import { UserContext } from "../context/index";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [state, setState] = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password, secret);
        setLoading(true);
        try {
            const { data } = await axios.post(`/forgot-password`, {
                email,
                newPassword,
                secret,
            });
            // console.log("forgot password res data =>", data);
            setOk(data.ok);
            setEmail("");
            setPassword("");
            setSecret("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data);
        }
    };

    // if (state && state.token) router.push("/");
    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>Forgot Password</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <ForgotPasswordForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        secret={secret}
                        setSecret={setSecret}
                        loading={loading}
                        page="forgot-password"
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
                        <p>Congratulation You can now login your password</p>
                        <Link href="/login">
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
