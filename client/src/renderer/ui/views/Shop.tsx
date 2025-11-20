import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductsListing } from "../components/shop/product/Main";
import { CartPanel } from "../components/shop/cart/Main";
import { CheckoutScreen } from "../components/shop/checkout/Main";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import { SearchBar } from "../components/shared/SearchBar";
import { Pagination } from "../components/shared/Pagination";
import { useAtom, useAtomValue } from "jotai";
import { checkoutOpenAtom } from "../../atoms/shop.atom";
import { isFetchingProductsAtom, isMobileAtom } from "../../atoms";
import { Spinner } from "../components/shared/Spinner";

/**
 * TODO:
 * - Add a success state
 * - Add a failure state
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
  const isFetchingProducts = useAtomValue(isFetchingProductsAtom);
  const { addCartItem, updateCartItem, removeCartItem, clearCart } = useCart();
  const isMobile = useAtomValue(isMobileAtom);
  const [isChekoutScreenOpen, setIsChekoutScreenOpen] =
    useAtom(checkoutOpenAtom);

  return (
    <div className="flex flex-col h-full overflow-hidden pt-4 px-4">
      {/* Header */}
      <h1 className="mb-4 text-4xl font-bold flex items-center gap-3 text-gray-800">
        <FontAwesomeIcon icon={faStore} className="text-blue-900" />
        Shop
      </h1>
      <SearchBar onSearch={handleSearch} />

      {/* Main layout: product list + cart */}
      {isFetchingProducts ? (
        <Spinner />
      ) : (
        <>
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
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
                <CheckoutScreen />
              </div>
            )}

            {/* Mobile Checkout Screen Modal */}
            {isMobile && isChekoutScreenOpen && (
              <div className="fixed inset-0 z-50 md:z-50 bg-gray-900 text-white flex flex-col px-3 py-2">
                <CheckoutScreen />
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
        </>
      )}
    </div>
  );
}
