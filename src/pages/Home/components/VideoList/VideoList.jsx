import { VideosLayout, VideoCard } from "../../../components";
import { useFilter, useLoaderOrToast } from "../../../../context";
import { useWatchlaterSevices } from "../../../../hooks";

export const VideoList = () => {
    const { filterState } = useFilter();
    const { addToWatchlater, watchlater, removeFromWatchlater } =
        useWatchlaterSevices(true);

    const { setPlaylistModalVideo } = useLoaderOrToast();
    return (
        <VideosLayout inHomepage>
            {filterState.videos.map((ele) => (
                <VideoCard
                    isInWatchlater={watchlater.some(
                        (item) => item._id === ele._id
                    )}
                    handlePlaylistToggle={setPlaylistModalVideo}
                    handleRemove={removeFromWatchlater}
                    handleAddWatchlater={addToWatchlater}
                    key={ele._id}
                    videos={ele}
                />
            ))}
        </VideosLayout>
    );
};
