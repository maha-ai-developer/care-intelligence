import assert from 'node:assert/strict';
import test from 'node:test';

import { calculateRemainingAllocation } from '../src/allocation-balance.js';
import { money } from '../src/money.js';
import type { Allocation } from '../src/allocation.js';
import type { AllocationConsumption } from '../src/allocation-consumption.js';

test('calculates remaining allocation from consumptions', () => {
  const allocation: Allocation = {
    id: 'allocation-001',
    sourceId: 'source-001',
    name: 'Food - September',
    purpose: 'Daily food purchases',
    amount: money(100_000n),
    status: 'active',
  };

  const consumptions: AllocationConsumption[] = [
    {
      id: 'consumption-001',
      allocationId: 'allocation-001',
      purchaseId: 'purchase-001',
      amount: money(18_000n),
      consumedAt: '2026-08-30T09:00:00+05:30',
    },
    {
      id: 'consumption-002',
      allocationId: 'allocation-001',
      purchaseId: 'purchase-002',
      amount: money(22_000n),
      consumedAt: '2026-08-30T12:00:00+05:30',
    },
  ];

  const remaining = calculateRemainingAllocation(
    allocation,
    consumptions,
  );

  assert.equal(remaining.amountMinor, 60_000n);
  assert.equal(remaining.currency, 'INR');
});
