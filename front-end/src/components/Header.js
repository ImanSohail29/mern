import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { useEffect, useState } from 'react';
import { getCategories } from '../redux/slices/categorySlice';
const Header = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)
  const itemsCount = useSelector((state) => state.cart.itemsCount)
  const { categories } = useSelector((state) => state.category)
  const [searchQuery,setSearchQuery]=useState("")
  const [searchCategoryToggle,setSearchCategoryToggle]=useState("All")
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  const submitHandler=(e)=>{
    if(e.keyCode&&e.keyCode!==13) return
    e.preventDefault()
    if(searchQuery.trim()){
      if(searchCategoryToggle==="All"){
        navigate(`/product-list/search/${searchQuery}`)
      }else{
        navigate(`product-list/category/${searchCategoryToggle.replaceAll("/",",")}/search/${searchQuery}`)
      }
    }else if(searchCategoryToggle!=="All"){
      navigate(`product-list/category/${searchCategoryToggle.replaceAll("/",",")}`)

    }else{
      navigate("/product-list")
    }
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand href="/">BEST ONLINE SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton id="dropdown-basic-button" title={searchCategoryToggle}>
              <Dropdown.Item onClick={()=>setSearchCategoryToggle("All")}>All</Dropdown.Item>
                {
                categories.map((category,id) => {
                  return <Dropdown.Item key={id} onClick={()=>setSearchCategoryToggle(category.name)}>{category.name}</Dropdown.Item>
                })
                }
              </DropdownButton>
              <Form className="d-flex">
                <Form.Control onKeyUp={submitHandler}
                onChange={(e)=>{
                  setSearchQuery(e.target.value)
                }}
                  type="text"
                  placeholder="Search in shop..."
                  aria-label="Search"
                />
              </Form>
              <Button onClick={submitHandler} variant="warning">
                <i className="bi bi-search text-dark"></i>
              </Button>

              <Nav.Link href="#features">Features</Nav.Link>
            </InputGroup>

          </Nav>
          <Nav>


            {userInfo.isAdmin ? (
              <LinkContainer to='/admin/orders'>
                <Nav.Link>Admin
                  <i className="bi bi-circle-fill text-danger"></i>
                </Nav.Link>
              </LinkContainer>
            ) : userInfo.name && !userInfo.isAdmin ? (<>
              <NavDropdown title={`${userInfo.name} ${userInfo.lastName}`} id="collasible-nav-dropdown">
                <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders" >My orders</NavDropdown.Item>
                <NavDropdown.Item eventKey="/user" as={Link} to="/user" >My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { dispatch(logout()) }} >Logout</NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to='/cart'>
              <Nav.Link >
                <Badge pill bg="danger">{itemsCount === 0 ? "" : itemsCount}</Badge>
                <i className="bi bi-cart2"></i>
                <span className="ms-1">Cart</span>
              </Nav.Link>
            </LinkContainer>
              </>
              
            ) : (<> <LinkContainer to='/login'>
              <Nav.Link >
                Login
              </Nav.Link>
            </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link >
                  Register
                </Nav.Link>
              </LinkContainer></>)}


          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};
export default Header;