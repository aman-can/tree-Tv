import styles from "./videosLayout.module.css";

export const VideosLayout = ({ children }) => {
    return <div className={`${styles["videos-layout"]}`}>{children}</div>;
};
