import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import Head from "next/head";
import { UserProvider } from "../context/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Head>
                <link rel="stylesheet" href="/css/style.css" />
            </Head>
            <Nav />
            <ToastContainer position="top-right" />
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default MyApp;
