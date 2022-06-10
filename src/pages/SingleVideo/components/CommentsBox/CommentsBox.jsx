import { useState } from "react";
import { Comments } from "../../../../icons";
import styles from "./commentsBox.module.css";
import { useAuth, useLoaderOrToast } from "../../../../context";
import { getAvatarLetter } from "../../../../utils";

export const CommentsBox = ({ comments, AddComment, videoId }) => {
    const { currentUser } = useAuth();
    const [commentInput, setCommentInput] = useState("");
    const { setToastMessage } = useLoaderOrToast();
    const updateCommentHandler = () => {
        if (!!commentInput) {
            const comment = {
                _id: new Date().getSeconds(),
                user_name: currentUser.fullName,
                comment: commentInput,
                profile_color: currentUser.profile_color,
            };
            const newComments = comments.concat(comment);
            AddComment(videoId, newComments);
            setCommentInput("");
        } else {
            setToastMessage({ type: "red", text: "Comments can't be empty" });
        }
    };

    return (
        <>
            <div className={`${styles["comment-display"]}`}>
                <p className={`${styles["comments-count"]} heading-6`}>
                    <Comments />
                    {`${comments.length} comments`}
                </p>
                {!!currentUser.encodedToken && (
                    <div className={`${styles["comment-box"]} horizontal-list`}>
                        <div
                            style={{
                                background: `var(${currentUser.profile_color})`,
                            }}
                            className={`${styles["user-avatar"]} heading-6 avatar-circle-sm flex-center`}>
                            {getAvatarLetter(currentUser.fullName)}
                        </div>
                        <div
                            className={`${styles["comment-input"]} full-width`}>
                            <div className="full-width">
                                <input
                                    value={commentInput}
                                    onChange={e =>
                                        setCommentInput(e.target.value)
                                    }
                                    onKeyUp={e => {
                                        if (e.key === "Enter")
                                            updateCommentHandler();
                                    }}
                                    type="text"
                                    className="full-width text-body-lg"
                                    placeholder="add your comment here"
                                />
                                <span className="divider-dark-horizontal" />
                            </div>
                            <button
                                className="btn-outlined-teal"
                                onClick={() => setCommentInput("")}>
                                clear
                            </button>
                            <button
                                onClick={updateCommentHandler}
                                className={`${styles["filled-btn"]} btn-filled-teal`}>
                                comment
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {[...comments].reverse().map(item => {
                return (
                    <div
                        key={item._id}
                        className={`${styles["comment-box"]} horizontal-list`}>
                        <div
                            style={{ background: `var(${item.profile_color})` }}
                            className={`${styles["user-avatar"]} heading-6 avatar-circle-sm flex-center`}>
                            {getAvatarLetter(item.user_name)}
                        </div>
                        <div>
                            <div className="heading-6">{item.user_name}</div>
                            <div className="text-body-lg">{item.comment}</div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
