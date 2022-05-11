import { useLocation, useNavigate } from "react-router-dom";
import DateDiff from "date-diff";

import { useAuth } from "../../../context";
import { Delete, PlaylistAdd, Watchlater } from "../../../icons";
import styles from "./horizontalVideoCard.module.css";

const dateCompare = (d1, d2) => {
    const diff = new DateDiff(d1, d2);
    const year = Math.round(diff.years());
    const months = Math.round(diff.months());
    return months > 12
        ? `${year} year${year > 1 ? "s" : ""} ago`
        : `${months} month${months > 1 ? "s" : ""} ago`;
};

export const HorizontalVideoCard = ({
    videos,
    deleteVideo,
    handleAddWatchlater,
    handlePlaylistToggle,
    isInWatchlater = false,
    isSearchCard = false,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    return (
        <div
            className={`${styles["treeTv-video-card"]} ${
                isSearchCard && styles["search-card"]
            } card-hover`}
            onClick={() => navigate(`/video/${videos._id}`)}
        >
            <div
                className={`${styles["treeTv-card-body"]} card-body-horizontal`}
            >
                {!isSearchCard && (
                    <span className="card-badge-ghost">
                        <button
                            className="icon-btn-ghost-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteVideo(videos._id);
                            }}
                        >
                            <Delete />
                        </button>
                    </span>
                )}
                <div className={`${styles["treeTv-img-box"]}`}>
                    <img
                        src={`https://i.ytimg.com/vi/${videos._id}/maxresdefault.jpg`}
                        alt={videos._id}
                        className={`${styles["treeTv-card-img"]} card-side-image`}
                    />
                    <div className={`${styles["treeTv-card-action"]}`}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                !!currentUser.encodedToken
                                    ? handlePlaylistToggle((prev) => {
                                          return { ...prev, ...videos };
                                      })
                                    : navigate(`/sign-in`, {
                                          state: {
                                              from: location?.pathname,
                                          },
                                          replace: true,
                                      });
                            }}
                            className="icon-btn-ghost-sm"
                        >
                            <PlaylistAdd />
                        </button>
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
                    </div>
                </div>
                <div className={`${styles["card-side-text"]}`}>
                    <h3
                        className={`${styles["treeTv-card-title"]} card-title text-noWrap`}
                    >
                        {videos.title}
                    </h3>
                    <p className="card-subtitle">
                        {videos.creator} •{" "}
                        {dateCompare(new Date(), new Date(videos.release_date))}
                    </p>
                    <p className={`${styles["card-desc"]} card-text`}>
                        {videos.description}
                    </p>
                </div>
            </div>
        </div>
    );
};
