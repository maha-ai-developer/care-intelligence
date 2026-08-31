import assert from 'node:assert/strict';
import test from 'node:test';

import {
  GetAllocationBalance,
  RecordPurchase,
} from '../src/index.js';

import { money } from '../../domain/src/money.js';

import { InMemoryAllocationRepository } from '../../persistence/src/in-memory/in-memory-allocation-repository.js';

import { InMemoryPurchaseRepository } from '../../persistence/src/in-memory/in-memory-purchase-repository.js';

import { InMemoryAllocationConsumptionRepository } from '../../persistence/src/in-memory/in-memory-allocation-consumption-repository.js';

test('records a purchase and consumes the allocation', async () => {
  const allocations = new InMemoryAllocationRepository();
  const purchases = new InMemoryPurchaseRepository();
  const consumptions =
    new InMemoryAllocationConsumptionRepository();

  await allocations.save({
    id: 'allocation-001',
    sourceId: 'source-001',
    name: 'Food',
    purpose: 'Daily food',
    amount: money(100_000n),
    status: 'active',
  });

  const recordPurchase = new RecordPurchase(
    allocations,
    purchases,
    consumptions,
  );

  await recordPurchase.execute({
    purchase: {
      id: 'purchase-001',
      allocationId: 'allocation-001',
      purchasedAt: '2026-08-30T09:00:00+05:30',
      vendorName: 'Local Hotel',
      category: 'food',
      total: money(18_000n),
      status: 'recorded',
    },
    items: [
      {
        id: 'item-001',
        purchaseId: 'purchase-001',
        name: 'Food',
        quantity: 1,
        unit: 'unit',
        unitPrice: money(18_000n),
        totalPrice: money(18_000n),
      },
    ],
  });

  assert.ok(await purchases.getById('purchase-001'));

  const consumption =
    await consumptions.getByAllocationId('allocation-001');

  assert.equal(consumption.length, 1);

  const recordedConsumption = consumption[0];
  assert.ok(recordedConsumption);
  assert.equal(recordedConsumption.amount.amountMinor, 18_000n);
});

test('calculates allocation balance through the application layer', async () => {
  const allocations = new InMemoryAllocationRepository();
  const consumptions =
    new InMemoryAllocationConsumptionRepository();

  await allocations.save({
    id: 'allocation-001',
    sourceId: 'source-001',
    name: 'Food',
    purpose: 'Daily food',
    amount: money(100_000n),
    status: 'active',
  });

  await consumptions.save({
    id: 'consumption-001',
    allocationId: 'allocation-001',
    purchaseId: 'purchase-001',
    amount: money(18_000n),
    consumedAt: '2026-08-30T09:00:00+05:30',
  });

  await consumptions.save({
    id: 'consumption-002',
    allocationId: 'allocation-001',
    purchaseId: 'purchase-002',
    amount: money(22_000n),
    consumedAt: '2026-08-30T12:00:00+05:30',
  });

  const getBalance = new GetAllocationBalance(
    allocations,
    consumptions,
  );

  const balance = await getBalance.execute('allocation-001');

  assert.equal(balance.amountMinor, 60_000n);
  assert.equal(balance.currency, 'INR');
});
