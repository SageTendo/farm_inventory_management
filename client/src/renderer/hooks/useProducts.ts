import { useEffect, useState } from "react";
import { ProductDTO } from "../../shared/dto/product";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isFetchingProductsAtom, isMobileAtom, productsAtom } from "../atoms";
import { trpcClient } from "../../shared/trpc/client";

export function useProducts() {
  const isMobile = useAtomValue(isMobileAtom);
  const setIsFetchingProducts = useSetAtom(isFetchingProductsAtom);
  const [products, setProducts] = useAtom<ProductDTO[]>(productsAtom);
  const [_totalProducts, setTotalProducts] = useState(0);
  const [_searchQuery, setSearchQuery] = useState("");
  const [queryLimit, _setQueryLimit] = useState(isMobile ? 25 : 10);
  const [currentPage, _setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const queryOffset = (currentPage - 1) * queryLimit;
    const handleFetchProducts = async () => {
      setIsFetchingProducts(true);
      const productsList = await trpcClient.product.getAll.query({
        searchTerm: _searchQuery,
        limit: queryLimit,
        offset: queryOffset,
      });
      setProducts(productsList.products);
      setTotalProducts(productsList.total);
      setTotalPages(Math.max(1, Math.ceil(productsList.total / queryLimit)));
      setIsFetchingProducts(false);
    };

    handleFetchProducts();
  }, [_searchQuery, queryLimit, currentPage]);

  useEffect(() => {
    _setCurrentPage(1);
  }, [_searchQuery, queryLimit]);

  useEffect(() => {
    _setQueryLimit(isMobile ? 25 : 10);
  }, [isMobile]);

  function handleSearch(query: string) {
    setSearchQuery(query.trim());
  }

  function setQueryLimit(limit: number, limitOptions: number[]) {
    let validLimit = 10;
    if (limitOptions.includes(limit)) {
      validLimit = Math.min(limit, _totalProducts);
    }
    _setQueryLimit(validLimit);
  }

  function setCurrentPage(page: number) {
    if (page < 1) return _setCurrentPage(1);
    if (page > totalPages) return _setCurrentPage(totalPages);
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
