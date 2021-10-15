import { Avatar, List } from "antd";
import { UserContext } from "../../context";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";

const following = () => {
    const [state, setState] = useContext(UserContext);
    const [people, setPeople] = useState([]);

    useEffect(() => {
        if (state && state.token) fetchFollowing();
    }, [state && state.token]);

    const fetchFollowing = async () => {
        try {
            const { data } = await axios.get("/user-following");
            console.log(data);
            setPeople(data);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleUnfollow = async (user) => {
        try {
            const { data } = await axios.put(`/user-unfollow`, { _id: user._id });
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({ ...state, user: data });
            toast.success(`Unfollow "${user.name}"`);
            let filtered = people.filter((person) => person._id !== user._id);
            setPeople(filtered);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    return (
        <div className="container-fluid">
            <div className="col-md-6 offset-md-3 pt-5">
                <List
                    itemLayout="horizontal"
                    dataSource={people}
                    renderItem={(user) => (
                        <List.Item className="me-3">
                            <List.Item.Meta
                                avatar={
                                    <Avatar size={40} src={user?.image?.url}>
                                        {user.name[0]}
                                    </Avatar>
                                }
                                title={
                                    <div className="d-flex justify-content-between">
                                        {user.name}
                                        <span
                                            className="text-primary pointer"
                                            onClick={() => {
                                                handleUnfollow(user);
                                            }}
                                        >
                                            Unfollow
                                        </span>
                                    </div>
                                }
                                description={user?.about}
                            />
                        </List.Item>
                    )}
                />
            </div>

            <Link href="/user/dashboard">
                <a className="d-flex justify-content-center pt-5 h4">
                    <RollbackOutlined />
                </a>
            </Link>
        </div>
    );
};

export default following;
