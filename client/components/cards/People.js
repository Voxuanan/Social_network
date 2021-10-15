import { Avatar, List } from "antd";
import { useRouter } from "next/router";

const People = ({ people, handleFollow }) => {
    const router = useRouter();

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
                                    <span
                                        className="text-primary pointer"
                                        onClick={() => {
                                            handleFollow(user);
                                        }}
                                    >
                                        Follow
                                    </span>
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
