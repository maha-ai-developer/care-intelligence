import assert from 'node:assert/strict';
import test from 'node:test';

import { money } from '../src/money.js';
import type { Allocation } from '../src/allocation.js';

test('creates an active allocation', () => {
  const allocation: Allocation = {
    id: 'allocation-001',
    sourceId: 'source-001',
    name: 'Food - September',
    purpose: 'Daily food purchases',
    amount: money(100_000n),
    status: 'active',
  };

  assert.equal(allocation.id, 'allocation-001');
  assert.equal(allocation.sourceId, 'source-001');
  assert.equal(allocation.amount.amountMinor, 100_000n);
  assert.equal(allocation.status, 'active');
});
