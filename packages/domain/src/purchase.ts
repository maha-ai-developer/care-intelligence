import type { Money } from './money.js';

export type PurchaseStatus = 'recorded' | 'voided';

export interface Purchase {
  readonly id: string;
  readonly allocationId: string;
  readonly purchasedAt: string;
  readonly vendorName: string;
  readonly category: string;
  readonly total: Money;
  readonly status: PurchaseStatus;
}
