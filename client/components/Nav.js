import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context/index";

const Nav = () => {
    const [current, setCurrent] = useState("");
    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logOut = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    };
    return (
        <nav className="nav  d-flex justify-content-end" style={{ backgroundColor: "#0d6efd" }}>
            <Link href="/">
                <a className={`nav-link text-light logo ${current === "/" && "active"}`}>Home</a>
            </Link>

            {state === null ? (
                <>
                    <Link href="/login">
                        <a className={`nav-link text-light ${current === "/login" && "active"}`}>
                            Login
                        </a>
                    </Link>

                    <Link href="/register">
                        <a className={`nav-link text-light ${current === "/register" && "active"}`}>
                            Register
                        </a>
                    </Link>
                </>
            ) : (
                <>
                    <Link href="/user/dashboard">
                        <a
                            className={`nav-link text-light ${
                                current === "/user/dashboard" && "active"
                            }`}
                        >
                            {state?.user.name}
                        </a>
                    </Link>
                    <a onClick={logOut} className={`nav-link text-light`}>
                        Log out
                    </a>
                </>
            )}
        </nav>
    );
};

export default Nav;
