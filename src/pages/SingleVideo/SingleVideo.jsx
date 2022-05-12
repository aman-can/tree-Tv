import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useDraggable } from "react-use-draggable-scroll";
import { VideoCard } from "../components";
import styles from "./singleVideo.module.css";
import { useSingleVideoData, useWatchlaterSevices } from "../../hooks";
import { CommentsBox, VideoPlayer } from "./components";

export const SingleVideo = () => {
    const { videoId } = useParams();
    const suggestionsBox = useRef();
    const { events } = useDraggable(suggestionsBox, {
        applyRubberBandEffect: true,
    });
    const { videoDetails, AddComment } = useSingleVideoData(videoId, 10);
    const { addToWatchlater, watchlater, removeFromWatchlater } =
        useWatchlaterSevices(true);
    return (
        <div className={`${styles["single-video-container"]}`}>
            <div className={`${styles["video-suggestion-container"]}`}>
                <VideoPlayer videoDetails={videoDetails} />
                <div
                    {...events}
                    ref={suggestionsBox}
                    className={`${styles["suggestions-box"]}`}
                >
                    {videoDetails.suggestedVideos.map((video) => {
                        return (
                            <VideoCard
                                isInWatchlater={watchlater.some(
                                    (item) => item._id === video._id
                                )}
                                handleRemove={removeFromWatchlater}
                                handleAddWatchlater={addToWatchlater}
                                key={video._id}
                                videos={video}
                                canHover={false}
                            />
                        );
                    })}
                </div>
                <div className={`${styles["comments-section"]}`}>
                    {
                        <CommentsBox
                            AddComment={AddComment}
                            comments={videoDetails.comments}
                            videoId={videoDetails._id}
                        />
                    }
                </div>
            </div>
        </div>
    );
};
