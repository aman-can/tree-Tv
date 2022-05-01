import { useParams } from "react-router-dom";
import { usePlaylistServices } from "../../hooks";
import { PageWrapper, VideoCard, VideosLayout } from "../components";

export const SinglePlaylistVideos = () => {
    const { playlistId } = useParams();
    const {
        deleteVideoFromPlaylist,
        playlistVideo: { title, videos },
    } = usePlaylistServices({
        getPlaylistVideo: true,
        playlistId: playlistId,
    });

    return (
        <PageWrapper hearderText={title} videoLength={videos?.length || 0}>
            <VideosLayout>
                {videos?.map((video) => (
                    <VideoCard
                        handleRemove={deleteVideoFromPlaylist}
                        isPlaylistCard
                        canHover={false}
                        videos={video}
                        playlistId={playlistId}
                    />
                ))}
            </VideosLayout>
        </PageWrapper>
    );
};
