import { useEffect, useState } from "react";
import { ProductDTO } from "../../shared/dto/product";
import { mockProducts } from "../../mock/mock";
import { useAtomValue } from "jotai";
import { isMobileAtom } from "../atoms";

// TODO: Products Hook
export function useProducts() {
  const isMobile = useAtomValue(isMobileAtom);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [queryLimit, _setQueryLimit] = useState(isMobile ? 25 : 10);
  const [currentPage, _setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // TODO: Fetch products from backend
  useEffect(() => {
    let filtered = mockProducts;
    const queryOffset = (currentPage - 1) * queryLimit;

    if (searchQuery !== "") {
      filtered = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.slice(queryOffset, queryOffset + queryLimit);
    setTotalPages(Math.max(1, Math.ceil(mockProducts.length / queryLimit)));
    setProducts(filtered);
    setTotalProducts(mockProducts.length);
  }, [searchQuery, queryLimit, currentPage]);

  useEffect(() => {
    _setQueryLimit(isMobile ? 25 : 10);
  }, [isMobile]);

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  function setQueryLimit(limit: number, limitOptions: number[]) {
    let validLimit = 10;
    if (limitOptions.includes(limit)) {
      validLimit = Math.min(limit, totalProducts);
    }
    _setQueryLimit(validLimit);
  }

  function setCurrentPage(page: number) {
    if (page < 1) _setCurrentPage(1);
    if (page > totalPages) _setCurrentPage(totalPages);
    _setCurrentPage(page);
  }

  return {
    products,
    totalProducts,
    searchQuery,
    queryLimit,
    currentPage,
    totalPages,
    handleSearch,
    setQueryLimit,
    setCurrentPage,
  };
}
