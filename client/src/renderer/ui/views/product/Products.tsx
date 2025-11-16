import { faBox } from "@fortawesome/free-solid-svg-icons";
import { ListPage } from "../../components/shared/ListPage";
import { useProducts } from "../../../hooks/useProducts";
import { ProductDTO } from "../../../../shared/dto/product";

export function Products() {
  const { products, currentPage, totalPages, setCurrentPage, handleSearch } =
    useProducts();

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

  return (
    <ListPage
      title="Product"
      icon={faBox}
      addRoute="/products/new"
      searchPlaceholder="Search products..."
      entity="products"
      onSearch={handleSearch}
      data={products}
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
  );
}
