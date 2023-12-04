import { Button, Card, Col, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Rating } from "react-simple-star-rating";

const ProductForListComponent = ({productId,name,description,price,images,rating,reviewsNumber}) => {
    return (
        <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
            <Row>
                <Col lg={5}>            
                    <Card.Img 
                    crossOrigin='anonymous' 
                    variant="top" 
                    src={images[0]?images[0].path:''} />
                </Col>
                <Col lg={7}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                           {description}
                            <Rating readonly size={20} initialValue={rating}></Rating>({reviewsNumber})
                            </Card.Text>
                            <Card.Text className="h4">${price}{"  "}</Card.Text>
                            <LinkContainer to={`/product-detail/${productId}`}>
                            <Button variant="danger">Details</Button>
                        </LinkContainer>
                       
                        
                    </Card.Body>
                </Col>
            </Row>

        </Card>
    )
}
export default ProductForListComponent;