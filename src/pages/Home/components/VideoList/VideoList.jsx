import { VideosLayout, VideoCard } from "../../../components";
import { useFilter } from "../../../../context";

export const VideoList = () => {
    const { filterState } = useFilter();

    return (
        <VideosLayout>
            {filterState.videos.map((ele) => (
                <VideoCard key={ele._id} videos={ele} />
            ))}
        </VideosLayout>
    );
};
