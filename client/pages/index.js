import { useState, useContext, userEffects } from "react";
import { UserContext } from "../context/index";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";

const Home = ({ posts }) => {
    const [state, setState] = useContext(UserContext);
    const head = () => {
        return (
            <Head>
                <meta name="description" content="Test social network"></meta>
                <meta property="og:description" content="Test social network"></meta>
                <meta property="og:type" content="Website"></meta>
                <meta property="og:site_name" content="MERNCAMP"></meta>
                <meta property="og:url" content="http:/MERNCAMP.com"></meta>
                <meta
                    property="og:image:secure_url"
                    content="http:/MERNCAMP.com/images/default.jpg"
                ></meta>
            </Head>
        );
    };
    return (
        <>
            {head()}
            <ParallaxBG url={"/images/default.jpg"}></ParallaxBG>
            <div className="container">
                <div className="row pt-5">
                    {posts.map((post) => (
                        <div className="col-md-4">
                            <Link href={`post/view/${post._id}`}>
                                <a>
                                    <PostPublic key={post._id} post={post} />
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    const { data } = await axios.get("/posts");
    return {
        props: { posts: data }, // will be passed to the page component as props
    };
}

export default Home;
