import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoaderOrToast } from "../../../context";
import { useWindowSize } from "../../../hooks";
import {
    Play,
    PlaylistAdd,
    Share,
    Watchlater,
    Delete,
    WatchlaterFilled,
} from "../../../icons";
import { VideoThumbnail } from "./components";
import styles from "./videoCard.module.css";

export const VideoCard = ({
    videos,
    canHover = true,
    handlePlaylistToggle,
    isLikeCard = false,
    isWatchLaterCard = false,
    handleRemove,
    handleAddWatchlater,
    isInWatchlater = false,
    isPlaylistCard = false,
    playlistId,
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();
    const { width } = useWindowSize();
    const { setToastMessage } = useLoaderOrToast();
    const events = {
        onMouseEnter: () => (width > 800 ? setIsHovering(true) : {}),
        onMouseLeave: () => (width > 800 ? setIsHovering(false) : {}),
    };

    const handleShare = () => {
        navigator.clipboard.writeText(
            `${window.location.href}video/${videos._id}`
        );
        setToastMessage({
            type: "blue",
            text: "Link Copied!",
        });
    };

    return (
        <div
            {...events}
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
                    {(width < 800 || (width > 800 && isHovering)) && (
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
                        {isLikeCard && (
                            <div className="card-icon-btns">
                                {!isInWatchlater && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddWatchlater(videos);
                                        }}
                                        className="icon-btn-ghost-sm"
                                    >
                                        <Watchlater />
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        !!currentUser.encodedToken
                                            ? handlePlaylistToggle(videos)
                                            : navigate(`/sign-in`, {
                                                  state: {
                                                      from: location?.pathname,
                                                  },
                                                  replace: true,
                                              })
                                    }
                                    className="icon-btn-ghost-sm"
                                >
                                    <PlaylistAdd />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(videos._id);
                                    }}
                                    className="icon-btn-ghost-sm"
                                >
                                    <Delete />
                                </button>
                            </div>
                        )}
                        {isWatchLaterCard && (
                            <div className="card-icon-btns">
                                <button
                                    onClick={() =>
                                        !!currentUser.encodedToken
                                            ? handlePlaylistToggle(videos)
                                            : navigate(`/sign-in`, {
                                                  state: {
                                                      from: location?.pathname,
                                                  },
                                                  replace: true,
                                              })
                                    }
                                    className="icon-btn-ghost-sm"
                                >
                                    <PlaylistAdd />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(videos._id);
                                    }}
                                    className="icon-btn-ghost-sm"
                                >
                                    <Delete />
                                </button>
                            </div>
                        )}
                        {isPlaylistCard && (
                            <div className="card-icon-btns">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(
                                            false,
                                            playlistId,
                                            videos._id
                                        );
                                    }}
                                    className="icon-btn-ghost-sm"
                                >
                                    <Delete />
                                </button>
                            </div>
                        )}
                        {!isLikeCard && !isWatchLaterCard && !isPlaylistCard && (
                            <div className="card-icon-btns">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        !!currentUser.encodedToken
                                            ? isInWatchlater
                                                ? handleRemove(videos._id)
                                                : handleAddWatchlater(videos)
                                            : navigate(`/sign-in`, {
                                                  state: {
                                                      from: location?.pathname,
                                                  },
                                                  replace: true,
                                              });
                                    }}
                                    className="icon-btn-ghost-sm"
                                >
                                    {isInWatchlater ? (
                                        <WatchlaterFilled />
                                    ) : (
                                        <Watchlater />
                                    )}
                                </button>
                                <button
                                    onClick={() =>
                                        !!currentUser.encodedToken
                                            ? handlePlaylistToggle(videos)
                                            : navigate(`/sign-in`, {
                                                  state: {
                                                      from: location?.pathname,
                                                  },
                                                  replace: true,
                                              })
                                    }
                                    className="icon-btn-ghost-sm"
                                >
                                    <PlaylistAdd />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="icon-btn-ghost-sm"
                                >
                                    <Share />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <h3
                    onClick={() => navigate(`/video/${videos._id}`)}
                    className="card-title text-noWrap text-body-lg"
                >
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
