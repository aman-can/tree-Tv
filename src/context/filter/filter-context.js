import { createContext, useContext, useReducer, useEffect } from "react";
import { filterReducer, initialFilterState } from "../../reducers";
import { useVideos } from "../../hooks";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
    const allVideos = useVideos();

    const [filterState, filterDispatch] = useReducer(
        filterReducer,
        initialFilterState
    );

    useEffect(() => {
        filterDispatch({
            type: "INITIALISE",
            payload: { videos: allVideos },
        });
    }, [allVideos]);

    return (
        <FilterContext.Provider value={{ filterState, filterDispatch }}>
            {children}
        </FilterContext.Provider>
    );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
