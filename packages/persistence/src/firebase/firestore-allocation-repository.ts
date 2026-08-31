import type { Firestore } from 'firebase-admin/firestore';

import type { Allocation } from '../../../domain/src/allocation.js';
import type { AllocationRepository } from '../repositories/allocation-repository.js';

import type { AllocationDocument } from '../firestore/documents.js';
import {
  allocationFromDocument,
  allocationToDocument,
} from '../firestore/mappers.js';

export class FirestoreAllocationRepository
  implements AllocationRepository
{
  private readonly collection;

  constructor(db: Firestore) {
    this.collection = db.collection('allocations');
  }

  async getById(id: string): Promise<Allocation | null> {
    const snapshot = await this.collection.doc(id).get();

    if (!snapshot.exists) {
      return null;
    }

    const document = snapshot.data() as AllocationDocument;

    return allocationFromDocument(document);
  }

  async save(allocation: Allocation): Promise<void> {
    const document = allocationToDocument(allocation);

    await this.collection.doc(allocation.id).set(document);
  }
}
