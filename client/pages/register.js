import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, secret);
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
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
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-secondary text-light">
                <div className="col text-center">
                    <h1>Register Page</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Your name</label>
                            </small>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                            />
                        </div>

                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Email address</label>
                            </small>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                            />
                        </div>

                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Password</label>
                            </small>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                            />
                        </div>

                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Gender</label>
                            </small>
                            <select className="form-select">
                                <option>What is your favorite color?</option>
                                <option>What is your best friend's name?</option>
                                <option>What city you were born?</option>
                            </select>

                            <small className="form-text text-muted">
                                You can use this to reset your password if forgotten
                            </small>
                        </div>

                        <div className="form-group p-2">
                            <input
                                onChange={(e) => setSecret(e.target.value)}
                                value={secret}
                                type="text"
                                className="form-control"
                                placeholder="Write your answer here"
                            />
                        </div>

                        <div className="form-group p-2">
                            <button
                                disabled={!name || !email || !secret || !password}
                                className="btn btn-primary col-12"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
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
