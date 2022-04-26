import { BrowserRouter } from "react-router-dom";
import { AuthProvider, LoaderAndToastProvider } from "../../context";

export const ContextWrapper = ({ children }) => {
    return (
        <LoaderAndToastProvider>
            <AuthProvider>
                <BrowserRouter>{children}</BrowserRouter>
            </AuthProvider>
        </LoaderAndToastProvider>
    );
};
