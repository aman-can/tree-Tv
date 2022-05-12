import styles from "./profile.module.css";
import { useAuth } from "../../context";
import { useAuthSevices } from "../../hooks";

export const Profile = () => {
    const { currentUser } = useAuth();
    const { signout } = useAuthSevices();
    let avatar = currentUser?.fullName.split(" ");
    avatar = avatar[0][0] + (!!avatar[1] ? avatar[1][0] : "");
    avatar = avatar.toUpperCase();

    return (
        <div className={`${styles["TreeTv-modal"]} modal-sm`}>
            <div className={`${styles["TreeTv-modal-dialog"]} modal-dialog`}>
                <div className="modal-content">
                    <div
                        className={`${styles["TreeTv-modal-header"]} modal-header`}
                    >
                        <h1 className="modal-title heading-4 text-noWrap">
                            Profile
                        </h1>
                        <button
                            onClick={() => signout()}
                            className="btn-filled-teal"
                        >
                            logout
                        </button>
                    </div>
                    <div className="modal-body">
                        <div
                            style={{
                                backgroundColor: `var(${
                                    currentUser?.profile_color || "--teal-100"
                                })`,
                            }}
                            className={`${styles["profile-avatar"]} avatar-circle-lg  flex-center heading-4 margin-auto`}
                        >
                            {avatar}
                        </div>
                        <span
                            className={`${styles["profile-heading"]} heading-6 text-gutterTop text-noWrap`}
                        >
                            User Details
                            <span className="divider-dark-horizontal" />
                        </span>
                        <p className="text-body-lg text-gutterTop text-noWrap">
                            Name: {currentUser?.fullName}
                        </p>
                        <p className="text-body-lg text-gutterTop text-noWrap">
                            Email: {currentUser?.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
