import { createContext, useContext, useReducer, useEffect } from "react";
import { filterReducer, initialFilterState } from "../../reducers";
import { useVideos } from "../../hooks";
import { filterConstants } from "../../constants";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
    const allVideos = useVideos();

    const [filterState, filterDispatch] = useReducer(
        filterReducer,
        initialFilterState
    );

    useEffect(() => {
        filterDispatch({
            type: filterConstants.INITIALISE,
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
