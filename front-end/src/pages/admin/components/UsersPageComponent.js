import { Button, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";
const UsersPageComponent = ({ fetchUsers ,  deleteUser }) => {
    const [users, setUsers] = useState([])
    const [userDeleted, setUserDeleted] = useState(false)
    const dispatch=useDispatch()

    const deleteHandler = async (userId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteUser(userId)
            console.log(" data: "+data)
            if (data === 'user removed') {
                setUserDeleted(!userDeleted)
            }
        }
    }
    useEffect(() => {
        const abctrl = new AbortController()
        fetchUsers(abctrl)
        .then((res) => setUsers(res))
        .catch(er => dispatch(logout()))
        return () => abctrl.abort()
    }, [userDeleted])
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent></AdminLinksComponent>
            </Col>
            <Col md={10}>
                <h1>Users List</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>is Admin</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}</td>
                                    <td><LinkContainer to={`/admin/edit-user/${user._id}`}>
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                        {" / "}
                                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                            <i className="bi bi-x-circle"></i>
                                        </Button>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );

};
export default UsersPageComponent;