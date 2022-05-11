import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { filterConstants } from "../../constants";
import { useFilter, useLoaderOrToast } from "../../context";
import { useWatchlaterSevices } from "../../hooks";
import {
    HorizontalVideoCard,
    PageWrapper,
    CategoriesList,
} from "../components";
import styles from "./search.module.css";

export const Search = () => {
    const { filterState, filterDispatch } = useFilter();
    const { watchlater, addToWatchlater } = useWatchlaterSevices();
    const { setPlaylistModalVideo } = useLoaderOrToast();
    const [query] = useSearchParams();

    useEffect(() => {
        filterDispatch({
            type: filterConstants.SEARCH,
            payload: {
                searchText: query.get("text"),
            },
        });
    }, [query]);

    return (
        <>
            <CategoriesList />
            <PageWrapper
                sortFunction={() =>
                    filterDispatch({
                        type: filterConstants.SORT,
                        payload: {
                            willSort: !filterState.isSorted,
                        },
                    })
                }
                hearderText={"Search"}
                videoLength={filterState.videos.length}
                inSearch
                searchSorted={filterState.isSorted}
            >
                <div className={`${styles["search-card-layout"]}`}>
                    {filterState.videos.map((video) => (
                        <HorizontalVideoCard
                            isInWatchlater={watchlater.some(
                                (item) => item._id === video._id
                            )}
                            handleAddWatchlater={addToWatchlater}
                            key={video._id}
                            videos={video}
                            isSearchCard
                            handlePlaylistToggle={setPlaylistModalVideo}
                        />
                    ))}
                </div>
            </PageWrapper>
        </>
    );
};
