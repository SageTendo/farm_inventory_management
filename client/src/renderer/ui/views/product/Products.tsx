import { faBox } from "@fortawesome/free-solid-svg-icons";
import { ListPage } from "../../components/shared/ListPage";
import { useProducts } from "../../../hooks/useProducts";
import { ProductDTO } from "../../../../shared/dto/product";
import { isFetchingProductsAtom } from "../../../atoms";
import { useAtomValue } from "jotai";
import { Spinner } from "../../components/shared/Spinner";

export function Products() {
  const { products, currentPage, totalPages, setCurrentPage, handleSearch } =
    useProducts();
  const isFetchingProducts = useAtomValue(isFetchingProductsAtom);

  const labels = [
    "Name",
    "Buy Price (USD)",
    "Sell Price (USD)",
    "Stock",
    "Low Stock Threshold",
  ];
  const keys: (keyof ProductDTO)[] = [
    "name",
    "buyPrice",
    "sellPrice",
    "quantity",
    "lowStockThreshold",
  ];

  const formattedProducts = products.map((product) => ({
    ...product,
    buyPrice: product.buyPrice.toFixed(2),
    sellPrice: product.sellPrice.toFixed(2),
  }));

  return (
    <>
      {isFetchingProducts ? (
        <Spinner />
      ) : (
        <ListPage
          title="Product"
          icon={faBox}
          addRoute="/products/new"
          searchPlaceholder="Search products..."
          entity="products"
          onSearch={handleSearch}
          data={formattedProducts}
          labels={labels}
          keys={keys}
          actionable={true}
          paginationProps={{
            page: currentPage,
            totalPages: totalPages,
            onStartPage: () => setCurrentPage(1),
            onEndPage: () => setCurrentPage(totalPages),
            onNextPage: () => setCurrentPage(currentPage + 1),
            onPreviousPage: () => setCurrentPage(currentPage - 1),
            onSetPage: setCurrentPage,
          }}
        />
      )}
    </>
  );
}
