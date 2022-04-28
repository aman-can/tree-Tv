import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoaderOrToast } from "../context";

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
    const { setIsLoading, setToastMessage } = useLoaderOrToast();

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
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            } finally {
                setIsLoading(false);
            }
        })();
    }, [location.pathname]);

    return videoDetails;
};
