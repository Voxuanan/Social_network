import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/index";
import axios from "axios";
import { toast } from "react-toastify";
import People from "../components/cards/People";

const Search = () => {
    const [state, setState] = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const searchUser = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/search-user/${query}`);
            setResult(data);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleFollow = async (user) => {
        try {
            const { data } = await axios.put(`/user-follow`, { _id: user._id });
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({ ...state, user: data });
            toast.success(`Following "${user.name}"`);
            let filtered = result.filter((person) => person._id !== user._id);
            setResult(filtered);
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
            let filtered = result.filter((person) => person._id !== user._id);
            setResult(filtered);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    return (
        <>
            <form className="form-inline row" onSubmit={searchUser}>
                <div className="col-8">
                    <input
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setResult([]);
                        }}
                        value={query}
                        className="form-control"
                        placeholder="Search"
                        type="search"
                    />
                </div>
                <div className="col-4">
                    <button className="btn btn-outline-primary col-12" type="submit">
                        Search
                    </button>
                </div>
            </form>

            {result && result.length != 0 && (
                <People
                    people={result}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                />
            )}
        </>
    );
};

export default Search;
