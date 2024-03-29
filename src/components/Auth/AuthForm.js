import { useState, useRef, useContext } from "react";
import {useNavigate} from "react-router-dom";

import classes from "./AuthForm.module.css";
import AuthContext from "../store/AuthContext";

const AuthForm = () => {
  const navigate=useNavigate();
  const authctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    // Create a dynamic URL based on the authentication mode
    const url = isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBc3YZgbBGnV87OYpv0Cs5CthEHXIvfDtg"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBc3YZgbBGnV87OYpv0Cs5CthEHXIvfDtg";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error?.message || "Authentication failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.idToken);
        authctx.login(data.idToken);
        navigate("/");


        // emailInputRef.current.value="";
        // passwordInputRef.current.value="";
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
