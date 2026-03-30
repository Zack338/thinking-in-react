import ITEMS from "./db.js";
import { parseCost } from "./lib.js";

export const HIGHEST_ITEM_COST = Math.max(
  ...ITEMS.map((item) => parseCost(item.cost))
);
