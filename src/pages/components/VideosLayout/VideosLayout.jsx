import styles from "./videosLayout.module.css";

export const VideosLayout = ({ children, inHomepage = false }) => {
    return (
        <div
            className={`${styles["videos-layout"]} ${
                inHomepage && styles["homepage"]
            }`}
        >
            {children}
        </div>
    );
};
