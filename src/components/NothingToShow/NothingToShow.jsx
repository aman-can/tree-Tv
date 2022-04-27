import noVideos from "./noVideos.json";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import styles from "./nothingToShow.module.css";
import { Link } from "react-router-dom";

export const NothingToShow = () => {
    const noVideosRef = useRef();

    useEffect(() => {
        lottie.loadAnimation({
            container: noVideosRef.current,
            animationData: noVideos,
            loop: true,
            autoplay: true,
            renderer: "svg",
            rendererSettings: {
                preserveAspectRatio: "xMinYMin slice",
            },
        });
    }, []);

    return (
        <div className={`${styles["no-videos"]} flex-center text-align-center`}>
            <p className="heading-5">There are no videos to show</p>
            <p className="text-body-lg text-gutterTop">
                Nothing seems to have been added here
            </p>
            <span
                className={`${styles["illustration"]}`}
                ref={noVideosRef}
            ></span>
            <Link to="/" className="btn-filled-teal">
                Explore some videos
            </Link>
        </div>
    );
};
