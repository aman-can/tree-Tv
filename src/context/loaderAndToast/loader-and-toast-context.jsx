import { createContext, useContext, useState } from "react";

const LoaderAndToastContext = createContext();

const LoaderAndToastProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState({ type: "", text: "" });
    const [playlistModalVideo, setPlaylistModalVideo] = useState({});

    return (
        <LoaderAndToastContext.Provider
            value={{
                playlistModalVideo,
                setPlaylistModalVideo,
                isLoading,
                setIsLoading,
                toastMessage,
                setToastMessage,
            }}
        >
            {children}
        </LoaderAndToastContext.Provider>
    );
};

const useLoaderOrToast = () => useContext(LoaderAndToastContext);

export { LoaderAndToastProvider, useLoaderOrToast };
