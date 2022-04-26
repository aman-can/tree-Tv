import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../auth.module.css";
import { useAuthSevices } from "../../../hooks";

export const Signin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [fieldErrors, setFieldErrors] = useState({});
    const { signin } = useAuthSevices(setFieldErrors);

    return (
        <div className={`${styles["TreeTv-modal"]} modal-sm`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div
                        className={`${styles["TreeTv-modal-header"]} modal-header`}
                    >
                        <h1 className="modal-title heading-4">Sign in</h1>
                    </div>
                    <div className="modal-body">
                        <form
                            autoComplete="off"
                            noValidate
                            onSubmit={(e) => {
                                e.preventDefault();
                                signin(
                                    emailRef.current.value,
                                    passwordRef.current.value
                                );
                            }}
                        >
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
                            <Link
                                to="#"
                                className={`${styles["TreeTv-text-capital"]} btn-link text-body-sm text-gutterBottom text-align-center`}
                            >
                                Forgot your Password ?
                            </Link>
                            <input
                                className="btn-filled-teal margin-auto text-align-center"
                                type="submit"
                                value="Sign in"
                            />
                            <input
                                // the style below is temporary, this entire button is going to get deleted
                                style={{ marginTop: "1rem" }}
                                className="btn-filled-teal margin-auto text-align-center"
                                type="reset"
                                value="guest sign in"
                                onClick={(e) => {
                                    e.preventDefault();
                                    signin("karishma@kaa.karishma", "karishma");
                                }}
                            />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <Link
                            to="/sign-up"
                            className={`${styles["TreeTv-text-capital"]} btn-link text-align-center`}
                        >
                            Create New Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
