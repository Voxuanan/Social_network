import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../context/index";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [state, setState] = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, secret);
        setLoading(true);
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
                email,
                password,
            });
            // console.log(data);
            // update context
            setState({ user: data.user, token: data.token });
            // save in localStorage
            window.localStorage.setItem("auth", JSON.stringify(data));
            setEmail("");
            setPassword("");
            setLoading(false);
            router.push("/");
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>Login Page</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <AuthForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        loading={loading}
                        page="login"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Don't have an account?
                        <Link href="/register">
                            <a> Register</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
