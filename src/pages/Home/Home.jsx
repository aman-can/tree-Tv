import { FilterProvider } from "../../context";
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
