import ParallaxBG from "../../../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic";
import Head from "next/head";

const SinglePost = ({ post }) => {
    const head = () => {
        return (
            <Head>
                <meta name="description" content={post.content}></meta>
                <meta property="og:description" content="Test social network"></meta>
                <meta property="og:type" content="Website"></meta>
                <meta property="og:site_name" content="MERNCAMP"></meta>
                <meta property="og:url" content={`http:/MERNCAMP.com/post/view/${post._id}`}></meta>
                {post && post.image && (
                    <meta
                        property="og:image:secure_url"
                        content={`http:/MERNCAMP.com/images/${post.image}`}
                    ></meta>
                )}
            </Head>
        );
    };
    return (
        <>
            {head()}
            <ParallaxBG url={"/images/default.jpg"}></ParallaxBG>
            <div className="container">
                <div className="row pt-5">
                    <div className="col-md-8 offset-md-2">
                        <PostPublic key={post._id} post={post} />
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    const { data } = await axios.get(`/post/${context.params._id}`);
    return {
        props: { post: data }, // will be passed to the page component as props
    };
}

export default SinglePost;
