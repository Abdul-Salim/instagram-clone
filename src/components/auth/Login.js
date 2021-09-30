import { Col, Container, Form, InputGroup, Row } from "reactstrap";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import CustomInputField from "../shared/custom-input-field";
import { Button } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { provider } from "../../firebase";
import { StateContext } from "../../context/StateProvider";
import "./Login.css";
import ButtonWithLoader from "../shared/loading-button";

const schema = Yup.object().shape({
  email: Yup.string().email("Not a valid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters"),
});

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useContext(StateContext);
  const history = useHistory();
  const methods = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    formState: { errors, isDirty, isValid },
  } = methods;

  const onSubmit = (formData) => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        var user = userCredential.user;
        setLoading(false);
        console.log(user);
        history.push("/home");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };
  const handleFacebookLogin = () => {
    console.log("ho");
    auth
      .signInWithRedirect(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  };

  // useEffect(() => {
  //   if(user) {
  //     history.replace('/');
  //   }
  // }, [user])
  return (
    <Container>
      <Row className="d-flex flex-column align-items-center">
        <Col className="login-container">
          <h1 className="login-logo">Instagram</h1>
          <Form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="login-form"
          >
            <FormProvider {...methods}>
              <InputGroup className="">
                <CustomInputField
                  type="text"
                  name="email"
                  placeholder="email"
                />
              </InputGroup>
              <InputGroup>
                <CustomInputField
                  type="password"
                  name="password"
                  placeholder="password"
                />
              </InputGroup>
              <ButtonWithLoader
                styleClass="btn login-button"
                disabled={!isValid || !isDirty}
                type="submit"
                text="Log in"
                isLoading={loading}
                loaderColor="primary"
              />
            </FormProvider>
          </Form>
          <div className="or d-flex justify-content-center">
            <hr />
            <p>OR</p>
            <hr />
          </div>
          <div className="fb-login d-flex my-2">
            <button
              onClick={() => handleFacebookLogin()}
              className="btn login-button"
            >
              <span className="text-white">
                <FacebookIcon />
                Login with Facebook
              </span>
            </button>
          </div>
          <div className="">
            <small className="text-danger">{error}</small>
          </div>
          <p className="forgot mt-0">Forgot Password?</p>
        </Col>
        <div className="footer-link">
          <p>
            Don't have an account? &nbsp;
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
