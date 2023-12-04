import { Col, ListGroup, Row, Image, Form } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const CartItemComponent = ({ item, orderCreated = false,changeCount=false,removeFromCartHandler=false }) => {
    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col xs={2} >
                        <Image crossOrigin="anonymous" src={item.image ? (item.image.path ?? null) : null} fluid></Image>
                    </Col>
                    <Col xs={2} >{item.name}</Col>
                    <Col xs={2} ><br/><b>${item.price}</b></Col>
                    <Col xs={3} >
                        <Form.Select onChange={changeCount?(e)=>{return changeCount(item.productId,e.target.value)}:undefined} disabled={orderCreated} value={item.quantity}>
                            {
                                [...Array(item.count).keys()].map((x) => {
                                    return <option key={x + 1} value={x + 1}>{x + 1}</option>
                                })
                            }
                        </Form.Select></Col>
                    <Col xs={3} >
                        <RemoveFromCartComponent productId={item.productId} orderCreated={orderCreated} quantity={item.quantity} price={item.price} removeFromCartHandler={removeFromCartHandler}></RemoveFromCartComponent>
                    </Col>
                </Row>
            </ListGroup.Item><br></br></>
    )
}
export default CartItemComponent;