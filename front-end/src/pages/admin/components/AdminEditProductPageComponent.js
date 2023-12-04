import { useEffect, useState } from "react";
import { Button, CloseButton, Col, Container, Form, Row, Table, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminEditProductPageComponent = ({ categories, fetchProduct, updateProductApiRequest, imageDeleteHandler, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest }) => {
    const [validated, setValidated] = useState(false);
    const [product, setProduct] = useState({})
    const [updateProductResponseState, setUpdateProductResponseState] = useState({ message: '', error: '' })
    const [attributesFromDb, setAttributesFromDb] = useState([])
    const [attributeValues, setAttributeValues] = useState([])
    const [selectedAttribute, setSelectedAttribute] = useState([])
    const [attributesTable, setAttributesTable] = useState([])
    const [chosenCategory, setChosenCategory] = useState("Choose Category")
    const [imageRemoved, setImageRemoved] = useState(false)
    const [isUploading, setIsUploading] = useState("")
    const [imageUploaded, setImageUploaded] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetchProduct(id)
            .then((data) => {
                setChosenCategory(data.category)
                setProduct(data)
                console.log(data)
            })
            .catch((er) => console.log(er))
            console.log("imageRemoved:"+imageRemoved)
    }, [id, imageRemoved, imageUploaded])
    useEffect(() => {
        if (product && chosenCategory !== "") {
            const mainCategoryName = chosenCategory ? chosenCategory.split("/")[0] : product.category.split("/")[0];
            const mainCategory = categories.find(
                (category) => {
                    return (category.name === mainCategoryName)
                }
            )
            if (mainCategory) {
                console.log("mainCategory.attrs : " + mainCategory.attrs)
                console.log("chosenCategory:" + chosenCategory)
                setAttributesFromDb(mainCategory.attrs)
                setAttributeValues([])
            }
            else {
                setAttributesFromDb([])
            }
        }
        setAttributesTable(product.attrs)
    }, [product, chosenCategory])
    const onHover = {
        cursor: "pointer",
        position: "absolute",
        left: "5px",
        top: "-10px",
        transform: "scale(2.3)"
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        console.log("attributesTable:" + attributesTable)
        const formInputs = {
            name: form.name.value,
            description: form.description.value,
            count: form.count.value,
            price: form.price.value,
            category: form.category.value,
            attributesTable: attributesTable
        }
        if (event.currentTarget.checkValidity() === true) {
            updateProductApiRequest(id, formInputs)
                .then(data => {
                    if (data.message === "product updated") navigate("/admin/products")
                })
                .catch((er) => setUpdateProductResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
        }
        setValidated(true);
    }
    const changeAttributeValues = (attributeKey) => {
        if (attributeKey !== "") {
            setSelectedAttribute(attributeKey)
            setAttributeValues(attributesFromDb.find((attr) => attr.key === attributeKey).value)
            console.log("attributeValues:" + attributeValues)
        }
        else {
            setAttributeValues([])
        }
    }
    const attributeValueSelected = (selectedAttributeValue) => {
        if (selectedAttributeValue !== "Choose Target Value") {
            setAttributesTableWrapper(selectedAttribute, selectedAttributeValue)
            attributesTable.map((item) => {
                console.log("attributes Table Key : " + item.key)
                console.log("attributes Table Value: " + item.value)
            })
        }
    }
    const setAttributesTableWrapper = (key, val) => {
        setAttributesTable((attr) => {
            if (attr.length !== 0) {
                var keyExistsInOldTable = false
                let modifiedTable = attr.map(item => {
                    if (item.key === key) {
                        keyExistsInOldTable = true
                        item.value = val
                        return item
                    }
                    else {
                        return item
                    }
                })
                if (keyExistsInOldTable) return [...modifiedTable]
                else return [...modifiedTable, { key: key, value: val }]
            }
            else {
                return [{ key: key, value: val }]
            }
        })
    }
    const deleteAttribute = (key) => {
        setAttributesTable((table) => table.filter((item) => item.key !== key))
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="admin/products" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>Edit product</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicNae">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text" defaultValue={product.name}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" required as="textarea" defaultValue={product.description} rows={3}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control name="count" required type="number" defaultValue={product.count}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" required type="text" defaultValue={product.price}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={(e) => setChosenCategory(e.target.value)} required name="category" aria-label="Default select example">
                                <option value="">Choose category</option>
                                {categories.map((category, idx) => {
                                    if (category.name === product.category) {
                                        return (
                                            <option selected key={idx} value={category.name}>
                                                {category.name}
                                            </option>
                                        )
                                    } else {
                                        return (
                                            <option key={idx} value={category.name}>
                                                {category.name}
                                            </option>
                                        )
                                    }
                                })}

                            </Form.Select>
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributeName">
                                    <Form.Label>Choose attribute and set value
                                    </Form.Label>
                                    <Form.Select id="attr" disabled={chosenCategory === ""}
                                        onChange={
                                            (e) => {
                                                return changeAttributeValues(e.target.value)
                                            }
                                        } name="attribute"
                                        aria-label="Default select example">
                                        <option value="">Choose Attribute</option>
                                        {
                                            attributesFromDb.map((attr, idx) => {
                                                return (
                                                    <option key={idx} value={attr.key}>
                                                        {attr.key}
                                                    </option>
                                                )
                                            }
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>

                                <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                                    <Form.Label>Attribute value
                                    </Form.Label>

                                    <Form.Select
                                        disabled={attributeValues.length > 0 ? false : true}
                                        required={attributeValueSelected !== ""} name="attributeValue"
                                        aria-label="Default select example"
                                        onChange={(e) => attributeValueSelected(e.target.value)}
                                    >
                                        <option value="">Choose Attribute Value</option>

                                        {
                                            attributeValues !== "" ? (attributeValues.map((attrValue, idx) =>
                                                <option key={idx} value={attrValue}>
                                                    {attrValue}
                                                </option>)) : ("")
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            {attributesTable && attributesFromDb.length > 0 && (
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Attribute</th>
                                            <th>Value</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attributesTable.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.key}</td>
                                                <td>{item.value}</td>
                                                <td><CloseButton onClick={() => deleteAttribute(item.key)}></CloseButton></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            )}

                        </Row>
                        {/* { <Row>
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
                            </Row> }
                            <Alert variant="primary">After typing attribute key and value press enter on one of the field</Alert>  */}
                        <Form.Group className="mb-3" controlId="formBasicImages">
                            <Form.Label>Images</Form.Label>
                            <Row className="mb-2">
                                {product.images && product.images.map((image, idx) => (
                                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                                        <Image
                                            crossOrigin="anonymous"
                                            src={image.path ?? null}
                                            fluid>
                                        </Image>
                                        <i style={onHover} onClick={
                                            () => imageDeleteHandler(image.path, id).then(setImageRemoved(!imageRemoved))
                                        } className="bi bi-x text-danger"></i>
                                    </Col>
                                ))}
                            </Row>
                            <Form.Control disabled={product.images && product.images.length >= 3} required={product.images && product.images.length === 0} name="image" type="file" multiple
                                onChange={e => {
                                    setIsUploading("upload files in progress ... ")
                                    if (process.env.NODE_ENV !== "production") {
                                        uploadImagesApiRequest(e.target.files, id)
                                            .then(data => {
                                                setIsUploading("upload file completed ")
                                                setImageUploaded(!imageUploaded)
                                            })
                                    }
                                    else {
                                        console.log("id:" + id)
                                        uploadImagesCloudinaryApiRequest(e.target.files, id)
                                        setTimeout(() => {
                                            setImageUploaded(!imageUploaded)
                                            setIsUploading("upload file completed. ")
                                        }, 5000)
                                        
                                    }
                                }
                                }></Form.Control>
                            {isUploading}
                        </Form.Group>
                        <Button type="submit">UPDATE</Button>
                        {updateProductResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminEditProductPageComponent;