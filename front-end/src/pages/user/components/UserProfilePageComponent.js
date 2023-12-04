import { useEffect, useState } from "react"
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
const UserProfilePageComponent = ({ updateUserApiRequest ,fetchUser,login,userInfoFromRedux,
reduxDispatch,localStorage,sessionStorage}) => {
    const [validated, setValidated] = useState(false);
    const [updateUserResponseState, setUpdateUserResponseState] = useState({ success: "", error: "" })
    const [passwordMatchState,setPasswordMatchState]=useState(true)
    const [user,setUser]=useState({})
    const userInfo=userInfoFromRedux
    useEffect(()=>{
        fetchUser(userInfo._id)
        .then((user)=>{
            setUser(user)
        })
        .catch((er)=>console.log(er))
    },[userInfo._id])
    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const confirmPassword = document.querySelector("input[name=confirmPassword]")
        if (password.value === confirmPassword.value) {
            setPasswordMatchState(true)
        }
        else {
            setPasswordMatchState(false)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name = form.name.value
        const lastName = form.lastName.value
        const phoneNumber = form.phoneNumber.value
        const address = form.address.value
        const country = form.country.value
        const zipCode = form.zipCode.value
        const city = form.city.value
        const state = form.state.value
        const password = form.password.value
        if (event.currentTarget.checkValidity() === true
            && form.password.value === form.confirmPassword.value) {
            updateUserApiRequest(name, lastName, phoneNumber, address, country, zipCode, city, state, password)
                .then(data => {
                    setUpdateUserResponseState({ success: data.success, error: "" })
                    reduxDispatch(login({doNotLogout:userInfo.doNotLogout,...data.userUpdated}))
                    if (userInfo.doNotLogout) localStorage.setItem("userInfo", JSON.stringify({ doNotLogout: true, ...data.userUpdated }));
                    else sessionStorage.setItem("userInfo", JSON.stringify({ doNotLogout: false, ...data.userUpdated }));
                })
                .catch((er) => { 
                    setUpdateUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }) })
        }

        setValidated(true);
    };
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6} className="mb-3">
                    <h3>User Profile</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>Your name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        defaultValue={user.name}
                                        name="name"
                                    />
                                    <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>

                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Your last name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        defaultValue={user.lastName}
                                        name="lastName"
                                    />
                                    <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={7}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        disabled
                                        value={user.email}
                                    />
                                    <Form.Text className="text-muted">If you want to change email you will have to create a new account</Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={user.phoneNumber}
                                        placeholder="Enter your phone number"
                                        name="phoneNumber"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your street name and house number"
                                defaultValue={user.address}
                                name="address"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your country name"
                                        defaultValue={user.country}
                                        name="country"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicZipCode">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Zip code"
                                        defaultValue={user.zipCode}
                                        name="zipCode"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your City name"
                                        defaultValue={user.city}
                                        name="city"
                                    />
                                </Form.Group></Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your State name"
                                        defaultValue={user.state}
                                        name="state"
                                    />
                                </Form.Group></Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                minLength={6}
                                placeholder="Enter Password"
                                name="password"
                                onChange={onChange}
                                isInvalid={!passwordMatchState}
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
                                isInvalid={!passwordMatchState}
                            />
                            <Form.Control.Feedback type="invalid">Both passwords should match</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit">Update</Button>
                        <Alert className="mt-2" show={updateUserResponseState&&updateUserResponseState.error!==""} variant="danger">Something went wrong!</Alert>
                        <Alert className="mt-2" show={updateUserResponseState&&updateUserResponseState.success!==""} variant="info">User updated!</Alert>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default UserProfilePageComponent;