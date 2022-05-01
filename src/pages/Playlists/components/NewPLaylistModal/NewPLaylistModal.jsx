import { useState, useRef } from "react";
import { useLockBodyScroll } from "../../../../hooks";
import { Cross, Playlist } from "../../../../icons";

import styles from "./newPLaylistModal.module.css";

export const NewPLaylistModal = ({ closeModal, createPlaylist }) => {
    useLockBodyScroll();

    const inputRef = useRef();

    const [showInput, setShowInput] = useState(false);

    const handleCreatePlaylist = () => {
        if (inputRef.current.value) {
            createPlaylist({
                title: inputRef.current.value,
            });
            inputRef.current.value = "";
            closeModal();
        }
    };

    return (
        <div
            onClick={() => closeModal()}
            className={`${styles["playlist-modal"]} modal-sm`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${styles["playlist-modal-dialog"]} modal-dialog`}
            >
                <div className={`${styles["playlist-content"]} modal-content`}>
                    <div
                        className={`${styles["playlist-header"]} modal-header`}
                    >
                        <h1 className="modal-title heading-6">
                            {!showInput
                                ? "Click on the button"
                                : "Enter playlist name"}
                        </h1>
                        <button
                            onClick={() => closeModal()}
                            className="icon-btn-ghost-sm modal-close-btn"
                        >
                            <Cross />
                        </button>
                    </div>

                    <div
                        className={`${styles["playlist-footer"]} modal-footer`}
                    >
                        {showInput && (
                            <input
                                ref={inputRef}
                                placeholder="Playlist name"
                                type="text"
                                className={`${styles["playlist-input"]} full-width`}
                            />
                        )}

                        {showInput ? (
                            <button
                                onClick={handleCreatePlaylist}
                                type="button"
                                className="btn-filled-teal flex-center margin-auto"
                            >
                                Create
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowInput(true)}
                                type="button"
                                className="btn-filled-teal flex-center full-width"
                            >
                                <Playlist /> Create a new playlist
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
