import { describe, expect, it } from "vitest";

import { generateEmptyItemMessage, parseCost } from "./lib";

const TEST_ITEMS = [
  { name: "apple", price: "$2", category: "Fruits", stocked: true },
  { name: "banana", price: "$1.50", category: "Fruits", stocked: true },
  { name: "carrot", price: "$0.75", category: "Vegetables", stocked: true },
  { name: "lettuce", price: "$3", category: "Vegetables", stocked: false },
  { name: "basil", price: "$4.50", category: "Herbs", stocked: true },
];

const HIGHEST_ITEM_COST = Math.max(
  ...TEST_ITEMS.map((item) => parseCost(item.price))
); // $4.50

describe("parseCost", () => {
  it("converts price strings to numbers", () => {
    expect(parseCost("$5")).toBe(5);
    expect(parseCost("$10")).toBe(10);
    expect(parseCost("$1")).toBe(1);
  });
});

describe("generateEmptyItemMessage", () => {
  it("shows search term when only search filter active", () => {
    expect(
      generateEmptyItemMessage({
        itemSearchQuery: "dragon",
        inStockOnly: false,
        maxItemCost: HIGHEST_ITEM_COST,
        highestItemCost: HIGHEST_ITEM_COST,
      })
    ).toBe('No items matching "dragon"');
  });

  it("shows stock status when only stock filter active", () => {
    expect(
      generateEmptyItemMessage({
        itemSearchQuery: "",
        inStockOnly: true,
        maxItemCost: HIGHEST_ITEM_COST,
        highestItemCost: HIGHEST_ITEM_COST,
      })
    ).toBe("No items in stock");
  });

  it("shows price limit when only price filter active", () => {
    const INPUT_MAX_COST = 2;

    expect(
      generateEmptyItemMessage({
        itemSearchQuery: "",
        inStockOnly: false,
        maxItemCost: INPUT_MAX_COST,
        highestItemCost: HIGHEST_ITEM_COST,
      })
    ).toBe(`No items under $${INPUT_MAX_COST}`);
  });

  it('combines two conditions with "and"', () => {
    expect(
      generateEmptyItemMessage({
        itemSearchQuery: "apple",
        inStockOnly: true,
        maxItemCost: HIGHEST_ITEM_COST,
        highestItemCost: HIGHEST_ITEM_COST,
      })
    ).toBe('No items matching "apple" and in stock');
  });

  it('combines three conditions with commas and "and"', () => {
    expect(
      generateEmptyItemMessage({
        itemSearchQuery: "dragon",
        inStockOnly: true,
        maxItemCost: 2,
        highestItemCost: HIGHEST_ITEM_COST,
      })
    ).toBe('No items matching "dragon", in stock and under $2');
  });
});
