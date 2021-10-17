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

const PostList = ({ posts, handleDelete, handleLike, handleUnlike }) => {
    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    return (
        <>
            {posts.map((post) => (
                <div key={post._id} className="card my-4">
                    <div className="card-header d-flex justify-content-between">
                        <div>
                            <Avatar size={40} src={post.postedBy?.image?.url}>
                                {post.postedBy.name[0]}
                            </Avatar>{" "}
                            <span className="pt-2 mx-2">{post.postedBy.name}</span>{" "}
                            <span className="pt-2 ">{moment(post.createdAt).fromNow()}</span>
                        </div>
                        {state && state.user && state.user._id === post.postedBy._id && (
                            <div>
                                <EditOutlined
                                    onClick={() => {
                                        router.push(`/user/post/${post._id}`);
                                    }}
                                    className="pt-2 ml-3 h5 text-success px-3"
                                />
                                <DeleteOutlined
                                    className="pt-2 ml-3 h5 text-danger px-3"
                                    onClick={() => handleDelete(post)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="card-body">{renderHTML(post.content)}</div>
                    <div className="card-footer">
                        {post.image && <PostImage url={post.image.url}></PostImage>}
                        <div className="pt-2 d-flex">
                            {post.likes.includes(state.user._id) ? (
                                <LikeFilled
                                    className="pt-3 h5 text-primary px-2"
                                    onClick={() => {
                                        handleUnlike(post);
                                    }}
                                />
                            ) : (
                                <LikeOutlined
                                    className="pt-3 h5 text-secondary px-2"
                                    onClick={() => {
                                        handleLike(post);
                                    }}
                                />
                            )}
                            <div className="pt-3" style={{ marginRight: "1rem" }}>
                                {post.likes.length} likes
                            </div>
                            <CommentOutlined className="pt-3 h5 text-secondary px-2" />
                            <div className="pt-3">{post.comments.length}comments</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostList;
