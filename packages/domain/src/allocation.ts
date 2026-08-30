import type { Money } from './money.js';

export type AllocationStatus = 'active' | 'closed';

export interface Allocation {
  readonly id: string;
  readonly sourceId: string;
  readonly name: string;
  readonly purpose: string;
  readonly amount: Money;
  readonly status: AllocationStatus;
}
