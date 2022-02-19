import renderHTML from "react-render-html";
import { Avatar } from "antd";
import PostImage from "../Images/PostImage";
import moment from "moment";
import {
    LikeOutlined,
    LikeFilled,
    CommentOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { useContext } from "react";
import { useRouter } from "next/router";

const PostPublic = ({
    post,
    handleDelete,
    handleLike,
    handleUnlike,
    handleComment,
    commentCount = 2,
    removeComment,
}) => {
    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    return (
        <>
            {post && post.postedBy && (
                <div key={post._id} className="card my-4">
                    <div className="card-header d-flex justify-content-between">
                        <div>
                            <Avatar size={40} src={post.postedBy?.image?.url}>
                                {post.postedBy.name[0]}
                            </Avatar>{" "}
                            <span className="pt-2 mx-2">{post.postedBy.name}</span>{" "}
                            <span className="pt-2 ">{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <div className="card-body">{renderHTML(post.content)}</div>
                    <div className="card-footer">
                        {post.image && <PostImage url={post.image.url}></PostImage>}
                        <div className="pt-2 d-flex">
                            {state &&
                            state.user &&
                            post.likes &&
                            post.likes.includes(state.user._id) ? (
                                <LikeFilled className="pt-3 h5 text-primary px-2" />
                            ) : (
                                <LikeOutlined className="pt-3 h5 text-secondary px-2" />
                            )}
                            <div className="pt-3" style={{ marginRight: "1rem" }}>
                                {post.likes.length} likes
                            </div>
                            <CommentOutlined className="pt-3 h5 text-secondary px-2 pointer" />
                            <div className="pt-3 ">
                                <p className="text-dark">{post.comments.length} comments</p>
                            </div>
                        </div>
                    </div>
                    {post.comments && post.comments.length > 0 && (
                        <ol
                            className="list-group"
                            style={{ maxHeight: "175px", overflowY: "auto" }}
                        >
                            {post.comments.slice(0, commentCount).map((c) => (
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-start"
                                    key={c._id}
                                >
                                    <div className="ms-w me-auto">
                                        <div>
                                            <Avatar
                                                size={25}
                                                className="mb-1 mr-3"
                                                src={c.postedBy?.image?.url}
                                            >
                                                {c.postedBy.name && c.postedBy.name[0]}
                                            </Avatar>
                                            <span className="pt-2 mx-2">{c.postedBy.name}</span>
                                        </div>

                                        <div className="text-muted">{c.text}</div>
                                    </div>
                                    <span className="badge rouded-pill text-muted">
                                        {moment(c.created).fromNow()}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            )}
        </>
    );
};

export default PostPublic;
