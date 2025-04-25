import {Button, Card, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export function NewProduct() {
  return (
    <>
      {/* Product Form */}
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card
          className="p-4 shadow-lg bg-dark text-light w-100"
          style={{maxWidth: "500px", borderRadius: "20px"}}
        >
          <div className="d-flex mb-5">
            <Link to="/products" className="text-decoration-none text-reset me-5">
              <Button variant="danger" className="rounded-3">
                <FontAwesomeIcon icon={faArrowLeft} className="nav-icon"/>
                <span className="nav-title fw-bolder">Cancel</span>
              </Button>
            </Link>
          </div>

          <Card.Title className="mb-4 text-center fs-1 fw-bold">
            Add New Product
          </Card.Title>

          <Form>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name..." required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductBuyPrice">
              <Form.Label>Buy Price</Form.Label>
              <Form.Control type="number" placeholder="Enter buy price..." required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductSellPrice">
              <Form.Label>Sell Price</Form.Label>
              <Form.Control type="number" placeholder="Enter sell price..." required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Enter stock quantity..." required/>
            </Form.Group>

            <Button variant="primary" className="w-100 mt-3">
              Save Product
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}