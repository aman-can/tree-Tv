import axios from "axios";
import { useAuth, useLoaderOrToast } from "../context";
import { useState, useEffect } from "react";

export const usePlaylistServices = ({
    getPlaylist = false,
    getPlaylistVideo = false,
    playlistId,
}) => {
    const { setIsLoading, setToastMessage } = useLoaderOrToast();
    const { currentUser } = useAuth();
    const [playlists, setPlaylists] = useState([]);
    const [playlistVideo, setPlaylistVideo] = useState({});

    useEffect(() => {
        if (currentUser?.encodedToken && getPlaylist) {
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.get("/api/user/playlists", {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    });
                    if (res.status === 200) {
                        setPlaylists(res.data.playlists);
                    }
                } catch (err) {
                    setPlaylists([]);
                    setToastMessage({
                        type: "red",
                        text: err.message,
                    });
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [currentUser, getPlaylist, setIsLoading, setToastMessage]);

    useEffect(() => {
        if (currentUser?.encodedToken && getPlaylistVideo) {
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.get(
                        `/api/user/playlists/${playlistId}`,
                        {
                            headers: {
                                authorization: localStorage.getItem("token"),
                            },
                        }
                    );
                    if (res.status === 200) {
                        setPlaylistVideo(res.data.playlist);
                    }
                } catch (err) {
                    setPlaylistVideo([]);
                    setToastMessage({
                        type: "red",
                        text: err.message,
                    });
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [
        currentUser,
        setIsLoading,
        setToastMessage,
        getPlaylistVideo,
        playlistId,
    ]);

    const createPlaylist = async playlist => {
        if (currentUser?.encodedToken) {
            try {
                const res = await axios.post(
                    "/api/user/playlists",
                    { playlist },
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                );
                if (res.status === 201) {
                    setPlaylists(res.data.playlists);
                    setToastMessage({
                        type: "blue",
                        text: "Playlist created",
                    });
                    return res.data.playlistId;
                }
            } catch (err) {
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            }
        }
    };

    const deletePlaylist = async playlistId => {
        if (currentUser?.encodedToken) {
            try {
                const res = await axios.delete(
                    `/api/user/playlists/${playlistId}`,
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                );
                if (res.status === 200) {
                    setPlaylists(res.data.playlists);
                    setToastMessage({
                        type: "blue",
                        text: "Playlist deleted",
                    });
                }
            } catch (err) {
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            } finally {
            }
        }
    };

    const addVideoToPlaylist = async (
        setIsPlaylistLoading,
        playlistId,
        video
    ) => {
        if (currentUser?.encodedToken) {
            try {
                if (!!setIsPlaylistLoading) setIsPlaylistLoading(true);

                const res = await axios.post(
                    `/api/user/playlists/${playlistId}`,
                    { video },
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                );
                if (res.status === 201) {
                    setPlaylistVideo(res.data.playlist);
                    setPlaylists(prev =>
                        prev.map(ele =>
                            ele._id === res.data.playlist._id
                                ? res.data.playlist
                                : ele
                        )
                    );
                    setToastMessage({
                        type: "green",
                        text: `Added the video in ${res.data.playlist.title}`,
                    });
                }
            } catch (err) {
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            } finally {
                if (!!setIsPlaylistLoading) setIsPlaylistLoading(false);
            }
        }
    };

    const deleteVideoFromPlaylist = async (
        setIsPlaylistLoading,
        playlistId,
        videoId
    ) => {
        if (currentUser?.encodedToken) {
            try {
                if (!!setIsPlaylistLoading) setIsPlaylistLoading(true);
                const res = await axios.delete(
                    `/api/user/playlists/${playlistId}/${videoId}`,
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                );
                if (res.status === 200) {
                    setPlaylistVideo(res.data.playlist);
                    setPlaylists(prev =>
                        prev.map(ele =>
                            ele._id === res.data.playlist._id
                                ? res.data.playlist
                                : ele
                        )
                    );
                    setToastMessage({
                        type: "green",
                        text: `Removed the video from ${res.data.playlist.title}`,
                    });
                }
            } catch (err) {
                setToastMessage({
                    type: "red",
                    text: err.message,
                });
            } finally {
                if (!!setIsPlaylistLoading) setIsPlaylistLoading(false);
            }
        }
    };

    return {
        playlists,
        createPlaylist,
        deletePlaylist,
        playlistVideo,
        addVideoToPlaylist,
        deleteVideoFromPlaylist,
    };
};
