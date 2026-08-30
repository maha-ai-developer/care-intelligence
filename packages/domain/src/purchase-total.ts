import type { Money } from './money.js';
import { addMoney, money } from './money.js';
import type { PurchaseItem } from './purchase-item.js';

export function calculatePurchaseTotal(
  items: readonly PurchaseItem[],
): Money {
  if (items.length === 0) {
    return money(0n);
  }

  let total = money(0n);

  for (const item of items) {
    total = addMoney(total, item.totalPrice);
  }

  return total;
}
