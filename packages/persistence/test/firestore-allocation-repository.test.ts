import assert from 'node:assert/strict';
import test from 'node:test';

import { FirestoreAllocationRepository } from '../src/firebase/firestore-allocation-repository.js';

import { money } from '../../domain/src/money.js';

test('firestore allocation repository saves an allocation', async () => {
  const documents = new Map<string, unknown>();

  const db = {
    collection(name: string) {
      assert.equal(name, 'allocations');

      return {
        doc(id: string) {
          return {
            async set(document: unknown) {
              documents.set(id, document);
            },

            async get() {
              return {
                exists: documents.has(id),
                data: () => documents.get(id),
              };
            },
          };
        },
      };
    },
  };

  const repository =
    new FirestoreAllocationRepository(db as never);

  const allocation = {
    id: 'allocation-001',
    sourceId: 'source-001',
    name: 'Food',
    purpose: 'Daily food',
    amount: money(100_000n),
    status: 'active' as const,
  };

  await repository.save(allocation);

  assert.deepEqual(documents.get('allocation-001'), {
    id: 'allocation-001',
    sourceId: 'source-001',
    name: 'Food',
    purpose: 'Daily food',
    amount: {
      amountMinor: '100000',
      currency: 'INR',
    },
    status: 'active',
  });
});

test('firestore allocation repository reads an allocation', async () => {
  const documents = new Map<string, unknown>([
    [
      'allocation-001',
      {
        id: 'allocation-001',
        sourceId: 'source-001',
        name: 'Food',
        purpose: 'Daily food',
        amount: {
          amountMinor: '100000',
          currency: 'INR',
        },
        status: 'active',
      },
    ],
  ]);

  const db = {
    collection(name: string) {
      assert.equal(name, 'allocations');

      return {
        doc(id: string) {
          return {
            async set(document: unknown) {
              documents.set(id, document);
            },

            async get() {
              return {
                exists: documents.has(id),
                data: () => documents.get(id),
              };
            },
          };
        },
      };
    },
  };

  const repository =
    new FirestoreAllocationRepository(db as never);

  const allocation =
    await repository.getById('allocation-001');

  assert.ok(allocation);
  assert.equal(allocation.id, 'allocation-001');
  assert.equal(allocation.name, 'Food');
  assert.equal(allocation.amount.amountMinor, 100_000n);
  assert.equal(allocation.amount.currency, 'INR');
});

test('firestore allocation repository returns null for missing allocation', async () => {
  const db = {
    collection(name: string) {
      assert.equal(name, 'allocations');

      return {
        doc(_id: string) {
          return {
            async set() {},

            async get() {
              return {
                exists: false,
                data: () => undefined,
              };
            },
          };
        },
      };
    },
  };

  const repository =
    new FirestoreAllocationRepository(db as never);

  assert.equal(
    await repository.getById('missing'),
    null,
  );
});
