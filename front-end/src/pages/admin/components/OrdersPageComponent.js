import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";

const OrdersPageComponent = ({ getOrders }) => {
  const dispatch=useDispatch()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    getOrders().then((orders) => setOrders(orders)).catch(er => dispatch(logout()))
  }, [])
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent></AdminLinksComponent>
      </Col>
      <Col md={10}>
        <h1>Orders List</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Payment Method</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{order.user!==null ? (<>{order.user.name} {order.user.lastName}</>):null}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.orderTotal.cartSubtotal}</td>
                  <td>{order.isDelivered ? <i className="bi bi-check-lg text-success"></i>:<i className="bi bi-check-lg text-danger"></i>}</td>
                  <td>{order.paymentMethod}</td>
                  <td><Link style={{ cursor: "pointer" }} to={`/admin/order-details/${order._id}`}>Go to details</Link></td>
                </tr>)
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  )

};
export default OrdersPageComponent;