import assert from 'node:assert/strict';
import test from 'node:test';

import type { Firestore } from 'firebase-admin/firestore';

import type { Purchase } from '../../domain/src/purchase.js';
import { FirestorePurchaseRepository } from '../src/firebase/firestore-purchase-repository.js';

function createPurchase(): Purchase {
  return {
    id: 'purchase-1',
    allocationId: 'allocation-1',
    purchasedAt: '2026-01-15T10:00:00.000Z',
    vendorName: 'Test Store',
    category: 'Groceries',
    total: {
      amountMinor: 18_000n,
      currency: 'INR',
    },
    status: 'recorded',
  };
}

test('firestore purchase repository saves and retrieves by id', async () => {
  const documents = new Map<string, Record<string, unknown>>();

  const db = {
    collection: () => ({
      doc: (id: string) => ({
        async get() {
          const data = documents.get(id);

          return {
            exists: data !== undefined,
            data: () => data,
          };
        },

        async set(data: Record<string, unknown>) {
          documents.set(id, data);
        },
      }),
    }),
  } as unknown as Firestore;

  const repository = new FirestorePurchaseRepository(db);
  const purchase = createPurchase();

  await repository.save(purchase);

  const result = await repository.getById(purchase.id);

  assert.deepEqual(result, purchase);
});

test('firestore purchase repository returns null for missing purchase', async () => {
  const db = {
    collection: () => ({
      doc: (_id: string) => ({
        async get() {
          return {
            exists: false,
            data: () => undefined,
          };
        },
      }),
    }),
  } as unknown as Firestore;

  const repository = new FirestorePurchaseRepository(db);

  const result = await repository.getById('missing-purchase');

  assert.equal(result, null);
});

test('firestore purchase repository replaces purchase with same id', async () => {
  const documents = new Map<string, Record<string, unknown>>();

  const db = {
    collection: () => ({
      doc: (id: string) => ({
        async get() {
          const data = documents.get(id);

          return {
            exists: data !== undefined,
            data: () => data,
          };
        },

        async set(data: Record<string, unknown>) {
          documents.set(id, data);
        },
      }),
    }),
  } as unknown as Firestore;

  const repository = new FirestorePurchaseRepository(db);

  const first = createPurchase();

  const second: Purchase = {
    ...first,
    vendorName: 'Updated Store',
    total: {
      amountMinor: 25_000n,
      currency: 'INR',
    },
  };

  await repository.save(first);
  await repository.save(second);

  const result = await repository.getById(first.id);

  assert.deepEqual(result, second);
});
