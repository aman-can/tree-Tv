import { useHistorySevices, useWatchlaterSevices } from "../../hooks";
import { HistoryVideoCard } from "./components/HistoryVideoCard/HistoryVideoCard";
import styles from "./history.module.css";
import { NothingToShow } from "../../components";
import { PageWrapper } from "../components";
import { useLoaderOrToast } from "../../context";

export const History = () => {
    const { history, deleteVideoFromHistory, deleteAllVideosInHistory } =
        useHistorySevices(true);
    const { watchlater, addToWatchlater } = useWatchlaterSevices(true);
    const { setPlaylistModalVideo } = useLoaderOrToast();

    return (
        <PageWrapper
            clearFunction={deleteAllVideosInHistory}
            hearderText={"History"}
            videoLength={history.length}
            noClear
        >
            <div className={`${styles["histroy-card-layout"]}`}>
                {history.map((video) => (
                    <HistoryVideoCard
                        isInWatchlater={watchlater.some(
                            (item) => item._id === video._id
                        )}
                        handleAddWatchlater={addToWatchlater}
                        key={video._id}
                        videos={video}
                        deleteVideo={deleteVideoFromHistory}
                        handlePlaylistToggle={setPlaylistModalVideo}
                    />
                ))}
            </div>
        </PageWrapper>
    );
};
