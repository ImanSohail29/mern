import { useEffect, useState } from "react"
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditUserPageComponent = ({ updateUserApiRequest, fetchUser }) => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState([])
    const [updateUserResponseState, setUpdateUserResponseState] = useState({ message: "", error: "" });
    const [isAdminState, setIsAdminState] = useState(false);

    const { id } = useParams()
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name = form.name.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const isAdmin = form.isAdmin.checked;
        if (event.currentTarget.checkValidity() === true) {
            updateUserApiRequest(id, name, lastName, email, isAdmin)
                .then(data => {
                    if (data === "user updated") {
                        navigate("/admin/users");
                    }
                }).catch(er => {
                    setUpdateUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data });
                })
        }

        setValidated(true)
    }
    useEffect(() => {
        fetchUser(id).then(data => {
            console.log("hello bhai: " + data.name)
            setUser(data)
            setIsAdminState(data.isAdmin);
        })
            .catch((er) => {
                setUpdateUserResponseState(
                    {
                        error: er.response.data.message ?
                            er.response.data.message : er.response.data
                    });
            })
    }, [id]
    )
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6} className="mb-3">
                    <h3>Edit User</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                disabled
                                name="email"
                                defaultValue={user.email}
                            />
                            <Form.Text className="text-muted">If you want to change email you will have to create a new account</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Check
                                name="isAdmin"
                                type="checkbox"
                                label="Is admin"
                                checked={isAdminState} onChange={(e) => setIsAdminState(e.target.checked)}
                            />
                        </Form.Group>

                        <Button type="submit">Update</Button>
                        <Alert className="mt-2" show={true} variant="info"> {updateUserResponseState.error}</Alert>

                    </Form>
                </Col>
            </Row>
        </Container>
    )

};
export default AdminEditUserPageComponent;