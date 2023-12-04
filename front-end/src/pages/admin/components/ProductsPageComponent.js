import { Button, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";
const ProductsPageComponent = ({fetchProducts,deleteProducts}) => {
    const [products,setProducts]=useState([])
    const [productDeleted,setProductDeleted]=useState(false)
    const dispatch=useDispatch()
    const deleteHandler = async(productId) => {
        if (window.confirm("Are you sure?")){
            const data = await deleteProducts(productId)
            console.log(" data: "+data)
            if (data.message === 'product removed') {
                setProductDeleted(!productDeleted)
            }
        }}
        useEffect(()=>{
            const abctrl = new AbortController()
            fetchProducts(abctrl)
            .then((res) => setProducts(res))
            .catch(er => dispatch(logout()))
            return () => abctrl.abort()
        },[productDeleted])
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent></AdminLinksComponent>
            </Col>
            <Col md={10}>
                <h1>Product List</h1>
                <LinkContainer to={"/admin/create-new-product"}>
                    <Button variant="primary" className="ms-2" size="lg">Create new</Button></LinkContainer>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(products)}
                        {products.map((product, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td><LinkContainer to={`/admin/edit-product/${product._id}`}><Button className="btn-sm"><i className="bi bi-pencil-square"></i></Button></LinkContainer>{"/"}<Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(product._id)}><i className="bi bi-x-circle"></i></Button></td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )



};
export default ProductsPageComponent;