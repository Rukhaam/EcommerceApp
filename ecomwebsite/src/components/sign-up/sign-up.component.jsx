import React, { useState, useEffect } from "react";
import FormInput from "../form/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signUpStart } from "../../Redux/user/user.actions";
import "./sign-up.styles.scss";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 6) {
      alert(
        "Password must be at least 6 characters with one uppercase, one number, and one special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    dispatch(signUpStart({ displayName, email, password }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // 🔁 replaces componentDidMount (optional)
  useEffect(() => {
    // mount logic if needed
    return () => {
      // cleanup if needed
    };
  }, []);

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />

        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />

        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
