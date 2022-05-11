import { BrowserRouter } from "react-router-dom";
import {
    AuthProvider,
    LoaderAndToastProvider,
    FilterProvider,
} from "../../context";

export const ContextWrapper = ({ children }) => {
    return (
        <LoaderAndToastProvider>
            <FilterProvider>
                <AuthProvider>
                    <BrowserRouter>{children}</BrowserRouter>
                </AuthProvider>
            </FilterProvider>
        </LoaderAndToastProvider>
    );
};
