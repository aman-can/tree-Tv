import { VideosLayout, VideoCard } from "../../../components";
import { useFilter } from "../../../../context";
import { useWatchlaterSevices } from "../../../../hooks";

export const VideoList = () => {
    const { filterState } = useFilter();
    const { addToWatchlater, watchlater, removeFromWatchlater } =
        useWatchlaterSevices(true);
    return (
        <VideosLayout>
            {filterState.videos.map((ele) => (
                <VideoCard
                    isInWatchlater={watchlater.some(
                        (item) => item._id === ele._id
                    )}
                    handleRemove={removeFromWatchlater}
                    handleAddWatchlater={addToWatchlater}
                    key={ele._id}
                    videos={ele}
                />
            ))}
        </VideosLayout>
    );
};
