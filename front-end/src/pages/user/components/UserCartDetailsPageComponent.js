import { Alert, Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCartDetailsPageComponent = ({ cartItems, itemsCount, cartSubtotal, reduxDispatch, addToCart, removeFromCart, userInfo, getUser,createOrder }) => {
    const navigate=useNavigate()
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userAddress, setUserAddress] = useState(false);
    const [missingAddress, setMissingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("pp")
    const changeCount = (id, quantity) => {
        const sameProduct = true
        reduxDispatch(addToCart({ id, quantity, sameProduct }))
    }
    const removeFromCartHandler = (productId, quantity, price) => {
        if (window.confirm("Are you sure?")) {
            reduxDispatch(removeFromCart({ productId, quantity, price }))
            console.log("productID+quantity+price: " + productId + quantity + price)
        }
    }
    const orderHandler = () => {
        const orderData = {
            cartItems: cartItems,
            orderTotal: {
                itemsCount: itemsCount,
                cartSubtotal: cartSubtotal,
            },
            paymentMethod: paymentMethod,
        }
        createOrder(orderData).then(
            data=>{
                if(data){
                    console.log("data::"+data)
                    navigate("/user/order-details/"+data._id)
                }
            }
            )
    }
    const choosePayment = (e) => {
        setPaymentMethod(e.target.value)
    }
    useEffect(() => {
        getUser()
            .then((data) => {
                if (!data.address || !data.city || !data.country || !data.zipCode || !data.state || !data.phoneNumber) {
                    setButtonDisabled(true);
                    setMissingAddress(" .In order to make order, fill out your profile with correct address, city etc.");
                } else {
                    setUserAddress({ address: data.address, city: data.city, country: data.country, zipCode: data.zipCode, state: data.state, phoneNumber: data.phoneNumber })
                    setMissingAddress(false);
                }
            })
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
    }, [userInfo])
    return (
        <Row className="m-4">
            <h1>Cart Details</h1>
            <Col md={8}>
                <br />
                <Row>
                    <Col md={6}>
                        <h2>Shipping</h2>
                        <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
                        <b>Address</b>: {userAddress.address} {userAddress.city} {userAddress.state} {userAddress.zipCode} <br />
                        <b>Phone</b>: {userAddress.phoneNumber} <br />
                    </Col>
                    <Col md={6}>
                        <h2>Payment method</h2>
                        <Form.Select onChange={choosePayment}>
                            <option value="pp">Paypal</option>
                            <option value="cod">Cash On Delivery (delivery may be delayed)</option>
                        </Form.Select>
                    </Col>
                    <Row>
                        <Col>
                            <Alert className="mt-3" variant="danger">
                                Not delivered
                                {missingAddress}
                            </Alert>
                        </Col>
                        <Col>
                            <Alert className="mt-3" variant="success">
                                Not paid yet
                            </Alert>
                        </Col>
                    </Row>
                </Row>
                <br />
                <h2>Order items</h2>
                <ListGroup variant="flush">
                    {cartItems.map((item, idx) => {
                        return (<CartItemComponent item={item} key={idx} changeCount={changeCount} removeFromCartHandler={removeFromCartHandler}></CartItemComponent>)
                    })}
                </ListGroup>
            </Col>
            <Col md={4}>
                <ListGroup>
                    <ListGroup.Item><h3>Order Summary</h3></ListGroup.Item>
                    <ListGroup.Item>Items price (after tax): <span className="fw-bold">${cartSubtotal}</span></ListGroup.Item>
                    <ListGroup.Item>Shipping:<span className="fw-bold">included</span></ListGroup.Item>
                    <ListGroup.Item>Tax:<span className="fw-bold">included</span></ListGroup.Item>
                    <ListGroup.Item className="text-danger">Total price:<span className="fw-bold">${cartSubtotal}</span></ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-grid gap-2">
                            <Button onClick={orderHandler} size="lg" variant="danger" type="button" disabled={buttonDisabled}>Place Order</Button></div></ListGroup.Item>
                </ListGroup>

            </Col>
        </Row>
    );

};
export default UserCartDetailsPageComponent;