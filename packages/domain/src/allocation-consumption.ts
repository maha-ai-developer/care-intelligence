import type { Money } from './money.js';

export interface AllocationConsumption {
  readonly id: string;
  readonly allocationId: string;
  readonly purchaseId: string;
  readonly amount: Money;
  readonly consumedAt: string;
}
