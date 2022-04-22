import { useEffect, useRef, useState } from "react";
import { LeftArrow, RightArrow } from "../../../../icons";
import styles from "./slideshow.module.css";
import { useFilter } from "../../../../context";

const delay = 3000;

export const Slideshow = () => {
    const { filterState } = useFilter();

    let imgURLs = filterState.initialData.map((ele) => ele._id);
    imgURLs = [imgURLs[3], imgURLs[4], imgURLs[5], imgURLs[6]];
    console.log(imgURLs);

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === imgURLs.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className={`${styles["slideshow"]}`}>
            <span
                className={`${styles["slide-move"]} ${styles["move-left"]} flex-center`}
                onClick={() => {
                    setIndex((prev) =>
                        prev === 0 ? imgURLs.length - 1 : prev - 1
                    );
                }}
            >
                <LeftArrow />
            </span>
            <div
                className={`${styles["slideshowSlider"]}`}
                style={{ transform: `translateX(${-index * 100}%)` }}
            >
                {imgURLs.map((url, index) => (
                    <img
                        className={`${styles["slide"]}`}
                        key={index}
                        src={`https://i.ytimg.com/vi/${url}/maxresdefault.jpg`}
                        alt="nature"
                    />
                ))}
            </div>
            <span
                className={`${styles["slide-move"]} ${styles["move-right"]} flex-center`}
                onClick={() => {
                    setIndex((prev) =>
                        prev === imgURLs.length - 1 ? 0 : prev + 1
                    );
                }}
            >
                <RightArrow />
            </span>
        </div>
    );
};
