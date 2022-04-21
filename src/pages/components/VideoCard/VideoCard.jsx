import { useState } from "react";
import {
    Liked,
    Play,
    Playlist,
    PlaylistAdd,
    Share,
    Watchlater,
} from "../../../icons";
import styles from "./videoCard.module.css";

export const VideoCard = ({ videos }) => {
    const [showCardActions, setShowCardActions] = useState(false);

    return (
        <div
            onMouseOver={() => setShowCardActions(true)}
            onMouseOut={() => setShowCardActions(false)}
            className={`${styles["treeTv-video-card"]} card-hover`}
        >
            <div className="card-body">
                <div
                    className={`${styles["treeTv-card-overlay"]} card-image-overlay`}
                >
                    <img
                        src={`https://i.ytimg.com/vi/${videos._id}/maxresdefault.jpg`}
                        alt={videos._id}
                        className="card-top-image"
                    />
                    {showCardActions && (
                        <div
                            className={`${styles["treeTv-card-play"]} flex-center card-overlay-text`}
                        >
                            <button className="icon-btn-teal">
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
                {/* horizontal-list */}
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
