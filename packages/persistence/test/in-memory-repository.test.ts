import assert from 'node:assert/strict';
import test from 'node:test';

import {
  InMemoryAllocationRepository,
  InMemoryAllocationConsumptionRepository,
  InMemoryMoneySourceRepository,
  InMemoryPurchaseRepository,
} from '../src/index.js';

import { money } from '../../domain/src/money.js';

test('money source repository saves and retrieves by id', async () => {
  const repository = new InMemoryMoneySourceRepository();

  const source = {
    id: 'source-001',
    name: 'Family Funds',
    description: 'Monthly caregiving funds',
  };

  await repository.save(source);

  assert.deepEqual(await repository.getById('source-001'), source);
});

test('allocation repository returns null for missing id', async () => {
  const repository = new InMemoryAllocationRepository();

  assert.equal(await repository.getById('missing'), null);
});

test('allocation repository replaces entity with same id', async () => {
  const repository = new InMemoryAllocationRepository();

  const first = {
    id: 'allocation-001',
    sourceId: 'source-001',
    name: 'Food',
    purpose: 'Daily food',
    amount: money(100_000n),
    status: 'active' as const,
  };

  const second = {
    ...first,
    amount: money(80_000n),
  };

  await repository.save(first);
  await repository.save(second);

  assert.deepEqual(await repository.getById('allocation-001'), second);
});

test('purchase repository saves and retrieves by id', async () => {
  const repository = new InMemoryPurchaseRepository();

  const purchase = {
    id: 'purchase-001',
    allocationId: 'allocation-001',
    purchasedAt: '2026-08-30T09:00:00+05:30',
    vendorName: 'Local Hotel',
    category: 'food',
    total: money(18_000n),
    status: 'recorded' as const,
  };

  await repository.save(purchase);

  assert.deepEqual(await repository.getById('purchase-001'), purchase);
});

test('allocation consumption repository saves and retrieves by id', async () => {
  const repository = new InMemoryAllocationConsumptionRepository();

  const consumption = {
    id: 'consumption-001',
    allocationId: 'allocation-001',
    purchaseId: 'purchase-001',
    amount: money(18_000n),
    consumedAt: '2026-08-30T09:00:00+05:30',
  };

  await repository.save(consumption);

  assert.deepEqual(
    await repository.getById('consumption-001'),
    consumption,
  );
});
