import React, { useState, useContext } from "react";
import "./sign-in.styles.scss";
import FormInput from "../form/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { UserContext } from "../../context/user.context";

const SignIn = () => {
  const { signInGoogle, signInEmail } = useContext(UserContext); // Get methods
  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInEmail(email, password);
      setFormFields({ email: "", password: "" });
    } catch (error) {
      console.log("Sign in failed", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email" type="email" value={email} 
          handleChange={handleChange} label="email" required
        />
        <FormInput
          name="password" type="password" value={password} 
          handleChange={handleChange} label="password" required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          {/* Call signInGoogle directly from Context */}
          <CustomButton type="button" onClick={signInGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
