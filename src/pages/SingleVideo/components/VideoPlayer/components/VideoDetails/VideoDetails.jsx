import { useLocation, useNavigate } from "react-router-dom";
import styles from "./videoDetails.module.css";
import {
    Liked,
    LikedFilled,
    PlaylistAdd,
    Share,
} from "../../../../../../icons";
import { useLikeSevices } from "../../../../../../hooks";
import { useAuth, useLoaderOrToast } from "../../../../../../context";

export const VideoDetails = ({ videoDetails }) => {
    const { liked, likeVideo, unlikeVideo } = useLikeSevices(true);
    const isLiked = liked.some(item => item._id === videoDetails._id);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    const handleLike = () => {
        currentUser?.encodedToken
            ? isLiked
                ? unlikeVideo(videoDetails._id)
                : likeVideo(videoDetails)
            : navigate(`/sign-in`, {
                  state: {
                      from: location?.pathname,
                  },
                  replace: true,
              });
    };
    const { setPlaylistModalVideo, setToastMessage } = useLoaderOrToast();

    return (
        <>
            <div className={`${styles["video-details"]} card`}>
                <div
                    className={`${styles["desc-btns"]} card-badge-green horizontal-list`}>
                    <button
                        onClick={() => handleLike()}
                        className="btn-outlined-teal">
                        {isLiked ? "liked" : "like"}
                        {isLiked ? <LikedFilled /> : <Liked />}
                    </button>
                    <button
                        onClick={() => {
                            currentUser?.encodedToken
                                ? setPlaylistModalVideo(videoDetails)
                                : navigate(`/sign-in`, {
                                      state: {
                                          from: location?.pathname,
                                      },
                                      replace: true,
                                  });
                        }}
                        className="btn-outlined-teal">
                        Save <PlaylistAdd />
                    </button>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setToastMessage({
                                type: "blue",
                                text: "Link Copied!",
                            });
                        }}
                        className="btn-outlined-teal">
                        share <Share />
                    </button>
                </div>
                <div className="card-header">
                    <h3
                        className={`${styles["video-title"]} text-noWrap card-title`}>
                        {videoDetails.title}
                    </h3>
                </div>
                <div className="card-body">
                    <p className="card-subtitle">{videoDetails.creator}</p>
                    <p
                        className={`${styles["description"]} card-text text-gutterBottom`}>
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
