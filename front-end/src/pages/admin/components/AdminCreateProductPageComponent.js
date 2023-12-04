import { useState } from "react";
import { Alert, Button, CloseButton, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminCreateProductPageComponent = ({ categories, createProductApiRequest, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest, createNewCategory, reduxDispatch, insertCategory }) => {
    const [validated, setValidated] = useState(false);
    const [attributesTable, setAttributesTable] = useState([])
    const [images, setImages] = useState(false)
    const [isCreating, setIsCreating] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [createProductResponseState, setCreateProductResponseState] = useState({ message: "", error: "" })
    const navigate = useNavigate()
    const createNewCategoryHandler = (category) => {
        createNewCategory(category).then((data) => 
        {
            setNewCategory("")
            reduxDispatch(insertCategory(data))
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            description: form.description.value,
            count: form.count.value,
            price: form.price.value,
            category: form.category.value,
            attributesTable: attributesTable,
        }
        if (event.currentTarget.checkValidity() === true) {
            if (images.length > 3) {
                setIsCreating("Too many files ! ")
                return
            }
            createProductApiRequest(formInputs)
                .then(data => {
                    if (images) {
                        if (process.env.NODE_ENV === "production") {
                            uploadImagesCloudinaryApiRequest(images, data.productId)
                            console.log(images)
                        } else {
                            uploadImagesApiRequest(images, data.productId)
                                .then(res => { })
                                .catch((er) => setIsCreating(er.response.data.message ? er.response.data.message : er.response.data))
                        }
                    }
                    if (data.message === "product created") navigate("/admin/products")
                }).catch((er) => setCreateProductResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
        }
        setValidated(true);
    }
    const uploadHandler = (images) => {
        setImages(images)
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="admin/products" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>User Profile</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicNae">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" required as="textarea" rows={3}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control name="count" required type="number"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" required type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category
                                <CloseButton></CloseButton>(<small>remove selected</small>)
                            </Form.Label>
                            <Form.Select required name="category" aria-label="Default select example">
                                <option value="">Choose category</option>
                                {categories.map((category, idx) => {
                                    return (<option key={idx} value={category.name}>{category.name}</option>)
                                })}

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNewCategory">
                            <Form.Label>Create a new category{" "}</Form.Label>
                            <Row>
                                <Col md={8}>
                                    <Form.Control name="newCategory" type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}></Form.Control>
                                </Col>
                                <Col md={4}>
                                    <Button disabled={newCategory === ""} onClick={() => createNewCategoryHandler(newCategory)}>Create new category</Button>
                                </Col>
                                {console.log(newCategory)}
                            </Row>
                        </Form.Group>



                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributeName">
                                    <Form.Label>Choose attribute and set value
                                    </Form.Label>
                                    <Form.Select name="attribute" aria-label="Default select example">
                                        <option value="">genre</option>
                                        <option value="1">red</option>
                                        <option value="2">green</option>
                                        <option value="3">blue</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>

                                <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                                    <Form.Label>Attribute value
                                    </Form.Label>
                                    <Form.Select name="attributeValue" aria-label="Default select example">
                                        <option value="">movie</option>
                                        <option value="1">red</option>
                                        <option value="2">green</option>
                                        <option value="3">blue</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Value</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Attr key</td>
                                        <td>Attr Value</td>
                                        <td><CloseButton></CloseButton></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                                    <Form.Label>Create new attribute</Form.Label>
                                    <Form.Control
                                        disabled={false}
                                        placeholder="first choose or create category"
                                        name="newAttrValue"
                                        type="text"></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Alert variant="primary">After typing attribute key and value press enter on one of the attribute</Alert>
                        <Form.Group className="mb-3" controlId="formBasicImages">
                            <Form.Label>Images</Form.Label>
                            <Form.Control name="image" required type="file" multiple onChange={(e) => uploadHandler(e.target.files)}>
                            </Form.Control> {isCreating}
                        </Form.Group>
                        <Button type="submit">Create</Button>
                        {createProductResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminCreateProductPageComponent;