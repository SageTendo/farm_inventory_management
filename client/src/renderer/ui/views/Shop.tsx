import {
  faCartShopping,
  faSearch,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ProductsListing } from "../components/pos/product/Main";
import { Cart } from "../components/pos/cart/Main";
import {
  SCREEN_SIZE,
  useDetectScreenType,
} from "../../hooks/useDetectScreenType";
import { useNavHeight } from "../../hooks/useNavHeight";
import { CheckoutScreen } from "../components/pos/payment/Main";
import { Money } from "../../../lib/money";
import { products } from "../../../mock/mock";
import { useCart } from "../../hooks/useCart";
import { useCurrency } from "../../hooks/useCurrency";
import { useProducts } from "../../hooks/useProducts";
import { SearchBar } from "../components/shared/SearchBar";
import { Pagination } from "../components/shared/Pagination";

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
  const {
    productList,
    queryLimit,
    currentPage,
    totalPages,
    handleSearch,
    setQueryLimit,
    setCurrentPage,
  } = useProducts();
  const {
    cart,
    cartTotal,
    cartItemsCount,
    addCartItem,
    updateCartItem,
    removeCartItem,
    clearCart,
  } = useCart(products);
  const { exchangeRate, selectedCurrency, setCurrency } = useCurrency();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChekoutScreenOpen, setIsChekoutScreenOpen] = useState(false);
  const isMobile = useDetectScreenType(SCREEN_SIZE.LARGE);
  const navHeight = useNavHeight();

  // TODO: Fetch from DB
  // const [products, setProducts] = useState<ProductDTO[]>()
  useEffect(() => {
    console.log("Fetching from database");
  }, []);

  // Close cart on mobile if cart is empty or screen size is larger
  useEffect(() => {
    if (!isMobile || cartItemsCount === 0) {
      setIsCartOpen(false);
    }
  }, [isMobile, cartItemsCount]);

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
    clearCart();
    setIsChekoutScreenOpen(false);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden pt-4 px-4">
      {/* Header */}
      <h1 className="mb-4 text-4xl font-bold flex items-center gap-3 text-gray-800">
        <FontAwesomeIcon icon={faStore} className="text-blue-900" />
        Shop
      </h1>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Main layout: product list + cart */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Product List */}
        {!isCartOpen && (
          <div className="flex flex-col flex-1 overflow-y-auto pr-1">
            <h2 className="font-bold mb-3 text-2xl text-gray-800">Products</h2>
            <ProductsListing
              products={productList.products}
              addToCart={addCartItem}
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
              changeQuantity={updateCartItem}
              removeItem={removeCartItem}
              clearCart={clearCart}
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
                onChangeSelectedCurrency={setCurrency}
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
              onChangeSelectedCurrency={setCurrency}
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
              changeQuantity={updateCartItem}
              removeItem={removeCartItem}
              clearCart={clearCart}
              onClose={() => setIsCartOpen(false)}
              onCheckout={() => {
                setIsCartOpen(false);
                setIsChekoutScreenOpen(true);
              }}
            />
          </div>
        )}
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        limit={queryLimit}
        onSetLimit={setQueryLimit}
        onStartPage={() => setCurrentPage(1)}
        onEndPage={() => setCurrentPage(totalPages)}
        onNextPage={() => setCurrentPage(currentPage + 1)}
        onPreviousPage={() => setCurrentPage(currentPage - 1)}
        onSetPage={setCurrentPage}
      />
    </div>
  );
}
