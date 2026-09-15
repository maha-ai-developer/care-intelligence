import type { Firestore } from 'firebase-admin/firestore';

import type { Purchase } from '../../../domain/src/purchase.js';
import type { PurchaseRepository } from '../repositories/purchase-repository.js';

import type { PurchaseDocument } from '../firestore/documents.js';
import {
  purchaseFromDocument,
  purchaseToDocument,
} from '../firestore/mappers.js';

export class FirestorePurchaseRepository
  implements PurchaseRepository
{
  private readonly collection;

  constructor(db: Firestore) {
    this.collection = db.collection('purchases');
  }

  async getById(id: string): Promise<Purchase | null> {
    const snapshot = await this.collection.doc(id).get();

    if (!snapshot.exists) {
      return null;
    }

    const document = snapshot.data() as PurchaseDocument;

    return purchaseFromDocument(document);
  }

  async save(purchase: Purchase): Promise<void> {
    const document = purchaseToDocument(purchase);

    await this.collection.doc(purchase.id).set(document);
  }
}
