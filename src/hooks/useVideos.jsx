import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderOrToast } from "../context";

export const useVideos = () => {
    const [allVideos, setAllVideos] = useState([]);
    const { setIsLoading, setToastMessage } = useLoaderOrToast();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await axios.get("/api/videos");
                if (res.status === 200) {
                    setAllVideos(res.data.videos);
                }
            } catch (err) {
                console.error(err.message);
                // setToastMessage({
                //     type: "red",
                //     text: err.message,
                // });
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return allVideos;
};
