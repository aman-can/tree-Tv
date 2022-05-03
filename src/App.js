import { Routes, Route, useLocation } from "react-router-dom";
import Mockman from "mockman-js";
import {
    History,
    Home,
    LikedVideos,
    Playlists,
    Profile,
    Signin,
    Signup,
    SinglePlaylistVideos,
    SingleVideo,
    Watchlater,
} from "./pages";
import {
    Navbar,
    PrivateRoute,
    Loader,
    Toast,
    PlaylistModal,
} from "./components";
import { useTheme } from "./hooks";
import { useEffect } from "react";
import { useLoaderOrToast } from "./context";

function App() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const { changeTheme, theme } = useTheme();

    const { isLoading, toastMessage, playlistModalVideo } = useLoaderOrToast();

    return (
        <div className="App" id={theme}>
            <>
                <div>
                    {!!Object.keys(playlistModalVideo).length && (
                        <PlaylistModal video={playlistModalVideo} />
                    )}
                    {isLoading && <Loader />}
                    {Object.values(toastMessage).every((e) => e) && (
                        <Toast
                            text={toastMessage.text}
                            type={toastMessage.type}
                        />
                    )}
                </div>
                <Navbar changeTheme={changeTheme} theme={theme} />
                <Routes>
                    {/* <Route path="*" element={<FourOFour />} /> */}
                    <Route path="/" element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="video/:videoId" element={<SingleVideo />} />

                    <Route element={<PrivateRoute switchPath={false} />}>
                        <Route path="sign-up" element={<Signup />} />
                        <Route path="sign-in" element={<Signin />} />
                    </Route>

                    <Route element={<PrivateRoute />}>
                        <Route path="user-profile" element={<Profile />} />
                        <Route path="playlists" element={<Playlists />} />
                        <Route
                            path="playlists/:playlistId"
                            element={<SinglePlaylistVideos />}
                        />
                        <Route path="watchlater" element={<Watchlater />} />
                        <Route path="liked-videos" element={<LikedVideos />} />
                        <Route path="history" element={<History />} />
                    </Route>

                    <Route path="mock" element={<Mockman />} />
                </Routes>
            </>
        </div>
    );
}

export default App;
