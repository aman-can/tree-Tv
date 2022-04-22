import { useFilter } from "../../../../../../context";
import { filterConstants } from "../../../../../../constants";

import styles from "./chip.module.css";

export const Chip = ({ text, setActive }) => {
    const { filterState, filterDispatch } = useFilter();

    const clickHandler = () => {
        text === "All"
            ? filterDispatch({
                  type: filterConstants.ALL_CATEGORY,
              })
            : filterState.selectedCategory === text
            ? filterDispatch({
                  type: filterConstants.ALL_CATEGORY,
              })
            : filterDispatch({
                  type: filterConstants.SELECT_CATEGORY,
                  payload: { selectedCategory: text },
              });
    };

    return (
        <span
            onClick={clickHandler}
            className={`${styles["chip"]} ${
                filterState.selectedCategory === text
                    ? styles["chip-active"]
                    : ""
            }`}
        >
            {text}
        </span>
    );
};
