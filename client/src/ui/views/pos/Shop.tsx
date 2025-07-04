import { faSearch, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product, products } from "../../../mock/pos_data";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ProductsListing } from "../../components/pos/product/ProductsListing.tsx";
import { Cart } from "../../components/pos/cart/Cart.tsx";
import {
  SCREEN_SIZE,
  useDetectScreenType,
} from "../../../hooks/useDetectScreenType.ts";
import { useNavHeight } from "../../../hooks/useNavHeight.ts";

export interface Item extends Product {
  quantity: number;
}

export function Shop() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Item[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isMobile = useDetectScreenType(SCREEN_SIZE.LARGE);
  const navHeight = useNavHeight();

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

  // Auto close cart on mobile when cart is empty or when switching to desktop
  useEffect(() => {
    if (!isMobile || cart.length === 0) {
      setIsCartOpen(false);
    }
  }, [isMobile, cart.length]);

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
        {!isCartOpen && (
          <div className="flex-grow-1 d-flex flex-column">
            <h2 className="fw-bold mb-3 text-dart">Products</h2>
            <ProductsListing
              products={filteredProducts}
              addToCart={addToCart}
            />
          </div>
        )}

        {/* Cart Section Desktop Only */}
        {!isMobile && cart.length > 0 && (
          <div
            className="d-flex flex-column flex-grow-1 bg-dark px-3 py-3 rounded-3 shadow-sm"
            style={{
              minWidth: "360px",
              maxWidth: "600px",
            }}
          >
            <h2 className="fw-bold mb-3 text-light">Cart</h2>
            <Cart
              cart={cart}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
              clearCart={() => setCart([])}
            />
          </div>
        )}

        {/* Floating Cart Button – Mobile only */}
        {isMobile && cart.length > 0 && !isCartOpen && (
          <Button
            onClick={() => setIsCartOpen(true)}
            variant="success"
            className="position-fixed bottom-0 end-0 m-3 rounded-circle shadow d-flex align-items-center justify-content-center"
            style={{ width: "64px", height: "64px", zIndex: 1040 }}
          >
            <FontAwesomeIcon icon={faStore} size="lg" />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.75rem" }}
            >
              {cart.length}
            </span>
          </Button>
        )}

        {/* Mobile Cart Modal */}
        {isMobile && isCartOpen && cart.length > 0 && (
          <div
            className="position-fixed start-0 w-100 bg-dark text-light d-flex flex-column z-3"
            style={{
              top: navHeight,
              height: `calc(100vh - ${navHeight}px)`,
            }}
          >
            {/* Modal Header */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
              <h2 className="fw-bold m-0">Cart</h2>
              <Button
                variant="outline-light"
                onClick={() => setIsCartOpen(false)}
                className="fw-bold"
              >
                Close
              </Button>
            </div>

            {/* Modal Body */}
            <div className="flex-grow-1 px-3 pt-3 overflow-y-scroll">
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                removeItem={removeItem}
                clearCart={() => setCart([])}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
