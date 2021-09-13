import { Col, Container, Form, InputGroup, Row } from "reactstrap";
import '../style/Login.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import CustomInputField from "./shared/custom-input-field";
import { Button } from "reactstrap";
import { useState } from "react";
import { auth } from "../firebase";

const schema = Yup.object().shape({
    email: Yup.string()
      .email('Not a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be atleast 6 characters'),
  });
  
const Login = () => {
    const [error, setError] = useState('');
    const history = useHistory();

    const methods = useForm({
        mode: 'all',
        defaultValues: {
          email: '',
          password: '',
        },
        resolver: yupResolver(schema),
      });
    
    const { formState: { errors, isDirty, isValid } } = methods;

    const onSubmit = (formData) => {
          auth.signInWithEmailAndPassword(formData.email, formData.password)
          .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            history.push('/')
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    return (
        <Container>
            <Row className="d-flex flex-column align-items-center">
                <Col className="login-container">
                    <h1 className="login-logo">Instagram</h1>
                    <Form onSubmit={methods.handleSubmit(onSubmit)} className="login-form">
                        <FormProvider {...methods}>
                            <InputGroup className="">
                                <CustomInputField type="text" name="email" placeholder="email" />
                            </InputGroup>
                            <InputGroup>
                                <CustomInputField type="password" name="password" placeholder="password" />
                            </InputGroup>
                            <Button className="btn login-button" disabled={(!isValid || !isDirty)}>Log In</Button>
                        </FormProvider>
                    </Form>
                    <div className="or d-flex justify-content-center">
                        <hr />
                        <p>OR</p>
                        <hr />
                    </div>
                    <div className="fb-login d-flex my-2">
                        <Link to="">
                            <p><FacebookIcon />Login with Facebook</p>
                        </Link>
                    </div>
                    <div className="">
                        <small className="text-danger">{error}</small>
                    </div>
                    <p className="forgot mt-0">Forgot Password?</p>
                </Col>
                <div className="footer-link">
                    <p>Don't have an account? &nbsp;<Link to="/signup" className="signup-link">Sign up</Link></p> 
                </div>
            </Row>
        </Container>
    )
}

export default Login
