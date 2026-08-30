import assert from 'node:assert/strict';
import test from 'node:test';

import { money } from '../src/money.js';
import type { Purchase } from '../src/purchase.js';
import type { PurchaseItem } from '../src/purchase-item.js';

test('creates a recorded purchase', () => {
  const purchase: Purchase = {
    id: 'purchase-001',
    allocationId: 'allocation-001',
    purchasedAt: '2026-08-30T09:00:00+05:30',
    vendorName: 'Local Hotel',
    category: 'food',
    total: money(18_000n),
    status: 'recorded',
  };

  assert.equal(purchase.allocationId, 'allocation-001');
  assert.equal(purchase.total.amountMinor, 18_000n);
  assert.equal(purchase.status, 'recorded');
});

test('creates a purchase item with quantity and unit', () => {
  const item: PurchaseItem = {
    id: 'item-001',
    purchaseId: 'purchase-001',
    name: 'Rice',
    quantity: 2,
    unit: 'kg',
    unitPrice: money(5_000n),
    totalPrice: money(10_000n),
  };

  assert.equal(item.name, 'Rice');
  assert.equal(item.quantity, 2);
  assert.equal(item.unit, 'kg');
  assert.equal(item.totalPrice.amountMinor, 10_000n);
});
