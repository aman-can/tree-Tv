import axios from "axios";
import { useAuth, useLoaderOrToast } from "../context";
import { useState, useEffect } from "react";

export const useHistorySevices = (getHistory = false) => {
    const { setIsLoading, setToastMessage } = useLoaderOrToast();
    const { currentUser } = useAuth();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (currentUser?.encodedToken && getHistory) {
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.get("/api/user/history", {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    });
                    if (res.status === 200) {
                        setHistory(res.data.history.reverse());
                    }
                } catch (err) {
                    setHistory([]);
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

    const addVideoToHistory = async (video) => {
        if (currentUser?.encodedToken) {
            try {
                const res = await axios.post(
                    "/api/user/history",
                    { video },
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                );
                if (res.status === 201) {
                    setHistory(res.data.history);
                }
            } catch (err) {
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            }
        }
    };

    const deleteVideoFromHistory = async (videoId) => {
        if (currentUser?.encodedToken) {
            try {
                const res = await axios.delete(`/api/user/history/${videoId}`, {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                });
                if (res.status === 200) {
                    console.log(videoId);
                    setHistory(res.data.history);
                    setToastMessage({
                        type: "green",
                        text: "Video removed from history",
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

    const deleteAllVideosInHistory = async () => {
        if (currentUser?.encodedToken) {
            try {
                const res = await axios.delete(`/api/user/history/all`, {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                });
                if (res.status === 200) {
                    setHistory(res.data.history);
                    setToastMessage({
                        type: "green",
                        text: "History cleared",
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
        addVideoToHistory,
        deleteVideoFromHistory,
        deleteAllVideosInHistory,
        history,
    };
};
