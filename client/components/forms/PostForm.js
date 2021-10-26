import { Avatar } from "antd";
// import ReactQuill from "react-quill";
// the way to import some npm using by client only
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";

const PostForm = ({ content, setContent, handleSubmit, handleImage, image, uploading }) => {
    return (
        <div className="card">
            <div className="card-body pb-3">
                <form className="form-group">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        className="form-control"
                        placeholder="How are you today?"
                        onChange={(e) => {
                            setContent(e);
                        }}
                    />
                </form>
            </div>

            <div className="card-footer d-flex justify-content-between text-muted">
                <button
                    disabled={!content || uploading}
                    className="btn btn-primary btn-sm mt-1"
                    onClick={handleSubmit}
                >
                    Post
                </button>

                <label>
                    {uploading ? (
                        <LoadingOutlined className="mt-2" />
                    ) : image && image.url ? (
                        <Avatar src={image.url} size={30} className="mt-1" />
                    ) : (
                        <CameraOutlined className="mt-2" />
                    )}

                    <input onChange={handleImage} type="file" accept="image/*" hidden />
                </label>
            </div>
        </div>
    );
};

export default PostForm;
