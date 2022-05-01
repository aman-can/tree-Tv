import { NothingToShow } from "../../../components";
import styles from "./pageWrapper.module.css";

export const PageWrapper = ({
    children,
    hearderText,
    clearFunction,
    createFunction,
    videoLength,
    noClear = false,
    inPlaylists = false,
    playlistsLength,
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
                {!!videoLength && noClear && (
                    <button
                        onClick={() => clearFunction()}
                        className="btn-filled-teal"
                    >
                        Clear
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
