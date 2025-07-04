import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "./CartItem.tsx";
import { Item } from "../../../views/pos/POS.tsx";

interface CartProps {
  cart: Item[];
  changeQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const Cart = ({
  cart,
  changeQuantity,
  removeItem,
  clearCart,
}: CartProps) => {
  const total = cart.reduce(
    (acc, item) => acc + item.sellPrice * item.quantity,
    0,
  );
  const totalZIG = cart.reduce(
    (acc, item) => acc + item.sellPrice * item.quantity * 20,
    0,
  );
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="overflow-x-hidden flex-grow-1 mb-2 px-1">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            changeQuantity={changeQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>

      {/* Sticky Footer */}
      <div className="sticky-bottom bg-dark pt-3 border-top">
        <div className="d-flex justify-content-between mb-2 text-light">
          <span className="fw-bold">Items: {totalItems}</span>
          <div className="d-flex flex-column">
            <span className="fw-bold">USD: {total.toFixed(2)}</span>
            <span className="fw-bold">ZIG: {totalZIG.toFixed(2)}</span>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-danger" className="w-50" onClick={clearCart}>
            <FontAwesomeIcon icon={faTrash} className="me-2" />
            Clear
          </Button>
          <Button
            variant="success"
            className="w-50"
            onClick={() => alert("Checkout not implemented.")}
          >
            <FontAwesomeIcon icon={faCreditCard} className="me-2" />
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};
