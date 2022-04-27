import { useNavigate } from "react-router-dom";
import { Delete, PlaylistAdd, Watchlater } from "../../../../icons";
import styles from "./historyVideoCard.module.css";

export const HistoryVideoCard = ({ videos, deleteVideo }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`${styles["treeTv-video-card"]} card-hover`}
            onClick={() => navigate(`/video/${videos._id}`)}
        >
            <div
                className={`${styles["treeTv-card-body"]} card-body-horizontal`}
            >
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
                <div className={`${styles["treeTv-img-box"]}`}>
                    <img
                        src={`https://i.ytimg.com/vi/${videos._id}/maxresdefault.jpg`}
                        alt={videos._id}
                        className={`${styles["treeTv-card-img"]} card-side-image`}
                    />
                    <div className={`${styles["treeTv-card-action"]}`}>
                        <button className="icon-btn-ghost-sm">
                            <PlaylistAdd />
                        </button>
                        <button className="icon-btn-ghost-sm">
                            <Watchlater />
                        </button>
                    </div>
                </div>
                <div className={`${styles["card-side-text"]}`}>
                    <h3
                        className={`${styles["treeTv-card-title"]} card-title text-noWrap`}
                    >
                        {videos.title}
                    </h3>
                    <p className="card-subtitle">{videos.creator}</p>
                    <p className={`${styles["card-desc"]} card-text`}>
                        {videos.description}
                    </p>
                </div>
            </div>
        </div>
    );
};
