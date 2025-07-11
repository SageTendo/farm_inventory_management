import {
  faCartShopping,
  faSearch,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product, products } from "../../../mock/pos_data";
import { useEffect, useState } from "react";
import { ProductsListing } from "../../components/pos/product/Main";
import { Cart } from "../../components/pos/cart/Main";
import {
  SCREEN_SIZE,
  useDetectScreenType,
} from "../../../hooks/useDetectScreenType";
import { useNavHeight } from "../../../hooks/useNavHeight";
import CheckoutScreen from "../../components/pos/payment/Main";

export interface Item extends Product {
  quantity: number;
}

export function Shop() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Item[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChekoutScreenOpen, setIsChekoutScreenOpen] = useState(false);
  const isMobile = useDetectScreenType(SCREEN_SIZE.LARGE);
  const navHeight = useNavHeight();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  function addToCart(product: Product) {
    const existingItem = cart.find((item) => item.id === product.id);
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
            : item
        )
        .filter((item) => item.stock > 0)
    );
  }

  function removeItem(productId: number) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  useEffect(() => {
    if (!isMobile || cart.length === 0) {
      setIsCartOpen(false);
    }
  }, [isMobile, cart.length]);

  function handlePayment(): void {
    // TODO: implement payment
    throw new Error("Function not implemented.");
  }

  function handleCancelPayment(): void {
    // TODO: implement cancel payment
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col h-full overflow-hidden pt-4 px-4">
      {/* Header */}
      <h1 className="mb-4 text-4xl font-bold flex items-center gap-3 text-gray-800">
        <FontAwesomeIcon icon={faStore} className="text-blue-900" />
        Shop
      </h1>

      {/* Search Bar */}
      <div className="flex w-full mb-4 shadow-sm rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-grow px-1 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {/* Main layout: product list + cart */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Product List */}
        {!isCartOpen && (
          <div className="flex flex-col flex-1 overflow-y-auto pr-1">
            <h2 className="font-bold mb-3 text-2xl text-gray-800">Products</h2>
            <ProductsListing
              products={filteredProducts}
              addToCart={addToCart}
            />
          </div>
        )}

        {/* Desktop Cart */}
        {!isMobile && cart.length > 0 && (
          <div className="w-full max-w-sm xl:max-w-lg bg-gray-900 text-white p-2.5 rounded-lg shadow-md flex flex-col h-full">
            <Cart
              cart={cart}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
              setCartTotal={setCartTotal}
              clearCart={() => setCart([])}
              onCheckout={() => setIsChekoutScreenOpen(true)}
            />
          </div>
        )}

        {/* Desktop Checkout Screen Modal */}
        {!isMobile && isChekoutScreenOpen && (
          <div className="fixed inset-0 md:z-50 flex-col p-20">
            <CheckoutScreen
              cart={cart}
              cartTotal={cartTotal}
              onClose={() => setIsChekoutScreenOpen(false)}
              onConfirmPayment={handlePayment}
              onCancelPayment={handleCancelPayment}
            />
          </div>
        )}

        {/* Mobile Floating Cart Button */}
        {isMobile && cart.length > 0 && !isCartOpen && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50"
          >
            <FontAwesomeIcon icon={faCartShopping} size="xl" />
            <span className="absolute top-0 right-0 -mt-3 -mr-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cart.length}
            </span>
          </button>
        )}

        {/* Mobile Cart Modal */}
        {isMobile && isCartOpen && cart.length > 0 && (
          <div
            className="fixed inset-0 z-60 md:z-50 bg-gray-900 text-white flex flex-col px-3 py-2"
            style={{
              top: navHeight,
            }}
          >
            <Cart
              cart={cart}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
              setCartTotal={setCartTotal}
              clearCart={() => setCart([])}
              onClose={() => setIsCartOpen(false)}
              onCheckout={() => setIsChekoutScreenOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
