import { useState, useRef } from "react";
import { useLoaderOrToast } from "../../context";
import {
    useLockBodyScroll,
    usePlaylistServices,
    useWatchlaterSevices,
} from "../../hooks";
import { Cross, Playlist } from "../../icons";
import { PlaylistNameChip } from "./components";
import styles from "./playlistModal.module.css";

export const PlaylistModal = ({ video }) => {
    useLockBodyScroll();

    const [showInput, setShowInput] = useState(false);
    const {
        playlists,
        createPlaylist,
        addVideoToPlaylist,
        deleteVideoFromPlaylist,
    } = usePlaylistServices({
        getPlaylist: true,
        showInput,
    });

    const inputRef = useRef();

    const { setPlaylistModalVideo } = useLoaderOrToast();
    const { addToWatchlater, watchlater, removeFromWatchlater } =
        useWatchlaterSevices(true);

    const isInWatchlater = watchlater.some(item => item._id === video._id);

    const handleWatchlater = () =>
        isInWatchlater
            ? removeFromWatchlater(video._id)
            : addToWatchlater(video);

    const handlePlaylist = (setIsPlaylistLoading, isInPlaylist, playlistId) =>
        isInPlaylist
            ? deleteVideoFromPlaylist(
                  setIsPlaylistLoading,
                  playlistId,
                  video._id
              )
            : addVideoToPlaylist(setIsPlaylistLoading, playlistId, video);

    const handleCreatePlaylist = async () => {
        if (inputRef.current.value) {
            const playlistId = await createPlaylist({
                title: inputRef.current.value,
            });
            inputRef.current.value = "";
            setShowInput(false);
            addVideoToPlaylist(() => {}, playlistId, video);
        }
    };

    return (
        <div
            onClick={() => setPlaylistModalVideo({})}
            className={`${styles["playlist-modal"]} modal-sm`}>
            <div
                onClick={e => e.stopPropagation()}
                className={`${styles["playlist-modal-dialog"]} modal-dialog`}>
                <div className={`${styles["playlist-content"]} modal-content`}>
                    <div
                        className={`${styles["playlist-header"]} modal-header`}>
                        <h1 className="modal-title heading-6">Save to...</h1>
                        <button
                            onClick={() => setPlaylistModalVideo({})}
                            className="icon-btn-ghost-sm modal-close-btn">
                            <Cross />
                        </button>
                    </div>

                    <div className={`${styles["playlist-body"]} modal-body`}>
                        <PlaylistNameChip
                            isWatchlaterChip
                            handleWatchlater={handleWatchlater}
                            isInWatchlater={isInWatchlater}
                        />
                        {playlists.map(item => {
                            return (
                                <PlaylistNameChip
                                    handlePlaylist={handlePlaylist}
                                    isInPlaylist={item.videos.some(
                                        ele => ele._id === video._id
                                    )}
                                    playlist={item}
                                />
                            );
                        })}
                    </div>

                    <div
                        className={`${styles["playlist-footer"]} modal-footer`}>
                        {showInput && (
                            <input
                                ref={inputRef}
                                placeholder="Playlist name"
                                type="text"
                                className={`${styles["playlist-input"]} full-width`}
                            />
                        )}

                        {showInput ? (
                            <button
                                onClick={handleCreatePlaylist}
                                type="button"
                                className="btn-filled-teal flex-center margin-auto">
                                Create
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowInput(true)}
                                type="button"
                                className="btn-filled-teal flex-center full-width">
                                <Playlist /> Create a new playlist
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
