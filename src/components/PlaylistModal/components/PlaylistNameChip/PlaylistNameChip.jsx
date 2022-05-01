import { useState } from "react";
import {
    PlaylistCheck,
    PlaylistModalAdd,
    PlaylistLoader,
    Watchlater,
    WatchlaterFilled,
} from "../../../../icons";
import styles from "./playlistNameChip.module.css";

export const PlaylistNameChip = ({
    isInPlaylist = false,
    handlePlaylist,
    isInWatchlater = false,
    playlist,
    handleWatchlater,
    isWatchlaterChip = false,
}) => {
    const [isPlaylistLoading, setIsPlaylistLoading] = useState(false);

    return !isPlaylistLoading ? (
        <p
            className={`${styles["playlist-names"]} ${
                (isInPlaylist || isInWatchlater) && styles["playlist-check"]
            } heading-6`}
            onClick={() =>
                isWatchlaterChip
                    ? handleWatchlater()
                    : handlePlaylist(
                          setIsPlaylistLoading,
                          isInPlaylist,
                          playlist._id
                      )
            }
        >
            {!isWatchlaterChip ? (
                isInPlaylist ? (
                    <PlaylistCheck />
                ) : (
                    <PlaylistModalAdd />
                )
            ) : isInWatchlater ? (
                <WatchlaterFilled />
            ) : (
                <Watchlater />
            )}
            {isWatchlaterChip ? "Watchlater" : playlist.title}
        </p>
    ) : (
        <span className={`${styles["playlist-loader"]} flex-center heading-6`}>
            <PlaylistLoader />
        </span>
    );
};
