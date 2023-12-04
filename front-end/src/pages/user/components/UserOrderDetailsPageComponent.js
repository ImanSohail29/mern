import { Alert, Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserOrderDetailsPageComponent = ({userInfo,getUser,getOrder}) => {
    const [userAddress,setUserAddress]=useState({})
    const [paymentMethod,setPaymentMethod]=useState("")
    const [isPaid,setIsPaid]=useState(false)
    const [orderButtonMessage, setOrderButtonMessage] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [isDelivered, setIsDelivered] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const {id}=useParams()
    useEffect(()=>{
        getUser().then(data=>{
            setUserAddress(
                {
                    address:data.address,
                    city:data.city,
                    country:data.country,
                    zipCode:data.zipCode,
                    state:data.state,
                    phoneNumber:data.phoneNumber
                })
        }).catch((err)=>console.log(err))
    },[userInfo])
    useEffect(()=>{
        getOrder(id).then(data=>{
            setPaymentMethod(data.paymentMethod)
            setCartItems(data.cartItems)
            setCartSubtotal(data.orderTotal.cartSubtotal)
            data.isDelivered?setIsDelivered(data.deliveredAt):setIsDelivered(false)
            data.isPaid?setIsPaid(data.paidAt):setIsPaid(false)
            if (data.isPaid) {
                setOrderButtonMessage("Your order is finished");
                setButtonDisabled(true);
            } 
            else {
               if (data.paymentMethod === "pp") {
                   setOrderButtonMessage("Pay for your order");
               } else if(data.paymentMethod === "cod") {
                   setButtonDisabled(true);
                   setOrderButtonMessage("Wait for your order. You can pay on delivery");
               }
            }
        }).catch((err)=>{console.log(err)})
    },[])
    const orderHandler=()=>{
        setButtonDisabled(true)
        if(paymentMethod==="pp")
        {
            setOrderButtonMessage("To pay for your order click one of the buttons below")
            if(!isPaid){

            }
        }
        else{
            setOrderButtonMessage("Your order was placed.Thank you")
        }
    }
    return (
        <Row className="m-4">
            <h1>Order Details</h1>
            <Col md={8}>
                <br />
                <Row>
                    <Col md={6}>
                        <h2>Shipping</h2>
                        <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
                        <b>Address</b>: {userAddress.address} {userAddress.city}
                        {userAddress.state} {userAddress.zipCode} <br />
                        <b>Phone</b>: {userAddress.phoneNumber} <br />
                    </Col>
                    <Col md={6}>
                        <h2>Payment method</h2>
                        <Form.Select value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)} disabled={true}>
                            <option value="pp">Paypal</option>
                            <option value="cod">Cash On Delivery (delivery may be delayed)</option>
                        </Form.Select>
                    </Col>
                    <Row>
                        <Col>
                            <Alert className="mt-3" variant={isDelivered?"success":"danger"}>
                                Not delivered.
                            </Alert>
                        </Col>
                        <Col>
                            <Alert className="mt-3" variant={isPaid?"success":"danger"}>
                                {isPaid?<>Paid on {isPaid}</>:<>Not paid yet</>}
                            </Alert>
                        </Col>
                    </Row>
                    </Row>
                    <br />
                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {cartItems.map((item, idx) => {
                            return (<CartItemComponent key={idx} item={item} orderCreated={true}></CartItemComponent>)
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
                        <Button size="lg" variant="danger" onClick={orderHandler} disabled={buttonDisabled} type="button">{orderButtonMessage}</Button></div></ListGroup.Item>
                </ListGroup>

            </Col>
        </Row>
    );

};
export default UserOrderDetailsPageComponent;