import {
  faCartShopping,
  faSearch,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ProductsListing } from "../../components/pos/product/Main";
import { Cart } from "../../components/pos/cart/Main";
import {
  SCREEN_SIZE,
  useDetectScreenType,
} from "../../../hooks/useDetectScreenType";
import { useNavHeight } from "../../../hooks/useNavHeight";
import { CheckoutScreen } from "../../components/pos/payment/Main";
import { Money } from "../../../../lib/money";
import toast from "react-hot-toast";
import { CartItemDTO, ProductDTO } from "../../../../shared/dto/product";
import { products } from "../../../../mock/mock";

/**
 * TODO:
 * - Add a loading state
 * - Add a success state
 * - Add a failure state
 * - Fetch products from DB
 * - Search products from DB
 * - Add pagination of products
 * - Implement payment process
 **/
export function Shop() {
  const [query, setQuery] = useState("");

  const [cart, setCart] = useState<CartItemDTO[]>([]);
  const [cartTotal, setCartTotal] = useState<Money>(Money.fromNumber(0));
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const [exchangeRate, setExchangeRate] = useState(20); //TODO: Get exchange rate from API
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "ZIG">(
    "USD"
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChekoutScreenOpen, setIsChekoutScreenOpen] = useState(false);
  const isMobile = useDetectScreenType(SCREEN_SIZE.LARGE);
  const navHeight = useNavHeight();

  // TODO: Fetch from DB
  // const [products, setProducts] = useState<ProductDTO[]>()
  useEffect(() => {
    console.log("Fetching from database");
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  function addItemToCart(product: ProductDTO) {
    const cartItem = cart.find((item) => item.id === product.id);
    const quantityInCart = cartItem?.quantity ?? 0;
    const availableStock = product.quantity - quantityInCart;

    if (availableStock <= 0) {
      toast.error(`OUT OF STOCK: ${product.name}`);
      return;
    }

    if (cartItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newCartItem = CartItemDTO.parse(product)
      setCart((prev) => [...prev, { ...newCartItem, quantity: 1 }]);
    }
  }

  function changeItemQuantity(productId: string, delta: number) {
    if (delta === 0) return;

    const cartItem = cart.find((item) => item.id === productId);
    const product = products.find((item) => item.id === productId); // from full list

    if (!cartItem || !product) return;

    const newQuantity = cartItem.quantity + delta;
    const maxStock = product.quantity;

    if (newQuantity < 1) {
      removeItemFromCart(productId);
      return;
    }

    if (newQuantity > maxStock) {
      toast.error(`NOT ENOUGH STOCK: ${product.name}.`);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function removeItemFromCart(productId: string) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  // Close cart on mobile if cart is empty or screen size is larger
  useEffect(() => {
    if (!isMobile || cart.length === 0) {
      setIsCartOpen(false);
    }
  }, [isMobile, cart.length]);

  // Update cart total and cart items count
  useEffect(() => {
    const cartTotal = cart.reduce(
      (total, item) =>
        total +
        item.sellPrice.multiply(item.quantity).toDollars,
      0
    );

    setCartTotal(Money.fromNumber(cartTotal));
    setCartItemsCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  function handlePayment(paidAmount: Money, changeAmount: Money): void {
    // TODO: implement payment
    // Things to do:
    // - Update stock in database
    // - Verify stock availability
    // - When inventory update is complete, clear cart and close checkout screen
    // - If payment is complete, show success message
    // - Generate receipt and export to PDF ??
    // - Update products list ??
    // - If payment is not complete, show error message
    console.log("Total amount:", cartTotal.toDollars);
    console.log("Payment received:", paidAmount.toDollars);
    console.log("Change amount:", changeAmount.toDollars);
    throw new Error("Function not implemented.");
  }

  function handleCancelPayment(): void {
    setCart([]);
    setCartTotal(Money.fromNumber(0));
    setCartItemsCount(0);
    setIsChekoutScreenOpen(false);
  }

  function handlePreviousPage(): void {
    // TODO: implement pagination
    // - Get previous page of products from API
    // - Update products list
    throw new Error("Function not implemented.");
  }

  function handleNextPage(): void {
    // TODO: implement pagination
    // - Get next page of products from API
    // - Update products list
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
              addToCart={addItemToCart}
            />
          </div>
        )}

        {/* Desktop Cart */}
        {!isMobile && cart.length > 0 && (
          <div className="w-full max-w-sm xl:max-w-lg bg-gray-900 text-white p-2.5 rounded-lg shadow-md flex flex-col h-full">
            <Cart
              cart={cart}
              cartItemsCount={cartItemsCount}
              cartTotalUSD={cartTotal.read}
              cartTotalZIG={cartTotal.multiply(exchangeRate).read}
              changeQuantity={changeItemQuantity}
              removeItem={removeItemFromCart}
              clearCart={() => setCart([])}
              onCheckout={() => setIsChekoutScreenOpen(true)}
            />
          </div>
        )}

        {/* Desktop Checkout Screen Modal */}
        {!isMobile && isChekoutScreenOpen && (
          <div className="fixed inset-0 md:z-50 flex-col p-20">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
              <CheckoutScreen
                cart={cart}
                cartTotal={cartTotal}
                selectedCurrency={selectedCurrency}
                exchangeRate={exchangeRate}
                onChangeSelectedCurrency={setSelectedCurrency}
                onClose={() => setIsChekoutScreenOpen(false)}
                onConfirmPayment={handlePayment}
                onCancelPayment={handleCancelPayment}
              />
            </div>
          </div>
        )}

        {/* Mobile Checkout Screen Modal  */}
        {isMobile && isChekoutScreenOpen && (
          <div className="fixed inset-0 z-50 md:z-50 bg-gray-900 text-white flex flex-col px-3 py-2">
            <CheckoutScreen
              cart={cart}
              cartTotal={cartTotal}
              selectedCurrency={selectedCurrency}
              exchangeRate={exchangeRate}
              onChangeSelectedCurrency={setSelectedCurrency}
              onClose={() => {
                setIsChekoutScreenOpen(false);
                setIsCartOpen(true);
              }}
              onConfirmPayment={handlePayment}
              onCancelPayment={handleCancelPayment}
              isMobile={true}
            />
          </div>
        )}

        {/* Mobile Floating Cart Button */}
        {isMobile && cart.length > 0 && !isCartOpen && !isChekoutScreenOpen && (
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
          <div className="fixed inset-0 z-50 md:z-50 bg-gray-900 text-white flex flex-col px-3 py-2">
            <Cart
              cart={cart}
              cartItemsCount={cartItemsCount}
              cartTotalUSD={cartTotal.read}
              cartTotalZIG={cartTotal.multiply(exchangeRate).read}
              changeQuantity={changeItemQuantity}
              removeItem={removeItemFromCart}
              clearCart={() => setCart([])}
              onClose={() => setIsCartOpen(false)}
              onCheckout={() => {
                setIsCartOpen(false);
                setIsChekoutScreenOpen(true);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
