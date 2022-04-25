import styles from "./videoDetails.module.css";
import { Liked, PlaylistAdd, Share } from "../../../../../../icons";

export const VideoDetails = ({ videoDetails }) => {
    return (
        <>
            <div className={`${styles["video-details"]} card`}>
                <div
                    className={`${styles["desc-btns"]} card-badge-green horizontal-list`}
                >
                    <button className="btn-outlined-teal">
                        liked <Liked />
                    </button>
                    <button className="btn-outlined-teal">
                        Save <PlaylistAdd />
                    </button>
                    <button className="btn-outlined-teal">
                        share <Share />
                    </button>
                </div>
                <div className="card-header">
                    <h3 className="card-title">{videoDetails.title}</h3>
                </div>
                <div className="card-body">
                    <p className="card-subtitle">{videoDetails.creator}</p>
                    <p className="card-text text-gutterBottom">
                        {videoDetails.description}
                    </p>
                    <p className="card-subtitle text-caption">
                        {videoDetails.release_date}
                    </p>
                </div>
            </div>
            <span className="divider-light-horizontal" />
        </>
    );
};
