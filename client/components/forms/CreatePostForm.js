import { Avatar } from "antd";
// import ReactQuill from "react-quill";
// the way to import some npm using by client only
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CreatePostForm = ({ content, setContent, handleSubmit }) => {
    return (
        <div className="card">
            <div className="card-body pb-3">
                <form className="form-group">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        className="form-control"
                        placeholder="How are you today?"
                        style={{ resize: "none" }}
                        onChange={(e) => {
                            setContent(e);
                        }}
                    />
                </form>
            </div>
            <div className="card-footer">
                <button
                    disabled={!content}
                    className="btn btn-primary btn-sm mt-1"
                    onClick={handleSubmit}
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default CreatePostForm;
