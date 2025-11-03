import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Cart } from "./Cart";
import { useAtom, useAtomValue } from "jotai";
import {
  cartAtom,
  cartItemsCountAtom,
  cartOpenAtom,
  checkoutOpenAtom,
} from "../../../../atoms/shop.atom";
import { useDetectScreenType } from "../../../../hooks/useDetectScreenType";
import { useEffect } from "react";

interface CartProps {
  onChangeQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  clearCart: () => void;
  onCheckout: () => void;
}

export const CartPanel = ({
  onChangeQuantity,
  onRemoveItem,
  clearCart,
  onCheckout,
}: CartProps) => {
  const isMobile = useDetectScreenType();
  const [isCartOpen, setIsCartOpen] = useAtom(cartOpenAtom);
  const isCheckoutScreenOpen = useAtomValue(checkoutOpenAtom);
  const cart = useAtomValue(cartAtom);
  const cartItemsCount = useAtomValue(cartItemsCountAtom);

  useEffect(() => {
    if (cartItemsCount === 0) {
      setIsCartOpen(false);
    }
  }, [cartItemsCount]);

  return (
    <>
      {!isMobile && cart.length > 0 ? (
        <div className="w-full max-w-sm xl:max-w-lg bg-gray-900 text-white p-2.5 rounded-lg shadow-md flex flex-col h-full">
          <Cart
            changeQuantity={onChangeQuantity}
            removeItem={onRemoveItem}
            clearCart={clearCart}
            onCheckout={onCheckout}
          />
        </div>
      ) : (
        <>
          {isMobile &&
            !isCartOpen &&
            cart.length > 0 &&
            !isCheckoutScreenOpen && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-8 right-4 bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50"
              >
                <FontAwesomeIcon icon={faCartShopping} size="xl" />
                <span className="absolute top-0 right-0 -mt-3 -mr-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.length}
                </span>
              </button>
            )}

          {isMobile && isCartOpen && cart.length > 0 && (
            <div className="fixed inset-0 z-50 md:z-50 bg-gray-900 text-white flex flex-col px-3 py-2">
              <Cart
                changeQuantity={onChangeQuantity}
                removeItem={onRemoveItem}
                clearCart={clearCart}
                onCheckout={onCheckout}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
