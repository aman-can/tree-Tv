import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { formValidate } from "../utils";
import { useAuth, useLoaderOrToast } from "../context";

export const useAuthSevices = (setFieldErrors) => {
    const { setIsLoading, setToastMessage } = useLoaderOrToast();
    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const signup = async (name, email, color, password) => {
        if (formValidate(email, password, setFieldErrors, name)) {
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.post("/api/auth/signup", {
                        email,
                        password,
                        fullName: name,
                        profile_color: color,
                    });
                    if (res.status === 201) {
                        setCurrentUser({
                            encodedToken: res.data.encodedToken,
                            ...res.data.createdUser,
                        });
                        localStorage.setItem("token", res.data.encodedToken);
                        localStorage.setItem(
                            "profile_color",
                            res.data.createdUser.profile_color
                        );
                        localStorage.setItem(
                            "email",
                            res.data.createdUser.email
                        );
                        localStorage.setItem(
                            "fullName",
                            res.data.createdUser.fullName
                        );
                        navigate("/");
                        setToastMessage({
                            type: "blue",
                            text: "Signed up",
                        });
                    }
                } catch (err) {
                    setToastMessage({
                        type: "red",
                        text: err.message,
                    });
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    };
    const signin = async (email, password) => {
        if (formValidate(email, password, setFieldErrors)) {
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.post("/api/auth/login", {
                        email: email,
                        password: password,
                    });
                    if (res.status === 200) {
                        setCurrentUser({
                            encodedToken: res.data.encodedToken,
                            ...res.data.foundUser,
                        });
                        localStorage.setItem("token", res.data.encodedToken);
                        localStorage.setItem("email", res.data.foundUser.email);
                        localStorage.setItem(
                            "email",
                            res.data.foundUser.profile_color
                        );
                        localStorage.setItem(
                            "fullName",
                            res.data.foundUser.fullName
                        );
                        navigate(location?.state?.from || "/", {
                            replace: true,
                        });

                        setToastMessage({
                            type: "blue",
                            text: "Signed in",
                        });
                    }
                } catch (err) {
                    setToastMessage({
                        type: "red",
                        text: err.message,
                    });
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    };
    const signout = () => {
        if (!!localStorage.getItem("token")) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("fullName");
            setCurrentUser({});
        }
    };

    return { signup, signin, signout };
};
