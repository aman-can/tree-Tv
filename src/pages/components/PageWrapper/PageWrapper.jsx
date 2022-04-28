import { NothingToShow } from "../../../components";
import styles from "./pageWrapper.module.css";

export const PageWrapper = ({
    children,
    hearderText,
    clearFunction,
    videoLength,
    noClear = false,
}) => {
    return (
        <div className={`${styles["page-wrapper"]}`}>
            <div className={`${styles["page-header"]}`}>
                <div>
                    <p className="heading-5">{hearderText}</p>
                    <p className="text-body-lg">
                        {!!videoLength ? `${videoLength} videos` : "No videos"}
                    </p>
                </div>
                {!!videoLength && noClear && (
                    <button
                        onClick={() => clearFunction()}
                        className="btn-filled-teal"
                    >
                        Clear
                    </button>
                )}
            </div>
            {!!videoLength ? children : <NothingToShow />}
        </div>
    );
};
