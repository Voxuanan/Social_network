import Link from "next/link";

const Nav = () => {
    return (
        <nav className="nav  d-flex justify-content-end" style={{ backgroundColor: "#0d6efd" }}>
            <Link href="/">
                <a className="nav-link text-light logo">Home</a>
            </Link>

            <Link href="/login">
                <a className="nav-link text-light">Login</a>
            </Link>

            <Link href="/register">
                <a className="nav-link text-light">Register</a>
            </Link>
        </nav>
    );
};

export default Nav;
