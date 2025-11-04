import { useState } from "react";

import { HIGHEST_PRICE  } from "../constants";

export default function useFilters() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("category");
  const [maxPrice, setMaxPrice] = useState(HIGHEST_PRICE);

  const clearFilters = () => {
    setFilterText("");
    setInStockOnly(false);
    setSortBy("category");
    setMaxPrice(HIGHEST_PRICE);
  };

  return {
    filterText,
    inStockOnly,
    sortBy,
    priceLimit,
    setFilterText,
    setInStockOnly,
    setSortBy,
    setPriceLimit,
    clearFilters,
  };
}
