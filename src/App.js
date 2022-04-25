import { Routes, Route, useLocation } from "react-router-dom";
import Mockman from "mockman-js";
import { Home, SingleVideo } from "./pages";
import { Navbar } from "./components";
import { useTheme } from "./hooks";
import { useEffect } from "react";

function App() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const { changeTheme, theme } = useTheme();

    return (
        <div className="App" id={theme}>
            <Navbar changeTheme={changeTheme} theme={theme} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="video/:videoId" element={<SingleVideo />} />
                <Route path="mock" element={<Mockman />} />
            </Routes>
        </div>
    );
}

export default App;
<></>;
