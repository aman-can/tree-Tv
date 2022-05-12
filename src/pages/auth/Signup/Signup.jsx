import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../auth.module.css";
import { useAuthSevices } from "../../../hooks";
import { Edit, Profile } from "../../../icons";
import { getAvatarLetter } from "../../../utils";

export const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [color, setColor] = useState("teal");
    const [name, setName] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [openColorsModal, setOpenColorsModal] = useState(false);
    const { signup } = useAuthSevices(setFieldErrors);
    const colors = [
        "--pink-100",
        "--blue-100",
        "--green-100",
        "--teal-100",
        "--yellow-100",
    ];

    return (
        <div className={`${styles["TreeTv-modal"]} modal-sm`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div
                        className={`${styles["TreeTv-modal-header"]} modal-header`}
                    >
                        <h1 className="modal-title heading-4">Sign up</h1>
                    </div>
                    <div className="modal-body">
                        <form
                            autoComplete="off"
                            noValidate
                            onSubmit={(e) => {
                                e.preventDefault();
                                signup(
                                    name,
                                    emailRef.current.value,
                                    color,
                                    passwordRef.current.value
                                );
                            }}
                        >
                            <div className="badge-container heading-6 margin-auto">
                                <div
                                    onClick={() =>
                                        setOpenColorsModal((prev) => !prev)
                                    }
                                    style={{
                                        backgroundColor: `var(${color})`,
                                    }}
                                    className={`${styles["TreeTv-profile-avatar"]} avatar-circle-lg  flex-center heading-4 margin-auto`}
                                >
                                    {getAvatarLetter(name) || <Profile />}
                                </div>
                                <span
                                    className={`${styles["edit-badge"]} number-badge-green`}
                                >
                                    <Edit />
                                </span>
                            </div>

                            {openColorsModal && (
                                <div
                                    onClick={() =>
                                        setOpenColorsModal((prev) => !prev)
                                    }
                                    className={`${styles["avatar-colors-modal"]} flex-center`}
                                >
                                    <div
                                        className={`${styles["avatar-colors-box"]} horizontal-list`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {colors.map((color) => (
                                            <div
                                                onClick={() => {
                                                    setColor(color);
                                                    setOpenColorsModal(false);
                                                }}
                                                key={color}
                                                style={{
                                                    backgroundColor: `var(--${color}-100)`,
                                                }}
                                                className={`${styles["TreeTv-profile-avatar"]} avatar-circle-sm  flex-center heading-6 margin-auto`}
                                            >
                                                {getAvatarLetter()}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <label htmlFor="username" className="input-label">
                                Full Name
                                <input
                                    value={name}
                                    className="input"
                                    type="text"
                                    placeholder="Enter your Full Name"
                                    minLength={1}
                                    id="username"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <p className="input-error-msg">
                                    {fieldErrors.fullName}
                                </p>
                            </label>
                            <label htmlFor="email" className="input-label">
                                Email
                                <input
                                    ref={emailRef}
                                    className="input"
                                    type="text"
                                    placeholder="Enter your Email id"
                                    id="email"
                                    pattern="^.+@.+.\.+.+."
                                />
                                <p className="input-error-msg">
                                    {fieldErrors.email}
                                </p>
                            </label>
                            <label htmlFor="password" className="input-label">
                                Password
                                <input
                                    ref={passwordRef}
                                    className="input"
                                    type="password"
                                    placeholder="Enter the password"
                                    id="password"
                                    minLength={8}
                                />
                                <p className="input-error-msg">
                                    {fieldErrors.password}
                                </p>
                            </label>
                            <input
                                className="btn-filled-teal margin-auto text-align-center"
                                type="submit"
                                value="Sign up"
                            />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <Link
                            to="/sign-in"
                            className={`${styles["TreeTv-text-capital"]} btn-link text-align-center`}
                        >
                            Already have an account ?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
