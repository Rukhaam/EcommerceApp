import React, { useState, useEffect } from "react";
import "./sign-in.styles.scss";
import FormInput from "../form/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { useDispatch } from "react-redux";
import {
  EmailSignInStart,
  googleSignInStart,
} from "../../Redux/user/user.actions";

const SignIn = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formFields;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(EmailSignInStart({ email, password }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // 🔁 Replaces componentDidMount (optional)
  useEffect(() => {
    // mount logic (if needed)
    return () => {
      // cleanup (unmount)
    };
  }, []);

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />

        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>

          <CustomButton
            type="button"
            onClick={() => dispatch(googleSignInStart())}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

