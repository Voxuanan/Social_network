import { Avatar, List } from "antd";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/index";
import { useRouter } from "next/router";

const People = ({ people, handleFollow, handleUnfollow }) => {
    const router = useRouter();
    const [state] = useContext(UserContext);

    return (
        <>
            {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
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
                                    {state &&
                                    state.user &&
                                    user.followers &&
                                    user.followers.includes(state.user._id) ? (
                                        <span
                                            className="text-primary pointer"
                                            onClick={() => {
                                                handleUnfollow(user);
                                            }}
                                        >
                                            Unfollow
                                        </span>
                                    ) : (
                                        <span
                                            className="text-primary pointer"
                                            onClick={() => {
                                                handleFollow(user);
                                            }}
                                        >
                                            Follow
                                        </span>
                                    )}
                                </div>
                            }
                            description={user?.about}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default People;
