import { useEffect, useState } from "react";
import { ProductDTO } from "../../shared/dto/product";
import { fetchProducts } from "../../mock/mock";
import { useAtomValue } from "jotai";
import { isMobileAtom } from "../atoms";

// TODO: Products Hook
export function useProducts() {
  const isMobile = useAtomValue(isMobileAtom);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [_totalProducts, setTotalProducts] = useState(0);
  const [_searchQuery, setSearchQuery] = useState("");
  const [queryLimit, _setQueryLimit] = useState(isMobile ? 25 : 10);
  const [currentPage, _setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // TODO: Fetch products from backend
  useEffect(() => {
    const queryOffset = (currentPage - 1) * queryLimit;
    const handleFetchProducts = async () => {
      const productsList = await fetchProducts(
        _searchQuery,
        queryLimit,
        queryOffset
      );
      setProducts(productsList.products);
      setTotalProducts(productsList.total);
      setTotalPages(Math.max(1, Math.ceil(productsList.total / queryLimit)));
    };

    handleFetchProducts();
  }, [_searchQuery, queryLimit, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [_searchQuery, queryLimit]);

  useEffect(() => {
    _setQueryLimit(isMobile ? 25 : 10);
  }, [isMobile]);

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  function setQueryLimit(limit: number, limitOptions: number[]) {
    let validLimit = 10;
    if (limitOptions.includes(limit)) {
      validLimit = Math.min(limit, _totalProducts);
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
    queryLimit,
    currentPage,
    totalPages,
    handleSearch,
    setQueryLimit,
    setCurrentPage,
  };
}
