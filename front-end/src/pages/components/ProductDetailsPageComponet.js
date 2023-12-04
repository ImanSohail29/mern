import { Col, Container, Row, Image, ListGroup, Form, Button, Alert } from "react-bootstrap";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import { Rating } from "react-simple-star-rating";
import ImageZoomOverHover from "../../utils/ImageZoomOverMouseHover";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import MetaComponent from "../../components/MetaComponent";

const ProductDetailsPageComponent = ({ addToCartReduxAction, reduxDispatch, getProductDetails, writeReviewApiRequest }) => {
    const { id } = useParams()
    const user = useSelector((state) => state.user.userInfo)
    const [validated, setValidated] = useState(false);
    const [quantity, setQuantity] = useState(1)
    const [showCartMessage, setShowCartMessage] = useState(false)
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [productReviewed, setProductReviewed] = useState("")
    const addToCartHandler = () => {
        console.log(id)
        const sameProduct = false
        reduxDispatch(addToCartReduxAction({ id, quantity, sameProduct }))
        setShowCartMessage(true)
    }

    useEffect(() => {
        getProductDetails(id).then(data => {
            setProduct(data)
            setLoading(false)
        }).catch((er) => setError(er.response.data.message ? er.response.data.message : er.response.data))
    }, [id,productReviewed])

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            comment: form.review.value,
            rating: form.rating.value,
        }
        if (event.currentTarget.checkValidity() === true) {
            writeReviewApiRequest(product._id, formInputs)
                .then(data => {
                    if (data === "review created") {
                        setProductReviewed("You successfully reviewd the page!")
                    }
                })
                .catch((er) => setProductReviewed(er.response.data.message ? er.response.data.message : er.response.data))
        }
        setValidated(true)
    }
    return (
        <>
        <MetaComponent title={product.name} description={product.description}></MetaComponent>
        <Container className="mt-5">
            <AddedToCartMessageComponent showCartMessage={showCartMessage} setShowCartMessage={setShowCartMessage}></AddedToCartMessageComponent>
            <Row>
                {loading ? (<h2>Loading product details...</h2>) : error ? (
                    <h2>{error}</h2>
                ) : (<>
                    <Col md={4}  >
                        {
                            product.images ? product.images.map(
                                (img_src, idx) => {
                                    return (
                                        <Container key={idx}>
                                            <div style={{ zIndex: 2 }} id={`image-${idx}`} >
                                                <Image className="mb-3" fluid src={img_src.path}></Image>
                                            </div>
                                            <ImageZoomOverHover id1={`image-${idx}`}></ImageZoomOverHover>
                                        </Container>

                                    )
                                }
                            ) : null
                        }

                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><h1>{product.name}</h1></ListGroup.Item>
                                    <ListGroup.Item><Rating readonly size={20} initialValue={product.rating}></Rating>(1)</ListGroup.Item>
                                    <ListGroup.Item>Price <b>${product.price}</b></ListGroup.Item>
                                    <ListGroup.Item>{product.description}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <ListGroup>
                                    <ListGroup.Item>Status: {product.count > 0 ? "in stock" : "out of stock"}</ListGroup.Item>
                                    <ListGroup.Item>Price: <b>${product.price}</b></ListGroup.Item>
                                    <ListGroup.Item>Quantity:

                                        <div className="col-lg-2">
                                            <div className="input-group mt-2 flex-nowrap" style={{ width: "150px" }}  >
                                                <span className="input-group-btn">
                                                    <button type="button" className="btn btn-danger" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                                                </span>
                                                <input type="text" id="quantity" name="quantity" className="form-control input-number mx-1" disabled value={quantity} min={1} max={product.count} />
                                                <span className="input-group-btn">
                                                    <button type="button" className="btn btn-success" disabled={quantity === product.count} onClick={() => setQuantity(quantity + 1)}>+</button>
                                                </span>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button variant="danger" onClick={addToCartHandler}>Add to cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-5">
                                <h5>REVIEWS</h5>
                                <ListGroup variant="flush">
                                    {product.reviews && product.reviews.map((review, idx) => {
                                        return (
                                            <ListGroup.Item key={idx}>{review.user.name} {review.user.lastName}<br />
                                                <Rating initialValue={review.rating} readonly size={20}></Rating><br />{review.createdAt.substring(0, 10)}<br />{review.comment}</ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            </Col>
                        </Row>
                        <hr />
                        {!user.name ? (<Alert variant="danger">Login first to write a review</Alert>
                        ) : (null)}
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Write a Review</Form.Label>
                                <Form.Control name="review" as="textarea" disabled={!user.name} rows={3} />
                            </Form.Group>
                            <Form.Select name="rating" aria-label="Select" disabled={!user.name}>
                                <option>Your rating</option>
                                <option value="5">5 (very good)</option>
                                <option value="4">4 (good)</option>
                                <option value="3">3 (average)</option>
                                <option value="2">2 (bad)</option>
                                <option value="1">1 (awful)</option>
                            </Form.Select>
                            <Button className="mb-3 mt-3" type="submit" variant="danger" disabled={!user.name}>Submit</Button>
                        </Form>
                        {productReviewed}
                    </Col></>)}

            </Row>
        </Container>
        </>
    );

};
export default ProductDetailsPageComponent;