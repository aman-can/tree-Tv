import { Routes, Route, useLocation } from "react-router-dom";
import Mockman from "mockman-js";
import { Home, Signin, Signup, SingleVideo } from "./pages";
import { Navbar, PrivateRoute, Loader, Toast } from "./components";
import { useTheme } from "./hooks";
import { useEffect } from "react";
import { useLoaderOrToast } from "./context";

function App() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const { changeTheme, theme } = useTheme();

    const { isLoading, toastMessage } = useLoaderOrToast();

    return (
        <div className="App" id={theme}>
            <>
                {isLoading && <Loader />}
                {Object.values(toastMessage).every((e) => e) && (
                    <Toast text={toastMessage.text} type={toastMessage.type} />
                )}
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
                        {/* <Route path="playlist" element={<Wishlist />} /> */}
                        {/* <Route
                            path="playlist/:playlistId"
                            element={<Wishlist />}
                        /> */}
                        {/* <Route path="watchlater" element={<UserProfile />} /> */}
                        {/* <Route path="likes" element={<UserProfile />} /> */}
                        {/* <Route path="history" element={<UserProfile />} /> */}
                    </Route>

                    <Route path="mock" element={<Mockman />} />
                </Routes>
            </>
        </div>
    );
}

export default App;
