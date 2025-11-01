import { useEffect, useState } from "react";
import { ProductListDTO } from "../../shared/dto/product";
import { products } from "../../mock/mock";
import { SCREEN_SIZE, useDetectScreenType } from "./useDetectScreenType";

// TODO: Products Hook
export function useProducts() {
  const isMobile = useDetectScreenType(SCREEN_SIZE.LARGE);
  const [productList, setProductList] = useState<ProductListDTO>({
    products: products,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [queryLimit, _setQueryLimit] = useState(isMobile ? 25 : 10);
  const [currentPage, _setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // TODO: Fetch products from backend
  useEffect(() => {
    let filtered = products;
    const queryOffset = (currentPage - 1) * queryLimit;

    if (searchQuery !== "") {
      filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.slice(queryOffset, queryOffset + queryLimit);
    setTotalPages(Math.max(1, Math.ceil(products.length / queryLimit)));
    setProductList({
      products: filtered,
      total: products.length,
    });
  }, [searchQuery, queryLimit, currentPage]);

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  function setQueryLimit(limit: number, limitOptions: number[]) {
    let validLimit = 10;
    if (limitOptions.includes(limit)) {
      validLimit = Math.min(limit, productList.total);
    }
    _setQueryLimit(validLimit);
  }

  function setCurrentPage(page: number) {
    if (page < 1) _setCurrentPage(1);
    if (page > totalPages) _setCurrentPage(totalPages);
    _setCurrentPage(page);
  }

  return {
    productList,
    searchQuery,
    queryLimit,
    currentPage,
    totalPages,
    handleSearch,
    setQueryLimit,
    setCurrentPage,
  };
}
