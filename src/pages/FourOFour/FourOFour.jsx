import notFound from "./notFound.json";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import styles from "./notFound.module.css";
import { Link } from "react-router-dom";

export const FourOFour = () => {
    const notFoundRef = useRef();

    useEffect(() => {
        lottie.loadAnimation({
            container: notFoundRef.current,
            animationData: notFound,
            loop: true,
            autoplay: true,
            renderer: "svg",
            rendererSettings: {
                preserveAspectRatio: "xMinYMin slice",
            },
        });
    }, []);

    return (
        <div className={`${styles["notFound"]} flex-center text-align-center`}>
            <p className="heading-5 text-gutterBottom">
                Ooops! The page you're looking for no longer exists.
            </p>
            <p className="text-body-lg">
                Even we are in search of this page, until than go back to home
            </p>
            <span
                className={`${styles["illustration"]}`}
                ref={notFoundRef}
            ></span>

            <Link to="/" className="btn-filled-teal">
                Home page
            </Link>
        </div>
    );
};
