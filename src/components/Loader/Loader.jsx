import loader from "./spinner.json";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import styles from "./loader.module.css";
import { useLockBodyScroll } from "../../hooks";

export const Loader = () => {
    useLockBodyScroll();
    const loaderRef = useRef();

    useEffect(() => {
        lottie.loadAnimation({
            container: loaderRef.current,
            animationData: loader,
            loop: true,
            autoplay: true,
            renderer: "svg",
            rendererSettings: {
                preserveAspectRatio: "xMinYMin slice",
            },
        });
    }, []);

    return (
        <div className={`${styles["loader"]} flex-center`}>
            <span ref={loaderRef}></span>
        </div>
    );
};
