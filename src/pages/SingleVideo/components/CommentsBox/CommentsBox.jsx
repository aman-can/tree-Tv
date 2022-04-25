import { Comments } from "../../../../icons";
import styles from "./commentsBox.module.css";

export const CommentsBox = ({ comments }) => {
    return (
        <>
            <div className={`${styles["comment-display"]}`}>
                <p className={`${styles["comments-count"]} heading-6`}>
                    <Comments />
                    {`${comments.length} comments`}
                </p>
                <div className={`${styles["comment-box"]} horizontal-list`}>
                    <div
                        style={{ background: `var(--teal-100)` }}
                        className={`${styles["user-avatar"]} heading-6 avatar-circle-sm flex-center`}
                    >
                        A
                    </div>
                    <div className={`${styles["comment-input"]} full-width`}>
                        <div className="full-width">
                            <input
                                type="text"
                                className="full-width text-body-lg"
                            />
                            <span className="divider-dark-horizontal" />
                        </div>
                        <button className="btn-outlined-teal">clear</button>
                        <button className="btn-filled-teal">comment</button>
                    </div>
                </div>
            </div>
            {comments.map((item) => {
                return (
                    <div
                        key={item._id}
                        className={`${styles["comment-box"]} horizontal-list`}
                    >
                        <div
                            style={{ background: `var(${item.profile_color})` }}
                            className={`${styles["user-avatar"]} heading-6 avatar-circle-sm flex-center`}
                        >
                            {item.user_name[0]}
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
