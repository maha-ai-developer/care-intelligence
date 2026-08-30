import type {
  Allocation,
  AllocationConsumption,
  MoneySource,
  Purchase,
  PurchaseItem,
} from '../../../domain/src/index.js';

export interface MoneyDocument {
  readonly amountMinor: string;
  readonly currency: 'INR';
}

export interface MoneySourceDocument {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
}

export interface AllocationDocument {
  readonly id: string;
  readonly sourceId: string;
  readonly name: string;
  readonly purpose: string;
  readonly amount: MoneyDocument;
  readonly status: Allocation['status'];
}

export interface PurchaseDocument {
  readonly id: string;
  readonly allocationId: string;
  readonly purchasedAt: string;
  readonly vendorName: string;
  readonly category: string;
  readonly total: MoneyDocument;
  readonly status: Purchase['status'];
}

export interface PurchaseItemDocument {
  readonly id: string;
  readonly purchaseId: string;
  readonly name: string;
  readonly quantity: number;
  readonly unit: PurchaseItem['unit'];
  readonly unitPrice: MoneyDocument;
  readonly totalPrice: MoneyDocument;
}

export interface AllocationConsumptionDocument {
  readonly id: string;
  readonly allocationId: string;
  readonly purchaseId: string;
  readonly amount: MoneyDocument;
  readonly consumedAt: string;
}

export type DomainDocument =
  | MoneySourceDocument
  | AllocationDocument
  | PurchaseDocument
  | PurchaseItemDocument
  | AllocationConsumptionDocument;

export type DomainEntity =
  | MoneySource
  | Allocation
  | Purchase
  | PurchaseItem
  | AllocationConsumption;
