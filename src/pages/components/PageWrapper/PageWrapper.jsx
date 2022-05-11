import { NothingToShow } from "../../../components";
import styles from "./pageWrapper.module.css";

export const PageWrapper = ({
    children,
    hearderText,
    clearFunction,
    createFunction,
    videoLength,
    isClearable = false,
    inPlaylists = false,
    playlistsLength,
    inSearch = false,
    searchSorted = false,
    sortFunction,
}) => {
    return (
        <div className={`${styles["page-wrapper"]}`}>
            <div className={`${styles["page-header"]}`}>
                <div>
                    <p className="heading-5">{hearderText}</p>
                    {!inPlaylists ? (
                        <p className="text-body-lg">
                            {!!videoLength
                                ? `${videoLength} videos`
                                : "No videos"}
                        </p>
                    ) : (
                        <p className="text-body-lg">
                            {!!playlistsLength
                                ? `${playlistsLength} playlists `
                                : "No playlists"}
                        </p>
                    )}
                </div>
                {!!videoLength && isClearable && (
                    <button
                        onClick={() => clearFunction()}
                        className="btn-filled-teal"
                    >
                        Clear
                    </button>
                )}
                {!!videoLength && inSearch && (
                    <button
                        onClick={() => sortFunction()}
                        className="btn-filled-teal"
                    >
                        {searchSorted ? "Clear Sort" : "Sort by Time"}
                    </button>
                )}
                {inPlaylists && (
                    <button
                        onClick={() => createFunction()}
                        className="btn-filled-teal"
                    >
                        New Playlist
                    </button>
                )}
            </div>
            {inPlaylists ? (
                !!playlistsLength ? (
                    children
                ) : (
                    <NothingToShow />
                )
            ) : !!videoLength ? (
                children
            ) : (
                <NothingToShow />
            )}
        </div>
    );
};
