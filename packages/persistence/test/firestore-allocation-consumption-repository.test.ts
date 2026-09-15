import assert from 'node:assert/strict';
import test from 'node:test';

import type { Firestore } from 'firebase-admin/firestore';

import type { AllocationConsumption } from '../../domain/src/allocation-consumption.js';
import { FirestoreAllocationConsumptionRepository } from '../src/firebase/firestore-allocation-consumption-repository.js';

function createConsumption(
  id: string,
  allocationId: string,
  amountMinor: bigint,
): AllocationConsumption {
  return {
    id,
    allocationId,
    purchaseId: `purchase-for-${id}`,
    amount: {
      amountMinor,
      currency: 'INR',
    },
    consumedAt: '2026-01-15T10:00:00.000Z',
  };
}

test('firestore allocation consumption repository saves and retrieves by id', async () => {
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

  const repository =
    new FirestoreAllocationConsumptionRepository(db);

  const consumption = createConsumption(
    'consumption-1',
    'allocation-1',
    18_000n,
  );

  await repository.save(consumption);

  const result = await repository.getById(consumption.id);

  assert.deepEqual(result, consumption);
});

test('firestore allocation consumption repository returns null for missing id', async () => {
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

  const repository =
    new FirestoreAllocationConsumptionRepository(db);

  const result = await repository.getById('missing-consumption');

  assert.equal(result, null);
});

test('firestore allocation consumption repository finds consumptions by allocation id', async () => {
  const documents = [
    createConsumption(
      'consumption-1',
      'allocation-1',
      18_000n,
    ),
    createConsumption(
      'consumption-2',
      'allocation-1',
      7_500n,
    ),
    createConsumption(
      'consumption-3',
      'allocation-2',
      25_000n,
    ),
  ];

  const db = {
    collection: () => ({
      where(
        field: string,
        operator: string,
        value: string,
      ) {
        assert.equal(field, 'allocationId');
        assert.equal(operator, '==');

        const matchingDocuments = documents.filter(
          (document) => document.allocationId === value,
        );

        return {
          async get() {
            return {
              docs: matchingDocuments.map((document) => ({
                data: () => document,
              })),
            };
          },
        };
      },
    }),
  } as unknown as Firestore;

  const repository =
    new FirestoreAllocationConsumptionRepository(db);

  const result =
    await repository.getByAllocationId('allocation-1');

  assert.deepEqual(result, [
    documents[0],
    documents[1],
  ]);
});
