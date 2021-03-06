import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    secret,
    setSecret,
    loading,
    username,
    setUsername,
    about,
    setAbout,
    uploading,
    page,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {page === "profile/update" && (
                <div className="form-group p-2">
                    <small>
                        <label className="text-muted">Username</label>
                    </small>
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                    />
                </div>
            )}

            {page !== "login" && (
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
            )}

            <div className="form-group p-2">
                <small>
                    <label className="text-muted">Email address</label>
                </small>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    disabled={page === "profile/update"}
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

            {page !== "login" && (
                <>
                    <div
                        className="form-group m-2"
                        style={{
                            borderRadius: ".25rem",
                            border: "1px solid #ced4da",
                        }}
                    >
                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Pick a question</label>
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
                    </div>
                </>
            )}

            {page === "profile/update" && (
                <div className="form-group p-2">
                    <small>
                        <label className="text-muted">About</label>
                    </small>
                    <input
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}
                        type="text"
                        className="form-control"
                        placeholder="Enter About"
                    />
                </div>
            )}

            <div className="form-group p-2">
                <button
                    disabled={
                        page === "profile/update"
                            ? loading || uploading
                            : page === "login"
                            ? !email || !password
                            : !name || !email || !secret || !password
                    }
                    className="btn btn-primary col-12"
                >
                    {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default AuthForm;
