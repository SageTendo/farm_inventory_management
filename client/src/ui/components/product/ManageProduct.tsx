import {Button, Card, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export function ManageProduct() {
  const product = {
    id: 1,
    name: "Product 1",
    buyPrice: 100,
    sellPrice: 150,
    quantity: 10,
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    addedBy: "John Doe"
  }

  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState(-1)
  const [sellPrice, setSellPrice] = useState(-1);
  const [quantity, setQuantity] = useState(-1);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const doDeleteProduct = () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    console.log("Deleting product...");
  }

  const doSaveProduct = () => {
    console.log("Saving product...");
  }

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card
          className="p-4 shadow-lg bg-dark text-light w-100"
          style={{maxWidth: "500px", borderRadius: "20px"}}
        >
          <div className="d-flex mb-5">
            <Link to="/products" className="text-decoration-none text-reset me-5">
              <Button variant="danger" className="rounded-3">
                <FontAwesomeIcon icon={faArrowLeft} className="nav-icon"/>
                <span className="nav-title fw-bolder">Back</span>
              </Button>
            </Link>
          </div>

          <Card.Title className="mb-4 text-center fs-1 fw-bold">
            Manage Product
          </Card.Title>

          <Form>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder={product.name}
                            value={name}
                            onChange={(e) => {
                              const value = e.target.value;
                              setName(value);

                              if (value.trim()) {
                                setSaveButtonDisabled(false);
                              } else {
                                setSaveButtonDisabled(true);
                              }
                            }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductBuyPrice">
              <Form.Label>Buy Price</Form.Label>
              <Form.Control type="number" placeholder={product.buyPrice.toString()}
                            value={buyPrice}
                            onChange={(e) => {
                              const value = e.target.value;
                              const parsedValue = parseFloat(value);
                              setBuyPrice(parsedValue);

                              if (!isNaN(parsedValue)) {
                                setSaveButtonDisabled(false);
                              } else {
                                setSaveButtonDisabled(true);
                              }
                            }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductSellPrice">
              <Form.Label>Sell Price</Form.Label>
              <Form.Control type="number" placeholder={product.sellPrice.toString()}
                            value={sellPrice}
                            onChange={(e) => {
                              const value = e.target.value;
                              const parsedValue = parseFloat(value);
                              setSellPrice(parsedValue);

                              if (!isNaN(parsedValue)) {
                                setSaveButtonDisabled(false);
                              } else {
                                setSaveButtonDisabled(true);
                              }
                            }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder={product.quantity.toString()}
                            value={quantity}
                            onChange={(e) => {
                              const value = e.target.value;
                              const parsedValue = parseInt(value);
                              setQuantity(parsedValue);

                              if (!isNaN(parsedValue)) {
                                setSaveButtonDisabled(false);
                              } else {
                                setSaveButtonDisabled(true);
                              }
                            }}/>
            </Form.Group>

            {/* Immutable Information */}
            <div className="d-flex flex-column align-items-start">
              <div className="d-flex flex-row justify-content-between align-items-center">
                {/* Added Date */}
                <Form.Group controlId="formProductAddedDate" className="w-50 me-3">
                  <Form.Label>Added At: </Form.Label>
                  <Form.Control type="text" readOnly
                                className="bg-dark text-white"
                                disabled
                                value={product.createdAt}/>
                </Form.Group>

                {/* Updated Date */}
                <Form.Group controlId="formProductUpdatedBy" className="w-50">
                  <Form.Label>Updated At: </Form.Label>
                  <Form.Control type="text" readOnly
                                className="bg-dark text-white"
                                disabled
                                value={product.updatedAt}/>
                </Form.Group>
              </div>

              {/* Added By */}
              <Form.Group controlId="formProductAddedBy" className="mt-3 w-100">
                <Form.Label>Added By: </Form.Label>
                <Form.Control type="text" readOnly
                              className="bg-dark text-white"
                              disabled
                              value={product.addedBy}/>
              </Form.Group>

            </div>

            <div className="d-flex flex-row justify-content-between align-items-center">
              <Button variant="danger" className="w-100 mt-3 mx-1"
                      onClick={doDeleteProduct}>
                Remove Product
              </Button>

              <Button id="saveProductBtn" variant="primary" className="w-100 mt-3 mx-1"
                      disabled={saveButtonDisabled}
                      onClick={doSaveProduct}>
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}