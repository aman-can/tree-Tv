import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        fullName: localStorage.getItem("fullName") ?? "",
        email: localStorage.getItem("email") ?? "",
        encodedToken: localStorage.getItem("token") ?? "",
        profile_color: localStorage.getItem("profile_color") ?? "",
    });
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
