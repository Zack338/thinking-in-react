import items from "./db.js";
import { parsePrice } from "./lib.js";

export const HIGHEST_ITEM_COST = Math.max(
  ...items.map((item) => parsePrice(item.price))
);
