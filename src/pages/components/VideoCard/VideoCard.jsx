import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, PlaylistAdd, Share, Watchlater } from "../../../icons";
import { VideoThumbnail } from "./components";
import styles from "./videoCard.module.css";

export const VideoCard = ({ videos, canHover = true }) => {
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();
    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            // onTouchStart={() => setIsHovering(true)}
            // onTouchEnd={() => setIsHovering(false)}
            className={`${styles["treeTv-video-card"]} ${
                canHover && styles["card-can-hover"]
            } card-hover`}
        >
            <div className="card-body">
                <div
                    className={`${styles["treeTv-card-overlay"]} card-image-overlay`}
                >
                    {isHovering && canHover ? (
                        <VideoThumbnail
                            videoId={videos._id}
                            play={isHovering}
                        />
                    ) : (
                        <img
                            src={`https://i.ytimg.com/vi/${videos._id}/maxresdefault.jpg`}
                            alt={videos._id}
                            className="card-top-image"
                        />
                    )}
                    {isHovering && (
                        <div
                            className={`${styles["treeTv-card-play"]} flex-center card-overlay-text`}
                        >
                            <button
                                onClick={() => navigate(`/video/${videos._id}`)}
                                className="icon-btn-teal"
                            >
                                <Play />
                            </button>
                        </div>
                    )}
                    <div
                        className={`${styles["treeTv-video-actions"]} card-actions`}
                    >
                        <div className="card-icon-btns">
                            <button className="icon-btn-ghost-sm">
                                <Watchlater />
                            </button>
                            <button className="icon-btn-ghost-sm">
                                <PlaylistAdd />
                            </button>
                            <button className="icon-btn-ghost-sm">
                                <Share />
                            </button>
                        </div>
                    </div>
                </div>
                <h3 className="card-title text-noWrap text-body-lg">
                    {videos.title}
                </h3>
                <div
                    className={`${styles["treeTv-card-text"]} card-text flex-center text-caption`}
                >
                    <p>{videos.creator}</p>
                    <p>{videos.release_date}</p>
                </div>
            </div>
        </div>
    );
};
