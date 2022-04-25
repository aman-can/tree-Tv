import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import styles from "./videoThumbnail.module.css";

export const VideoThumbnail = ({ videoId, play }) => {
    const navigate = useNavigate();

    const redirectToPage = (state) =>
        Math.round(state.playedSeconds) > 30 &&
        navigate(`/video/${videoId}`, {
            state: {
                redirected: true,
            },
        });

    return (
        <div className={`${styles["player-wrapper"]}`}>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                className={`${styles["react-player"]}`}
                playing={play}
                width="100%"
                height="100%"
                muted
                onProgress={redirectToPage}
                controls={false}
                config={{
                    youtube: {
                        playerVars: {
                            disablekb: 1,
                            enablejsapi: 1,
                            fs: 0,
                            rel: 0,
                            modestbranding: 1,
                        },
                    },
                }}
            />
        </div>
    );
};
