import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
    handleSubmit,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    secret,
    setSecret,
    loading,
    page,
}) => {
    return (
        <form onSubmit={handleSubmit}>
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
                    <label className="text-muted">New password</label>
                </small>
                <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    type="password"
                    className="form-control"
                    placeholder="Enter new Password"
                />
            </div>

            <>
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
            </>

            <div className="form-group p-2">
                <button
                    disabled={!email || !secret || !newPassword}
                    className="btn btn-primary col-12"
                >
                    {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
