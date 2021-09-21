import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: {},
        token: "",
    });

    const router = useRouter();
    const token = state && state.token ? state.token : "";
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem("auth")));
    }, []);

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            let res = error.response;
            if ((res.status = 401 && res.config && !res.config.__isRetryRequest)) {
                if (state) {
                    setState(null);
                    window.localStorage.removeItem("auth");
                    router.push("/login");
                }
            }
            return Promise.reject(error);
        }
    );

    return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
