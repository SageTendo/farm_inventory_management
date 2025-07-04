import {
  faStore,
  faSearch,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product, products } from "../../../mock/pos_data";
import { useState } from "react";
import { Button, Form, InputGroup, Toast } from "react-bootstrap";
import { ProductsListing } from "../../components/pos/product/ProductsListing.tsx";
import { Cart } from "../../components/pos/cart/Cart.tsx";

export interface Item extends Product {
  quantity: number;
}

export function POS() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Item[]>([]);
  const [toastVisible, setToastVisible] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  function addToCart(product: Product) {
    const existingItem = cart.find((item: Product) => item.id === product.id);
    if (existingItem) {
      changeQuantity(product.id, 1);
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  }

  function changeQuantity(productId: number, delta: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.stock > 0),
    );
  }

  function removeItem(productId: number) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  return (
    <div className="d-flex flex-column px-3 h-100 position-relative">
      <h1 className="mb-4 fw-bold d-flex align-items-center gap-3">
        <FontAwesomeIcon icon={faStore} />
        <span className="fs-2">Shop</span>
      </h1>

      {/* Search */}
      <InputGroup className="mb-4 shadow-sm rounded-3">
        <Form.Control
          type="text"
          placeholder="Search for products..."
          className="form-control border-0 rounded-start-3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="primary" className="rounded-end-3">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </InputGroup>

      {/* Main Layout */}
      <div className="d-flex flex-column flex-md-row gap-4 overflow-hidden flex-grow-1">
        {/* Product Section */}
        <div className="flex-grow-1 d-flex flex-column">
          <h2 className="fw-bold mb-3 text-dart">Products</h2>
          <ProductsListing products={filteredProducts} addToCart={addToCart} />
        </div>

        {/* Cart Section */}
        <div
          className="flex-grow-1 d-flex flex-column bg-dark px-3 py-3 rounded-3 shadow-sm"
          style={{ minWidth: "500px", maxWidth: "600px" }}
        >
          <h2 className="fw-bold mb-3 text-light">Cart</h2>

          {cart.length === 0 && (
            <p className="fs-5 fw-bold text-light align-items-center d-flex justify-content-center h-100">
              Cart is empty...
            </p>
          )}

          {cart.length > 0 && (
            <Cart
              cart={cart}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
              clearCart={() => setCart([])}
            />
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        show={toastVisible}
        onClose={() => setToastVisible(false)}
        delay={2000}
        autohide
        bg="success"
        className="position-absolute top-0 end-0 m-3"
      >
        <Toast.Body className="text-white d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} />
          Item added to cart
        </Toast.Body>
      </Toast>
    </div>
  );
}
