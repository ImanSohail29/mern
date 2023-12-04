import Carousel from 'react-bootstrap/Carousel';
import { LinkContainer } from 'react-router-bootstrap';
const ProductCarouselComponent = ({ bestSellers }) => {
    const cursorP = { cursor: "pointer" }
    return bestSellers.length > 0 ? (
        <Carousel>
            {console.log("bestSellers:"+bestSellers)}
            {bestSellers.map((item, idx) => {
                return (
                    <Carousel.Item key={idx}>
                        <img crossOrigin="anonymous"
                            className="d-block w-100"
                            style={{height:"400px",objectFit:"cover"}}
                            src={item.images?item.images[0].path:null}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <LinkContainer style={cursorP} to={`/product-detail/${item._id}`}>
                                <h3>Best seller in {item.category}</h3>

                            </LinkContainer>
                            <p>{item.description}</p>

                        </Carousel.Caption>
                    </Carousel.Item>)
            })}

            <Carousel.Item>
                <img style={{ height: '300px', objectFit: 'cover' }}
                    className="d-block w-100"
                    src="/images/carousel/games-category.png"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <LinkContainer style={cursorP} to="/product-detail">
                        <h3>Best seller in Games</h3></LinkContainer>
                    <p>fortnight saga club 13.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ height: '300px', objectFit: 'cover' }}
                    className="d-block w-100"
                    src="/images/carousel/tablets-category.png"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <LinkContainer style={cursorP} to="/product-detail">
                        <h3>Best seller in Tablets</h3></LinkContainer>
                    <p>
                        Ipad 13 ultra thin
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    ) : null;
}
export default ProductCarouselComponent;