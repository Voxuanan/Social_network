import { Avatar, List, Card } from "antd";
import { UserContext } from "../../context";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";

const Username = () => {
    const [state, setState] = useContext(UserContext);
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (router.query.username) fetchUser();
    }, [router.query.username]);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`/user/${router.query.username}`);
            setUser(data);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    return (
        <div className="container-fluid">
            <div className="col-md-6 offset-md-3 pt-5">
                {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
                {user && (
                    <Card hoverable cover={<img src={user?.image?.url} alt={user.name} />}>
                        <Card.Meta title={user.name} description={user.about} />
                        <p className="pt-2 text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                        <div className="d-flex justify-content-between">
                            <span className="btn btn-sm">
                                {(user.follower && user.follower.length) || 0} followers
                            </span>
                            <span className="btn btn-sm">
                                {(user.following && user.following.length) || 0} following
                            </span>
                        </div>
                    </Card>
                )}
            </div>
            <Link href="/user/dashboard">
                <a className="d-flex justify-content-center pt-5 h4">
                    <RollbackOutlined />
                </a>
            </Link>
        </div>
    );
};

export default Username;
