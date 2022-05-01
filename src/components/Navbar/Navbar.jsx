import { useState } from "react";
import { Link } from "react-router-dom";
import {
    DarkMode,
    History,
    Home,
    LightMode,
    Liked,
    MenuClose,
    MenuOpen,
    Playlist,
    Profile,
    Watchlater,
} from "../../icons";
import { useLockBodyScroll } from "../../hooks";
import logo from "../Images/logo.svg";
import styles from "./navbar.module.css";

export const Navbar = ({ changeTheme, theme }) => {
    const [drawer, setDrawer] = useState(false);
    const [bodyLock, setBodyLock] = useState(false);

    useLockBodyScroll(bodyLock);

    return (
        <>
            <div className={`${styles["treeTv-appbar"]} appbar-fixed`}>
                <div className="appbar-hero ">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="responsive-image"
                        />
                    </Link>
                </div>
                <div className={`${styles["search-box"]}`}>
                    <input
                        type="search"
                        placeholder="Search"
                        className={`${styles["treeTv-search"]}`}
                        onChange={(e) => {
                            console.log("adsddf");
                        }}
                        onKeyUp={(e) => {
                            console.log("sdasd");
                        }}
                    />
                </div>

                <div
                    className={`${styles["drawer"]}  ${
                        drawer && styles["drawer-open"]
                    }`}
                >
                    <ul className="vertical-list">
                        <li
                            onClick={() => {
                                setDrawer(false);
                                setBodyLock(false);
                            }}
                            className={`${styles["tooltip"]}`}
                        >
                            <Link className="icon-btn-teal" to="/">
                                <Home />
                            </Link>
                            <span className={`${styles["tooltiptext"]}`}>
                                Home
                            </span>
                        </li>
                        <li
                            onClick={() => {
                                setDrawer(false);
                                setBodyLock(false);
                            }}
                            className={`${styles["tooltip"]}`}
                        >
                            <Link className="icon-btn-teal" to="/playlists">
                                <Playlist />
                            </Link>
                            <span className={`${styles["tooltiptext"]}`}>
                                Playlist
                            </span>
                        </li>
                        <li
                            onClick={() => {
                                setDrawer(false);
                                setBodyLock(false);
                            }}
                            className={`${styles["tooltip"]}`}
                        >
                            <Link className="icon-btn-teal" to="/liked-videos">
                                <Liked />
                            </Link>
                            <span className={`${styles["tooltiptext"]}`}>
                                Liked
                            </span>
                        </li>
                        <li
                            onClick={() => {
                                setDrawer(false);
                                setBodyLock(false);
                            }}
                            className={`${styles["tooltip"]}`}
                        >
                            <Link className="icon-btn-teal" to="/watchlater">
                                <Watchlater />
                            </Link>
                            <span className={`${styles["tooltiptext"]}`}>
                                Watchlater
                            </span>
                        </li>
                        <li
                            onClick={() => {
                                setDrawer(false);
                                setBodyLock(false);
                            }}
                            className={`${styles["tooltip"]}`}
                        >
                            <Link className="icon-btn-teal" to="/history">
                                <History />
                            </Link>
                            <span className={`${styles["tooltiptext"]}`}>
                                History
                            </span>
                        </li>
                        <li
                            onClick={() => {
                                setDrawer(false);
                                setBodyLock(false);
                                changeTheme();
                            }}
                            className={`${styles["tooltip"]}`}
                        >
                            <button className="icon-btn-teal">
                                {theme === "light" ? (
                                    <DarkMode />
                                ) : (
                                    <LightMode />
                                )}
                            </button>
                            <span className={`${styles["tooltiptext"]}`}>
                                Theme
                            </span>
                        </li>
                        <li
                            onClick={() => {
                                setDrawer(false);
                                setBodyLock(false);
                            }}
                            className={`${styles["tooltip"]}`}
                        >
                            <Link className="icon-btn-teal" to="/sign-in">
                                <Profile />
                            </Link>
                            <span className={`${styles["tooltiptext"]}`}>
                                Profile
                            </span>
                        </li>
                    </ul>
                </div>
                <div
                    className={`${styles["treeTv-appbar-menu"]} appbar-menu treeTv-hidden`}
                >
                    <button
                        onClick={() => {
                            setDrawer((prev) => !prev);
                            setBodyLock((prev) => !prev);
                        }}
                        className="icon-btn-teal"
                    >
                        {!drawer ? <MenuClose /> : <MenuOpen />}
                    </button>
                </div>
            </div>

            <div
                className={`${styles["treeTv-appbar-filler"]} "appbar-fixed-filler"`}
            ></div>
        </>
    );
};
