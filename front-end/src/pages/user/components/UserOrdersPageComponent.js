import { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserOrdersPageComponent = ({ getOrders }) => {
    const [orders,setOrders]=useState([])
    useEffect(()=>{
        getOrders()
        .then((data) =>setOrders(data))
        .catch((er)=>console.log(er))
    },[])
    return (
        <Row className="m-5">
            <Col md={12}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Delivered</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>You</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>${order.orderTotal.cartSubtotal}</td>
                                    <td>{order.isDelivered?<i className="bi bi-check-lg text-success"></i>:<i className="bi bi-x-lg text-danger"></i>}</td>
                                    <td><Link style={{ cursor: "pointer" }} to={`/user/order-details/${order._id}`}>Go to details</Link></td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
};
export default UserOrdersPageComponent;