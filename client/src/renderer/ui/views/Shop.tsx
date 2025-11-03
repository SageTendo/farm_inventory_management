import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductsListing } from "../components/pos/product/Main";
import { CartPanel } from "../components/pos/cart/Main";
import { useDetectScreenType } from "../../hooks/useDetectScreenType";
import { CheckoutScreen } from "../components/pos/checkout/Main";
import { Money } from "../../../lib/money";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import { SearchBar } from "../components/shared/SearchBar";
import { Pagination } from "../components/shared/Pagination";
import { useAtom, useSetAtom } from "jotai";
import { cartOpenAtom, checkoutOpenAtom } from "../../atoms/shop.atom";

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
    products,
    queryLimit,
    currentPage,
    totalPages,
    handleSearch,
    setQueryLimit,
    setCurrentPage,
  } = useProducts();
  const { addCartItem, updateCartItem, removeCartItem, clearCart } =
    useCart(products);
  const isMobile = useDetectScreenType();

  const setIsCartOpen = useSetAtom(cartOpenAtom);
  const [isChekoutScreenOpen, setIsChekoutScreenOpen] =
    useAtom(checkoutOpenAtom);

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
    // console.log("Total amount:", cartTotal.toDollars);
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
      <SearchBar onSearch={handleSearch} />

      {/* Main layout: product list + cart */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        <ProductsListing products={products} onAddToCart={addCartItem} />
        <CartPanel
          onChangeQuantity={updateCartItem}
          onRemoveItem={removeCartItem}
          clearCart={clearCart}
          onCheckout={() => setIsChekoutScreenOpen(true)}
        />

        {/* Desktop Checkout Screen Modal */}
        {!isMobile && isChekoutScreenOpen && (
          <div className="fixed inset-0 md:z-50 flex-col p-20">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
              <CheckoutScreen
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
              onClose={() => {
                setIsChekoutScreenOpen(false);
                setIsCartOpen(true);
              }}
              onConfirmPayment={handlePayment}
              onCancelPayment={handleCancelPayment}
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
