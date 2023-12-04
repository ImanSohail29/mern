import { Col, Container, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useState } from "react"
import { Link } from "react-router-dom";
const RegisterPageComponent = ({registerUserApiRequest,reduxDispatch,loginAction}) => {
    const [validated, setValidated] = useState(false);
    const [registerUserResponseState,setRegisterUserResponseState]=useState({success:"",error:"",loading:false})
    const [passwordsMatchState,setPasswordsMatchState]=useState(true)
const onChange=()=>{
    const password=document.querySelector("input[name=password]")
    const confirmPassword=document.querySelector("input[name=confirmPassword]") 
    if (confirmPassword.value === password.value) {
        setPasswordsMatchState(true);
      } else {
        setPasswordsMatchState(false);
      }
}
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name=form.name.value
        const lastName=form.lastName.value
        const email=form.email.value
        const password=form.password.value

        if (event.currentTarget.checkValidity() === true && name&& lastName&&email&&password&&form.password.value===form.confirmPassword.value) {
            setRegisterUserResponseState({loading:true})
            registerUserApiRequest(name,lastName,email,password).then(
                (res)=>{setRegisterUserResponseState({success:res.success,loading:false})
            reduxDispatch(loginAction(res.userCreated))}
            ).catch(
                (er)=>{
                    return(
                    setRegisterUserResponseState(
                    {
                        error:er.response.data.message?er.response.data.message:er.response.data
                    }
                    )
                    )
                }
            )
        
            
        }

        setValidated(true);
    };
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6} className="mb-3">
                    <h3>Register</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                            />
                            <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Your last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your last name"
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                name="email"
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                minLength={6}
                                placeholder="Enter Password"
                                name="password"
                                onChange={onChange}
                                isInvalid={!passwordsMatchState}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
                        <Form.Text className="text-muted">Password should have at least 6 characters</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                required
                                name="confirmPassword"
                                type="password"
                                minLength={6}
                                placeholder="Repeat Password"
                                onChange={onChange}
                                isInvalid={!passwordsMatchState}
                            />
                            <Form.Control.Feedback type="invalid">Both passwords should match</Form.Control.Feedback>
                        </Form.Group>
                        <Row className="pb-2">
                            <Col>
                                Do you already have an account?
                                <Link to={"/login"}>Login</Link>
                            </Col>
                        </Row>
                        <Button type="submit">
                            {registerUserResponseState&&registerUserResponseState.loading===true?(<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        ></Spinner>):("")}
                             Submit</Button>
                        <Alert show={registerUserResponseState&&registerUserResponseState==="user exists"} variant="danger">User with that email already exists!</Alert>
                        <Alert show={registerUserResponseState&&registerUserResponseState==="user created!"} variant="info">User created!</Alert>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
};
export default RegisterPageComponent;