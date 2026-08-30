import assert from 'node:assert/strict';
import test from 'node:test';

import { calculatePurchaseTotal } from '../src/purchase-total.js';
import { money } from '../src/money.js';
import type { PurchaseItem } from '../src/purchase-item.js';

test('calculates purchase total from purchase items', () => {
  const items: PurchaseItem[] = [
    {
      id: 'item-001',
      purchaseId: 'purchase-001',
      name: 'Rice',
      quantity: 2,
      unit: 'kg',
      unitPrice: money(5_000n),
      totalPrice: money(10_000n),
    },
    {
      id: 'item-002',
      purchaseId: 'purchase-001',
      name: 'Milk',
      quantity: 2,
      unit: 'litre',
      unitPrice: money(4_000n),
      totalPrice: money(8_000n),
    },
  ];

  const total = calculatePurchaseTotal(items);

  assert.equal(total.amountMinor, 18_000n);
  assert.equal(total.currency, 'INR');
});

test('empty purchase has zero total', () => {
  const total = calculatePurchaseTotal([]);

  assert.equal(total.amountMinor, 0n);
  assert.equal(total.currency, 'INR');
});
