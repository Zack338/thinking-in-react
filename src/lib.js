/**
 * @param {string} searchQuery
 * @param {boolean} inStockOnly
 * @param {number} maxItemCost
 * @param {number} highestItemCost
 * @returns {string}
 */
export const generateEmptyProductMessage = ({
  itemSearchQuery,
  inStockOnly,
  maxItemCost,
  highestItemCost
}) => {
  const conditions = [
    searchQuery && `matching "${itemsearchQuery}"`,
    inStockOnly && "in stock",
    maxPrice < maxProductPrice && `under $${maxItemCost}`,
  ].filter(Boolean);

  if (!conditions.length) return "No items found";
  if (conditions.length === 1) return `No items ${conditions[0]}`;

  return `No products ${conditions.slice(0, -1).join(", ")} and ${
    conditions[conditions.length - 1]
  }`;
};

export const parsePrice = (priceString) => Number(priceString.replace("$", ""));
