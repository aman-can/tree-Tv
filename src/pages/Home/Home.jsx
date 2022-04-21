import { FilterProvider } from "../../context";
import { useVideos } from "../../hooks";
import { CategoriesList, Slideshow, VideoList } from "./components";

export const Home = () => {
    return (
        <FilterProvider>
            <Slideshow />
            <CategoriesList />
            <VideoList />
        </FilterProvider>
    );
};
