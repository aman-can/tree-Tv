import { useNavigate } from "react-router-dom";
import { Delete, Playlist } from "../../../../icons";
import styles from "./playlistCard.module.css";

export const PlaylistCard = ({ playlist, deletePlaylist }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/playlists/${playlist._id}`)}
            className={`${styles["playlist-card"]} card-hover`}
        >
            <div className="card-body">
                <div className="card-image-overlay">
                    {!!playlist.videos.length ? (
                        <img
                            src={`https://i.ytimg.com/vi/${playlist.videos[0]._id}/maxresdefault.jpg`}
                            alt={playlist._id}
                            className="card-top-image"
                        />
                    ) : (
                        <div className={`${styles["empty-playlist"]}`} />
                    )}

                    <div
                        className={`${styles["playlist-overlay"]} flex-center vertical-list card-overlay-text`}
                    >
                        <p className="heading-4">{playlist.videos.length}</p>
                        <p className="heading-5">
                            <Playlist />
                        </p>
                    </div>
                </div>
                <div className={`${styles["playlist-footer"]} card-actions`}>
                    <div className="heading-6">{playlist.title}</div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deletePlaylist(playlist._id);
                        }}
                        className="icon-btn-ghost-sm"
                    >
                        <Delete />
                    </button>
                </div>
            </div>
        </div>
    );
};
