import { useLoaderOrToast } from "../../context";
import { useWatchlaterSevices } from "../../hooks";
import { VideoCard, VideosLayout } from "../components";
import { PageWrapper } from "../components";

export const Watchlater = () => {
    const { watchlater, removeFromWatchlater, addToWatchlater } =
        useWatchlaterSevices(true);
    const { setPlaylistModalVideo } = useLoaderOrToast();

    return (
        <PageWrapper hearderText={"Watchlater"} videoLength={watchlater.length}>
            <VideosLayout>
                {watchlater.map((video) => (
                    <VideoCard
                        handlePlaylistToggle={setPlaylistModalVideo}
                        handleAddWatchlater={addToWatchlater}
                        handleRemove={removeFromWatchlater}
                        isWatchLaterCard
                        canHover={false}
                        videos={video}
                    />
                ))}
            </VideosLayout>
        </PageWrapper>
    );
};
