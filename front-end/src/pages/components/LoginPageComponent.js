import { Col, Container, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useState } from "react"
import { Link,useNavigate } from "react-router-dom";
const LoginPageComponent = ({ loginUserApiRequest,reduxDispatch,loginAction }) => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [loginUserResponseState, setLoginUserResponseState] = useState({ success: "", error: "", loading: false });
    const handleSubmit = (event) => {
        event.preventDefault(); // method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        event.stopPropagation();//method stops the bubbling of an event to parent elements, preventing any parent event handlers from being executed.
        const form = event.currentTarget.elements;
        const email = form.email.value
        const password = form.password.value
        const doNotLogout = form.doNotLogout.checked
        if (event.currentTarget.checkValidity() === true && email && password) {
            setLoginUserResponseState({ loading: true })
            loginUserApiRequest(email, password, doNotLogout)
                .then((res) => {
                    console.log("Res : "+res)

                    setLoginUserResponseState({ success: res.success, loading: false, error: "" })
                    if(res.userLoggedIn)
                    {
                        reduxDispatch(loginAction(res.userLoggedIn))
                    }
                    if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) 
                        navigate("/user", { replace: true })
                     else if(res.success === "user logged in" && res.userLoggedIn.isAdmin) 
                     { 
                        navigate("/admin/orders", { replace: true }) 
                    } //{ replace: true } will be responsible to stop navigation back to the login page
                })
                .catch((er) => setLoginUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
        }

        setValidated(true);
    };
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6} className="mb-3">
                    <h3>Login</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDoNotLogout">
                            <Form.Check name="doNotLogout" type="checkbox" label="Do not logout"></Form.Check>
                        </Form.Group>
                        <Row className="pb-2">
                            <Col>
                                Don't you have an account?
                                <Link to={"/register"}>Create Account</Link>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            {loginUserResponseState && loginUserResponseState.loading === true ?
                                (<Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                ></Spinner>) :
                                ("")} Login</Button>
                        <Alert show={loginUserResponseState && loginUserResponseState.error === "wrong credentials"} variant="danger">Invalid credentials!</Alert>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
};
export default LoginPageComponent;