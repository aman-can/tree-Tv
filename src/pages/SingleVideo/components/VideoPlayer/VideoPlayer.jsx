import ReactPlayer from "react-player";
import { VideoDetails } from "./components";
import styles from "./videoPlayer.module.css";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { useHistorySevices } from "../../../../hooks";

export const VideoPlayer = ({ videoDetails }) => {
    const location = useLocation();
    const player = useRef();
    const { addVideoToHistory } = useHistorySevices();

    return (
        <div className={`${styles["player-container"]}`}>
            <div className={`${styles["player-wrapper"]}`}>
                <ReactPlayer
                    ref={player}
                    url={`https://www.youtube.com/watch?v=${videoDetails._id}`}
                    className={`${styles["react-player"]}`}
                    width="100%"
                    height="100%"
                    controls
                    onStart={() => {
                        addVideoToHistory(videoDetails);
                        if (location?.state?.redirected)
                            player.current.seekTo(30);
                    }}
                    playing={location?.state?.redirected && true}
                    config={{
                        youtube: {
                            playerVars: {
                                disablekb: 1,
                                enablejsapi: 1,
                                fs: 0,
                                rel: 0,
                                modestbranding: 1,
                                showinfo: 0,
                            },
                        },
                    }}
                />
            </div>
            <VideoDetails videoDetails={videoDetails} />
        </div>
    );
};
