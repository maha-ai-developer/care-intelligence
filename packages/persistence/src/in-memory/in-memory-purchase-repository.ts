import type { Purchase } from '../../../domain/src/purchase.js';
import type { PurchaseRepository } from '../repositories/purchase-repository.js';

export class InMemoryPurchaseRepository implements PurchaseRepository {
  private readonly purchases = new Map<string, Purchase>();

  async getById(id: string): Promise<Purchase | null> {
    return this.purchases.get(id) ?? null;
  }

  async save(purchase: Purchase): Promise<void> {
    this.purchases.set(purchase.id, purchase);
  }
}
