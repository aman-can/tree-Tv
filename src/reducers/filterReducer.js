import { filterConstants } from "../constants";

export const initialFilterState = {
    initialData: [],
    videos: [],
    selectedCategory: "",
};

export const filterReducer = (state, action) => {
    switch (action.type) {
        case filterConstants.INITIALISE:
            return {
                ...state,
                videos: action.payload.videos,
                initialData: action.payload.videos,
                selectedCategory: "All",
            };

        case filterConstants.SELECT_CATEGORY:
            return {
                ...state,
                videos: [...state.initialData].filter((video) =>
                    video.categories.includes(action.payload.selectedCategory)
                ),
                selectedCategory: action.payload.selectedCategory,
            };
        case filterConstants.ALL_CATEGORY:
            return {
                ...initialFilterState,
                initialData: [...state.initialData],
                videos: [...state.initialData],
                selectedCategory: "All",
            };
        default:
            return state;
    }
};
