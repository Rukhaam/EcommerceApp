import React from "react";
import "./sign-in.styles.scss";
import FormInput from "../form/form-input.component";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import { EmailSignInStart} from "../../Redux/user/user.actions";
// import { signInWithGoogle } from "../../firebase/firebase.utils";
import { googleSignInStart } from "../../Redux/user/user.actions";
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const {EmailSignInStart} = this.props;
    const {email,password} = this.state;
      EmailSignInStart(email,password)
  };

  handleChange = (event) => {
    const { value, name } = event.target; // const value = event.target
    // const name = event.target

    this.setState({ [name]: value });
  };

  render() {
    const {googleSignInStart} = this.props;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
            <CustomButton type ='button' onClick={googleSignInStart} isGoogleSignIn>
              {" "}
              Sign in with google{" "}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch=>({
   googleSignInStart : ()=>dispatch(googleSignInStart()),
   EmailSignInStart  : (email,password)=>dispatch(EmailSignInStart({email,password}))

})

export default  connect (null,mapDispatchToProps)(SignIn);
