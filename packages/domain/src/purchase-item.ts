import type { Money } from './money.js';

export type QuantityUnit =
  | 'unit'
  | 'kg'
  | 'g'
  | 'litre'
  | 'ml'
  | 'pack';

export interface PurchaseItem {
  readonly id: string;
  readonly purchaseId: string;
  readonly name: string;
  readonly quantity: number;
  readonly unit: QuantityUnit;
  readonly unitPrice: Money;
  readonly totalPrice: Money;
}
