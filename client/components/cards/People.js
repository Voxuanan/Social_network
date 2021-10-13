import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { useContext } from "react";

const People = ({ people }) => {
    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={people}
                renderItem={(person) => (
                    <List.Item className="me-3">
                        <List.Item.Meta
                            avatar={
                                <Avatar size={40} src={person?.image?.url}>
                                    {person.name[0]}
                                </Avatar>
                            }
                            title={
                                <div className="d-flex justify-content-between">
                                    {person.name}
                                    <span className="text-primary">Follow</span>
                                </div>
                            }
                            description={person?.about}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default People;
