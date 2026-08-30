import assert from 'node:assert/strict';
import test from 'node:test';

import {
  allocationToDocument,
  moneyFromDocument,
  moneyToDocument,
  purchaseToDocument,
} from '../src/index.js';

import { money } from '../../domain/src/money.js';

test('serializes bigint money without precision loss', () => {
  const value = money(9007199254740993n);

  const document = moneyToDocument(value);

  assert.equal(document.amountMinor, '9007199254740993');
  assert.equal(document.currency, 'INR');
});

test('deserializes Firestore money back to bigint', () => {
  const value = moneyFromDocument({
    amountMinor: '9007199254740993',
    currency: 'INR',
  });

  assert.equal(value.amountMinor, 9007199254740993n);
  assert.equal(value.currency, 'INR');
});

test('maps allocation money to a Firestore document', () => {
  const document = allocationToDocument({
    id: 'allocation-001',
    sourceId: 'source-001',
    name: 'Food - September',
    purpose: 'Daily food purchases',
    amount: money(100_000n),
    status: 'active',
  });

  assert.equal(document.amount.amountMinor, '100000');
  assert.equal(document.amount.currency, 'INR');
});

test('maps purchase money to a Firestore document', () => {
  const document = purchaseToDocument({
    id: 'purchase-001',
    allocationId: 'allocation-001',
    purchasedAt: '2026-08-30T09:00:00+05:30',
    vendorName: 'Local Hotel',
    category: 'food',
    total: money(18_000n),
    status: 'recorded',
  });

  assert.equal(document.total.amountMinor, '18000');
  assert.equal(document.total.currency, 'INR');
});
