import { useState } from "react";
import { usePlaylistServices } from "../../hooks";
import { PageWrapper, VideosLayout } from "../components";
import { NewPLaylistModal, PlaylistCard } from "./components";

export const Playlists = () => {
    const { playlists, deletePlaylist, createPlaylist } = usePlaylistServices({
        getPlaylist: true,
    });

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <PageWrapper
                hearderText={"Playlists"}
                createFunction={() => setOpenModal((prev) => !prev)}
                inPlaylists
                playlistsLength={playlists.length}
            >
                <VideosLayout>
                    {playlists.map((playlist) => {
                        return (
                            <PlaylistCard
                                key={playlist._id}
                                deletePlaylist={deletePlaylist}
                                playlist={playlist}
                            />
                        );
                    })}
                </VideosLayout>
            </PageWrapper>
            {openModal && (
                <NewPLaylistModal
                    createPlaylist={createPlaylist}
                    closeModal={() => setOpenModal(false)}
                />
            )}
        </>
    );
};
