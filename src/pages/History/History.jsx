import { useHistorySevices } from "../../hooks";
import { HistoryVideoCard } from "./components/HistoryVideoCard/HistoryVideoCard";
import styles from "./history.module.css";
import { NothingToShow } from "../../components";

export const History = () => {
    const { history, deleteVideoFromHistory, deleteAllVideosInHistory } =
        useHistorySevices(true);

    return (
        <>
            <div className={`${styles["history-header"]}`}>
                <div>
                    <p className="heading-5">History</p>
                    <p className="text-body-lg">
                        {!!history.length
                            ? `${history.length} videos`
                            : "No videos"}
                    </p>
                </div>
                {!!history.length && (
                    <button
                        onClick={() => deleteAllVideosInHistory()}
                        className="btn-filled-teal"
                    >
                        Clear
                    </button>
                )}
            </div>
            {!!history.length ? (
                <div className={`${styles["histroy-card-layout"]}`}>
                    {history.map((video) => (
                        <HistoryVideoCard
                            videos={video}
                            deleteVideo={deleteVideoFromHistory}
                        />
                    ))}
                </div>
            ) : (
                <NothingToShow />
            )}
        </>
    );
};
