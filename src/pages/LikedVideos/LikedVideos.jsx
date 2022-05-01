import { useLoaderOrToast } from "../../context";
import { useLikeSevices, useWatchlaterSevices } from "../../hooks";
import { VideoCard, VideosLayout, PageWrapper } from "../components";

export const LikedVideos = () => {
    const { liked, unlikeVideo } = useLikeSevices(true);
    const { watchlater, addToWatchlater } = useWatchlaterSevices(true);
    const { setPlaylistModalVideo } = useLoaderOrToast();

    return (
        <PageWrapper hearderText={"Liked videos"} videoLength={liked.length}>
            <VideosLayout>
                {liked.map((video) => (
                    <VideoCard
                        isInWatchlater={watchlater.some(
                            (item) => item._id === video._id
                        )}
                        handlePlaylistToggle={setPlaylistModalVideo}
                        handleAddWatchlater={addToWatchlater}
                        handleRemove={unlikeVideo}
                        isLikeCard
                        canHover={false}
                        videos={video}
                    />
                ))}
            </VideosLayout>
        </PageWrapper>
    );
};
