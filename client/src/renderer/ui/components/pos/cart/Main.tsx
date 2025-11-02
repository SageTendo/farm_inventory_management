import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { CartItemDTO } from "../../../../../shared/dto/product";
import { Cart } from "./Cart";
import { useState } from "react";

// TODO: Move states from props
interface CartProps {
  cart: CartItemDTO[];
  cartItemsCount: number;
  cartTotalUSD: string;
  cartTotalZIG: string;
  isCheckoutScreenOpen: boolean;
  isMobile: boolean;
  onChangeQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  clearCart: () => void;
  onClose?: () => void; // Optional, used only in mobile modal
  onCheckout: () => void;
}

export const CartPanel = ({
  cart,
  cartTotalUSD,
  cartTotalZIG,
  isMobile,
  isCheckoutScreenOpen,
  onChangeQuantity,
  onRemoveItem,
  cartItemsCount,
  clearCart,
  onClose,
  onCheckout,
}: CartProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      {!isMobile && cart.length > 0 ? (
        <div className="w-full max-w-sm xl:max-w-lg bg-gray-900 text-white p-2.5 rounded-lg shadow-md flex flex-col h-full">
          <Cart
            cart={cart}
            cartItemsCount={cartItemsCount}
            cartTotalUSD={cartTotalUSD}
            cartTotalZIG={cartTotalZIG}
            changeQuantity={onChangeQuantity}
            removeItem={onRemoveItem}
            clearCart={clearCart}
            onCheckout={onCheckout}
            onClose={onClose}
          />
        </div>
      ) : (
        (isMobile &&
          !isCartOpen &&
          cart.length > 0 &&
          !isCheckoutScreenOpen && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50"
            >
              <FontAwesomeIcon icon={faCartShopping} size="xl" />
              <span className="absolute top-0 right-0 -mt-3 -mr-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cart.length}
              </span>
            </button>
          ),
        isMobile && isCartOpen && cart.length > 0 && (
          <div className="fixed inset-0 z-50 md:z-50 bg-gray-900 text-white flex flex-col px-3 py-2">
            <Cart
              cart={cart}
              cartItemsCount={cartItemsCount}
              cartTotalUSD={cartTotalUSD}
              cartTotalZIG={cartTotalZIG}
              changeQuantity={onChangeQuantity}
              removeItem={onRemoveItem}
              clearCart={clearCart}
              onClose={onClose}
              onCheckout={onCheckout}
            />
          </div>
        ))
      )}
    </>
  );
};
