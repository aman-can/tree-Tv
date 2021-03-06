import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useDraggable } from "react-use-draggable-scroll";
import styles from "./categoriesList.module.css";
import { LeftArrow, RightArrow } from "../../../icons";
import { Chip } from "./components";
import { useFilter, useLoaderOrToast } from "../../../context";
import { filterConstants } from "../../../constants";

export const CategoriesList = () => {
    const categoriesRef = useRef();
    const { events } = useDraggable(categoriesRef);
    const [scrollX, setscrollX] = useState(0);
    const [scrolEnd, setscrolEnd] = useState(false);
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState("");
    const { setIsLoading, setToastMessage } = useLoaderOrToast();
    const { filterDispatch } = useFilter();

    const chipScroll = scroll => () => {
        categoriesRef.current.scrollLeft += scroll;
        setscrollX(prev => prev + scroll);
        Math.floor(
            categoriesRef.current.scrollWidth - categoriesRef.current.scrollLeft
        ) <= categoriesRef.current.offsetWidth
            ? setscrolEnd(true)
            : setscrolEnd(false);
    };

    const scrollCheck = () => {
        setscrollX(categoriesRef.current.scrollLeft);
        if (
            Math.floor(
                categoriesRef.current.scrollWidth -
                    categoriesRef.current.scrollLeft
            ) <= categoriesRef.current.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await axios.get("/api/categories");
                if (res.status === 200) {
                    setCategories(res.data.categories);
                }
            } catch (err) {
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            } finally {
                setIsLoading(false);
            }
        })();
        return () => {
            filterDispatch({
                type: filterConstants.CLEAR_ALL_FILTERS,
            });
        };
    }, [filterDispatch, setIsLoading, setToastMessage]);

    return (
        <div className={`${styles["categories-container"]}`}>
            {scrollX !== 0 && (
                <span
                    onClick={chipScroll(-50)}
                    className={`${styles["scroll-btn"]} flex-center`}>
                    <LeftArrow />
                </span>
            )}
            <div
                {...events}
                ref={categoriesRef}
                className={`${styles["chip-box"]} horizontal-list`}
                onScroll={scrollCheck}>
                <Chip text="All" isActive={active} setActive={setActive} />
                {categories.map(ele => (
                    <Chip
                        key={ele._id}
                        text={ele.categoryName}
                        isActive={active}
                        setActive={setActive}
                    />
                ))}
            </div>
            {!scrolEnd && (
                <span
                    onClick={chipScroll(+50)}
                    className={`${styles["scroll-btn"]} flex-center`}>
                    <RightArrow />
                </span>
            )}
        </div>
    );
};
