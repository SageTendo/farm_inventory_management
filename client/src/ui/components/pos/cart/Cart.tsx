import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "./CartItem";
import { Item } from "../../../views/pos/Shop";

interface CartProps {
  cart: Item[];
  changeQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  onClose?: () => void; // Optional, used only in mobile modal
}

export const Cart = ({
  cart,
  changeQuantity,
  removeItem,
  clearCart,
  onClose,
}: CartProps) => {
  const total = cart.reduce(
    (acc, item) => acc + item.sellPrice * item.quantity,
    0,
  );
  const totalZIG = total * 20;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 mt-3 px-2">
        <h2 className="font-bold text-white text-3xl">Cart</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white font-bold px-3 py-1 border border-white rounded hover:bg-white hover:text-gray-900 transition"
          >
            Close
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mb-1"></div>

      {/* Scrollable cart items */}
      <div className="flex-1 overflow-y-auto space-y-3 px-1 pb-1 mb-3 mt-3">
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
      <div className="bg-gray-900 text-white text-md font-bold pt-3 border-t border-gray-700 px-2">
        <div className="flex justify-between mb-3">
          <span>Items: {totalItems}</span>
          <div className="text-right">
            <div>USD: {total.toFixed(2)}</div>
            <div>ZIG: {totalZIG.toFixed(2)}</div>
          </div>
        </div>

        <div className="flex gap-3 pb-4">
          <button
            className="w-1/2 py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
            onClick={clearCart}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Clear
          </button>
          <button
            className="w-1/2 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            onClick={() => alert("Checkout not implemented.")}
          >
            <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
