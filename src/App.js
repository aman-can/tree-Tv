import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import { Home } from "./pages";
import { Navbar } from "./components";
import { useTheme } from "./hooks";

function App() {
    const { changeTheme, theme } = useTheme();

    return (
        <div className="App" id={theme}>
            <Navbar changeTheme={changeTheme} theme={theme} />
            <Routes>
                <Route path="mock" element={<Mockman />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
<></>;
