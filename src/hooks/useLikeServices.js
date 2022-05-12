import axios from "axios";
import { useAuth, useLoaderOrToast } from "../context";
import { useState, useEffect } from "react";

export const useLikeSevices = (getLikes = false) => {
    const { setIsLoading, setToastMessage } = useLoaderOrToast();
    const { currentUser } = useAuth();
    const [liked, setLiked] = useState([]);

    useEffect(() => {
        if (currentUser?.encodedToken && getLikes) {
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.get("/api/user/likes", {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    });
                    if (res.status === 200) {
                        setLiked(res.data.likes.reverse());
                    }
                } catch (err) {
                    setLiked([]);
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

    const likeVideo = async (video) => {
        if (currentUser?.encodedToken) {
            try {
                const res = await axios.post(
                    "/api/user/likes",
                    { video },
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                );
                if (res.status === 201) {
                    setLiked(res.data.likes);
                    setToastMessage({
                        type: "green",
                        text: "Video liked",
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

    const unlikeVideo = async (videoId) => {
        if (currentUser?.encodedToken) {
            try {
                const res = await axios.delete(`/api/user/likes/${videoId}`, {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                });
                if (res.status === 200) {
                    setLiked(res.data.likes);
                    setToastMessage({
                        type: "blue",
                        text: "Video unliked",
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
        liked,
        likeVideo,
        unlikeVideo,
    };
};
