import type { Purchase } from '../../../domain/src/purchase.js';

export interface PurchaseRepository {
  getById(id: string): Promise<Purchase | null>;
  save(purchase: Purchase): Promise<void>;
}
