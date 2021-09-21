import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../context/index";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [state, setState] = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, secret);
        setLoading(true);
        try {
            const { data } = await axios.post(`/register`, {
                name,
                email,
                password,
                secret,
            });
            setOk(data.ok);
            setName("");
            setEmail("");
            setPassword("");
            setSecret("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data);
        }
    };

    if (state && state.token) router.push("/");
    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>Register Page</h1>
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
                        page="register"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Already register?
                        <Link href="/login">
                            <a> Login</a>
                        </Link>
                    </p>
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
                        <p>You have successfully register</p>
                        <Link href="/login">
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Register;
