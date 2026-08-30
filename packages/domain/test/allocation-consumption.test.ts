import assert from 'node:assert/strict';
import test from 'node:test';

import {
  money,
  subtractMoney,
} from '../src/money.js';
import type { AllocationConsumption } from '../src/allocation-consumption.js';

test('represents money consumed from an allocation', () => {
  const consumption: AllocationConsumption = {
    id: 'consumption-001',
    allocationId: 'allocation-001',
    purchaseId: 'purchase-001',
    amount: money(18_000n),
    consumedAt: '2026-08-30T09:00:00+05:30',
  };

  assert.equal(consumption.allocationId, 'allocation-001');
  assert.equal(consumption.purchaseId, 'purchase-001');
  assert.equal(consumption.amount.amountMinor, 18_000n);
});

test('derives remaining allocation deterministically', () => {
  const allocation = money(100_000n);
  const firstPurchase = money(18_000n);
  const secondPurchase = money(22_000n);
  const thirdPurchase = money(15_000n);

  const afterFirst = subtractMoney(allocation, firstPurchase);
  const afterSecond = subtractMoney(afterFirst, secondPurchase);
  const remaining = subtractMoney(afterSecond, thirdPurchase);

  assert.equal(remaining.amountMinor, 45_000n);
  assert.equal(remaining.currency, 'INR');
});

test('rejects consumption greater than available allocation', () => {
  assert.throws(
    () => subtractMoney(money(10_000n), money(12_000n)),
    /Money result cannot be negative/,
  );
});
