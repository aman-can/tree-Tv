import { useEffect, useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState("dark");
    useEffect(() => setTheme(localStorage.getItem("theme") ?? "dark"), []);
    const changeTheme = () => {
        localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
        setTheme(localStorage.getItem("theme"));
    };
    return { changeTheme, theme };
};
