import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const { setIsLoading } = useLoaderOrToast();

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
    }, [location.pathname]);

    return videoDetails;
};
