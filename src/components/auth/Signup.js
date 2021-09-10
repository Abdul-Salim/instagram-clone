import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormFeedback, InputGroup, Row } from "reactstrap";
import FacebookIcon from '@material-ui/icons/Facebook';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import CustomInputField from "../shared/custom-input-field";
import { Button } from "reactstrap";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { auth } from "../../firebase";
import './Login.css';

const schema = Yup.object().shape({
    fullname: Yup.string()
      .required('First name is required'),
    username: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .email('Not a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be atleast 6 characters'),
  });
  
  

const Signup = () => {
    const history = useHistory();
    const methods = useForm({
        mode: 'all',
        defaultValues: {
          fullname: '',
          username: '',
          email: '',
          password: '',
        },
        resolver: yupResolver(schema),
      });
    
    const { formState: { errors, isDirty, touchedFields, isValid } } = methods;
    const [error, setError] = useState('');

    useEffect(() => {
        console.log(touchedFields)
    }, [touchedFields])
    const onSubmit = (formData) => {
        auth.createUserWithEmailAndPassword(formData.email, formData.password)
        .then((userCredential) => {
            var user = userCredential.user;
            user.updateProfile({displayName: formData.username }).then(() => {
                const updatedUser = auth.currentUser;
                console.log(updatedUser)
                history.push("/verification");
                })
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
                    <h5>Sign up to see photos and videos from your friends.</h5>
                    <Link to="" className="btn login-button">
                            <span className="text-white"><FacebookIcon />Login with Facebook</span>
                    </Link>
                    <div className="or d-flex justify-content-center">
                        <hr />
                        <p>OR</p>
                        <hr />
                    </div>
                    <Form onSubmit={methods.handleSubmit(onSubmit)} className="login-form">
                        <FormProvider {...methods}>
                            <InputGroup className="">
                                <CustomInputField type="text" name="email" placeholder="email" />
                                {errors?.email && <CloseIcon className="error" />}
                                {(!errors?.email && touchedFields?.email) && <DoneIcon className="error text-success" />}
                            </InputGroup>
                            <InputGroup>
                                <CustomInputField type="text" name="fullname" placeholder="Full Name" />
                                {errors?.fullname && <CloseIcon className="error" />}
                                {(!errors?.fullname && touchedFields?.fullname) && <DoneIcon className="error text-success" />}
                            </InputGroup>
                            <InputGroup>
                                <CustomInputField type="text" name="username" placeholder="Username" />
                                {errors?.username && <CloseIcon className="error" />}
                                {(!errors?.username && touchedFields?.username) && <DoneIcon className="error text-success" />}
                            </InputGroup>
                            <InputGroup>
                                <CustomInputField type="password" name="password" placeholder="password" />
                                {errors?.password && <CloseIcon className="error" />}
                                {(!errors?.password && touchedFields?.password) && <DoneIcon className="error text-success" />}
                            </InputGroup>
                            <Button className="btn login-button" disabled={!isDirty || !isValid}>Sign Up</Button>
                        </FormProvider>
                    </Form>
                    <div className="terms">
                        By signing up, you agree to our <Link to="/"> Terms</Link>, <Link to="/">Data Policy</Link> and <Link to="/">Cookie Policy</Link>.
                    </div>
                </Col>
                <div className="footer-link">
                    <p>Have an account? &nbsp;<Link to="/login" className="signup-link">Log in</Link></p> 
                </div>
            </Row>
        </Container>
    )
}

export default Signup;
