import axios from "axios";
import { useAuth, useLoaderOrToast } from "../context";
import { useState, useEffect } from "react";

export const useWatchlaterSevices = (getWatchlater = false) => {
    const { setIsLoading, setToastMessage } = useLoaderOrToast();
    const { currentUser } = useAuth();
    const [watchlater, setWatchlater] = useState([]);

    useEffect(() => {
        if (currentUser?.encodedToken && getWatchlater) {
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.get("/api/user/watchlater", {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    });
                    if (res.status === 200) {
                        setWatchlater(res.data.watchlater.reverse());
                    }
                } catch (err) {
                    setWatchlater([]);
                    setToastMessage({
                        type: "red",
                        text: err.message,
                    });
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [currentUser]);

    const addToWatchlater = async (video) => {
        if (currentUser?.encodedToken) {
            try {
                const res = await axios.post(
                    "/api/user/watchlater",
                    { video },
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                );
                if (res.status === 201) {
                    setWatchlater(res.data.watchlater);
                    setToastMessage({
                        type: "green",
                        text: "Added video to watchlater",
                    });
                }
            } catch (err) {
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            }
        }
    };

    const removeFromWatchlater = async (videoId) => {
        if (currentUser?.encodedToken) {
            try {
                const res = await axios.delete(
                    `/api/user/watchlater/${videoId}`,
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                );
                if (res.status === 200) {
                    setWatchlater(res.data.watchlater);
                    setToastMessage({
                        type: "blue",
                        text: "Removed video from watchlater",
                    });
                }
            } catch (err) {
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            }
        }
    };

    return {
        watchlater,
        addToWatchlater,
        removeFromWatchlater,
    };
};
