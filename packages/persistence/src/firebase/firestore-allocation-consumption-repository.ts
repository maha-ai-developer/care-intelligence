import type { Firestore } from 'firebase-admin/firestore';

import type { AllocationConsumption } from '../../../domain/src/allocation-consumption.js';
import type { AllocationConsumptionRepository } from '../repositories/allocation-consumption-repository.js';

import type { AllocationConsumptionDocument } from '../firestore/documents.js';
import {
  allocationConsumptionFromDocument,
  allocationConsumptionToDocument,
} from '../firestore/mappers.js';

export class FirestoreAllocationConsumptionRepository
  implements AllocationConsumptionRepository
{
  private readonly collection;

  constructor(db: Firestore) {
    this.collection = db.collection('allocation-consumptions');
  }

  async getById(id: string): Promise<AllocationConsumption | null> {
    const snapshot = await this.collection.doc(id).get();

    if (!snapshot.exists) {
      return null;
    }

    const document =
      snapshot.data() as AllocationConsumptionDocument;

    return allocationConsumptionFromDocument(document);
  }

  async getByAllocationId(
    allocationId: string,
  ): Promise<readonly AllocationConsumption[]> {
    const snapshot = await this.collection
      .where('allocationId', '==', allocationId)
      .get();

    return snapshot.docs.map((document) =>
      allocationConsumptionFromDocument(
        document.data() as AllocationConsumptionDocument,
      ),
    );
  }

  async save(
    consumption: AllocationConsumption,
  ): Promise<void> {
    const document =
      allocationConsumptionToDocument(consumption);

    await this.collection.doc(consumption.id).set(document);
  }
}
