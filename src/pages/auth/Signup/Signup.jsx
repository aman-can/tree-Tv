import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../auth.module.css";
import { useAuthSevices } from "../../../hooks";

export const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const [fieldErrors, setFieldErrors] = useState({});
    const { signup } = useAuthSevices(setFieldErrors);

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
                                    nameRef.current.value,
                                    emailRef.current.value,
                                    passwordRef.current.value
                                );
                            }}
                        >
                            <label htmlFor="username" className="input-label">
                                Full Name
                                <input
                                    ref={nameRef}
                                    className="input"
                                    type="text"
                                    placeholder="Enter your Full Name"
                                    minLength={1}
                                    id="username"
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
