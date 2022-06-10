import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoaderOrToast } from "../context";

export const useSingleVideoData = (id, suggestionsLimit) => {
    const [videoDetails, setVideoDetails] = useState({
        categories: [],
        comments: [],
        suggestedVideos: [],
        description: "",
        creator: "",
        release_date: "",
        title: "",
        _id: id,
    });
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsLoading, setToastMessage } = useLoaderOrToast();
    const { currentUser } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(
                    `/api/video/${id}/${suggestionsLimit}`
                );
                if (res.status === 200) {
                    setVideoDetails(res.data.video);
                }
            } catch (err) {
                navigate("404");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [
        location.pathname,
        setIsLoading,
        setVideoDetails,
        navigate,
        suggestionsLimit,
        id,
    ]);

    const AddComment = async (videoId, comments) => {
        if (currentUser?.encodedToken) {
            try {
                // setIsLoading(true);
                const res = await axios.post(
                    `/api/video/${videoId}/${suggestionsLimit}`,
                    {
                        comments,
                    }
                );
                if (res.status === 200) {
                    setVideoDetails(res.data.video);
                    setToastMessage({
                        type: "green",
                        text: "Comment added",
                    });
                }
            } catch (err) {
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            } finally {
                // setIsLoading(false);
            }
        }
    };

    return { videoDetails, AddComment };
};
