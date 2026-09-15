import type { Firestore } from 'firebase-admin/firestore';

import type { MoneySource } from '../../../domain/src/money-source.js';
import type { MoneySourceRepository } from '../repositories/money-source-repository.js';

import type { MoneySourceDocument } from '../firestore/documents.js';
import {
  moneySourceFromDocument,
  moneySourceToDocument,
} from '../firestore/mappers.js';

export class FirestoreMoneySourceRepository
  implements MoneySourceRepository
{
  private readonly collection;

  constructor(db: Firestore) {
    this.collection = db.collection('moneySources');
  }

  async getById(id: string): Promise<MoneySource | null> {
    const snapshot = await this.collection.doc(id).get();

    if (!snapshot.exists) {
      return null;
    }

    const document = snapshot.data() as MoneySourceDocument;

    return moneySourceFromDocument(document);
  }

  async save(source: MoneySource): Promise<void> {
    const document = moneySourceToDocument(source);

    await this.collection.doc(source.id).set(document);
  }
}
