import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddedToCartMessageComponent = ({ showCartMessage, setShowCartMessage }) => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <Alert show={showCartMessage} variant="success" onClose={() => setShowCartMessage(false)} dismissible>
      <Alert.Heading>The Product was added to your cart!</Alert.Heading>
      <p>
        <Button variant="success" onClick={goBack} className="me-2">Go Back</Button>
        <LinkContainer to={"/cart"}>
          <Button variant="danger">Go to cart</Button>
        </LinkContainer>

      </p>
    </Alert>
  );
}
export default AddedToCartMessageComponent;