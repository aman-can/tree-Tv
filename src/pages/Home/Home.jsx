import { FilterProvider } from "../../context";
import { Slideshow, VideoList } from "./components";
import { CategoriesList } from "../components";

export const Home = () => {
    return (
        <>
            <Slideshow />
            <CategoriesList />
            <VideoList />
        </>
    );
};
