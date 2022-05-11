import { filterConstants } from "../constants";

export const initialFilterState = {
    initialData: [],
    videos: [],
    selectedCategory: "",
    isSorted: false,
    searchText: "",
};

export const filterReducer = (state, action) => {
    switch (action.type) {
        case filterConstants.INITIALISE:
            return {
                ...state,
                videos: action.payload.videos,
                initialData: action.payload.videos,
                selectedCategory: "All",
                isSorted: false,
                searchText: "",
            };

        case filterConstants.SELECT_CATEGORY:
            return finalFilter({
                ...state,
                selectedCategory: action.payload.selectedCategory,
            });

        case filterConstants.SORT:
            return finalFilter({
                ...state,
                isSorted: action.payload.willSort,
            });

        case filterConstants.ALL_CATEGORY:
            return finalFilter({
                ...state,
                selectedCategory: "All",
            });

        case filterConstants.SEARCH:
            return finalFilter({
                ...state,
                searchText: action.payload.searchText,
            });

        case filterConstants.CLEAR_ALL_FILTERS:
            return {
                ...initialFilterState,
                initialData: [...state.initialData],
                videos: [...state.initialData],
                selectedCategory: "All",
                isSorted: false,
                searchText: "",
            };
        default:
            return state;
    }
};

function finalFilter(state) {
    return {
        ...state,
        videos: [...state.initialData]
            .filter((video) => videoFilter(video, state))
            .sort((a, b) => videoSort(a, b, state)),
    };
}

const videoFilter = (video, state) => {
    return (
        (video.categories.includes(state.selectedCategory) ||
            state.selectedCategory === "All") &&
        video.title.toLowerCase().includes(state.searchText.toLowerCase())
    );
};

const videoSort = (a, b, state) => {
    if (state.isSorted) {
        return new Date(b.release_date) - new Date(a.release_date);
    }
};
