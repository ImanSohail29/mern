import { Alert, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";
const CartPageComponent = ({ addToCart, cartItems, cartSubtotal, reduxDispatch,removeFromCart }) => {
    const changeCount = (id, quantity) => {
        const sameProduct=true
        reduxDispatch(addToCart({ id, quantity,sameProduct }))
    }
    const removeFromCartHandler=(productId,quantity,price)=>{
        if(window.confirm("Are you sure?")){
            reduxDispatch(removeFromCart({productId,quantity,price}))
            console.log("productID+quantity+price: "+productId+quantity+price)
        }
    }
    return (
        <Container fluid>
            <Row className="mt-4">
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length===0?(
                                            <Alert variant="info">Your cart is empty</Alert>

                    ):(
                        cartItems.map((item, idx) => {
                            // console.log(item)
                             return (
                                 <ListGroup variant="flush">
                                     <CartItemComponent item={item} key={idx} changeCount={changeCount}
                                     removeFromCartHandler={removeFromCartHandler}>
                                     </CartItemComponent></ListGroup>)
                         })
                    )}
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.length} {cartItems.length===1?"Product":"Products"})</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: <b>${cartSubtotal}</b>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <LinkContainer to="/user/cart-details">
                                <Button disabled={cartSubtotal===0} type="button">Proceed to Checkout</Button>
                            </LinkContainer>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );

};
export default CartPageComponent;