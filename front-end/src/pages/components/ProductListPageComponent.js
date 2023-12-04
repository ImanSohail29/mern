import { Button, Col, Container, ListGroup, Pagination, Row } from "react-bootstrap";
import SortOptionsComponent from "../../components/SortOptionsComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";
import ProductForListComponent from "../../components/ProductForListComponent";
import PaginationComponent from "../../components/PaginationComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const ProductListPageComponent = ({ getProducts, categories }) => {
    const location = useLocation()
    const navigate = useNavigate();

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [attrsFilter, setAttrsFilter] = useState([]) //all attributes
    const [attrsFromFilter, setAttrsFromFilter] = useState([]) //chosen attributes
    const [price, setPrice] = useState(500)
    const [ratingsFromFilter, setRatingsFromFilter] = useState({})
    const [categoryFilterComponent, setCategoryFilterComponent] = useState({})
    const [filters, setFilters] = useState({})
    const [sortOptions, setSortOptions] = useState("")
    const [paginationLinksNumber, setPaginationLinksNumber] = useState(null)
    const [pageNum, setPageNum] = useState(null)
    const [showResetFilterButton, setShowResetFilterButton] = useState(false)
    const { categoryName } = useParams() || ""
    const {pageNumParam} = useParams() || 1
    const {searchQuery} = useParams() || ""

    useEffect(() => {
        if (categoryName) {
            let categoryAllData = categories.find((item) => item.name === categoryName.replaceAll(",", "/"))
            if (categoryAllData) {
                let mainCategory = categoryAllData.name.split("/")[0]
                let mainCategoryAllData = categories.find((category) => category.name === mainCategory)
                setAttrsFilter(mainCategoryAllData.attrs)
            }
        }
    }, [categoryName, categories])
    useEffect(() => {

    }, [categoryFilterComponent, categories])
    useEffect(() => {
        getProducts(categoryName, pageNumParam, searchQuery, filters, sortOptions)
            .then(data => {
                setProducts(data.products)
                setPaginationLinksNumber(products.paginationLinksNumber)
                setPageNum(products.pageNum)
                setLoading(false)
            })
            .catch((er) => setError(er.response.data.message ? er.response.data.message : er.response.data))
        console.log("filters:" + JSON.stringify(filters))
    }, [categoryName,pageNumParam,searchQuery,filters,sortOptions])
    const handleFilters = () => {
        navigate(location.pathname.replace(/\/[0-9]+$/, "")); 
        setShowResetFilterButton(true)
        setFilters({
            price: price,
            rating: ratingsFromFilter,
            attrs: attrsFromFilter,
            category: categoryFilterComponent
        })
    }
    const resetFilters = () => {
        setShowResetFilterButton(false)
        setFilters({})
        window.location.href = "/product-list"
    }
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="mt-3 mb-3"><SortOptionsComponent setSortOptions={setSortOptions}></SortOptionsComponent></ListGroup.Item>
                        <ListGroup.Item className="mt-3 mb-3"><PriceFilterComponent price={price} setPrice={setPrice}></PriceFilterComponent></ListGroup.Item>
                        <ListGroup.Item className="mt-3 mb-3"><RatingFilterComponent setRatingsFromFilter={setRatingsFromFilter}></RatingFilterComponent></ListGroup.Item>
                        {!location.pathname.match(/\/category/) && (
                            <ListGroup.Item className="mt-3 mb-3"><CategoryFilterComponent setCategoryFilterComponent={setCategoryFilterComponent}></CategoryFilterComponent></ListGroup.Item>
                        )}
                        <ListGroup.Item className="mt-3 mb-3"><AttributesFilterComponent attrsFilter={attrsFilter} setAttrsFromFilter={setAttrsFromFilter}></AttributesFilterComponent></ListGroup.Item>
                        {console.log("attrsFromFilter:" + JSON.stringify(attrsFromFilter))}
                        <ListGroup.Item className="mt-3 mb-3">
                            <Button variant="primary" onClick={handleFilters}>Filter</Button>{"  "}
                            {showResetFilterButton && <Button variant="danger" onClick={resetFilters}>Reset filters</Button>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={9}>
                    {loading ? (<h1>Loading products...</h1>) : error ? (<h1>Error while loading products...</h1>) : (products.map((product) => {
                        return (
                            <ProductForListComponent
                                key={product._id}
                                images={product.images}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                rating={product.rating}
                                reviewsNumber={product.reviewsNumber}
                                productId={product._id}>
                            </ProductForListComponent>
                        )
                    }))}
                    {paginationLinksNumber > 1 ? (

                        <PaginationComponent
                        categoryName={categoryName}
                        searchQuery={searchQuery}
                        paginationLinksNumber={paginationLinksNumber}
                        pageNum={pageNum}
                        ></PaginationComponent>

                    ) : null}

                </Col>
            </Row>
        </Container>
    );
}
export default ProductListPageComponent;