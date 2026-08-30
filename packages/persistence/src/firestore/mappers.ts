import type {
  Allocation,
  AllocationConsumption,
  MoneySource,
  Purchase,
  PurchaseItem,
} from '../../../domain/src/index.js';

import {
  moneyFromDocument,
  moneyToDocument,
} from './money-mapper.js';

import type {
  AllocationConsumptionDocument,
  AllocationDocument,
  MoneySourceDocument,
  PurchaseDocument,
  PurchaseItemDocument,
} from './documents.js';

export function moneySourceToDocument(
  source: MoneySource,
): MoneySourceDocument {
  return {
    id: source.id,
    name: source.name,
    ...(source.description === undefined
      ? {}
      : { description: source.description }),
  };
}

export function allocationToDocument(
  allocation: Allocation,
): AllocationDocument {
  return {
    id: allocation.id,
    sourceId: allocation.sourceId,
    name: allocation.name,
    purpose: allocation.purpose,
    amount: moneyToDocument(allocation.amount),
    status: allocation.status,
  };
}

export function purchaseToDocument(
  purchase: Purchase,
): PurchaseDocument {
  return {
    id: purchase.id,
    allocationId: purchase.allocationId,
    purchasedAt: purchase.purchasedAt,
    vendorName: purchase.vendorName,
    category: purchase.category,
    total: moneyToDocument(purchase.total),
    status: purchase.status,
  };
}

export function purchaseItemToDocument(
  item: PurchaseItem,
): PurchaseItemDocument {
  return {
    id: item.id,
    purchaseId: item.purchaseId,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    unitPrice: moneyToDocument(item.unitPrice),
    totalPrice: moneyToDocument(item.totalPrice),
  };
}

export function allocationConsumptionToDocument(
  consumption: AllocationConsumption,
): AllocationConsumptionDocument {
  return {
    id: consumption.id,
    allocationId: consumption.allocationId,
    purchaseId: consumption.purchaseId,
    amount: moneyToDocument(consumption.amount),
    consumedAt: consumption.consumedAt,
  };
}

export function allocationFromDocument(
  document: AllocationDocument,
): Allocation {
  return {
    id: document.id,
    sourceId: document.sourceId,
    name: document.name,
    purpose: document.purpose,
    amount: moneyFromDocument(document.amount),
    status: document.status,
  };
}

export function purchaseFromDocument(
  document: PurchaseDocument,
): Purchase {
  return {
    id: document.id,
    allocationId: document.allocationId,
    purchasedAt: document.purchasedAt,
    vendorName: document.vendorName,
    category: document.category,
    total: moneyFromDocument(document.total),
    status: document.status,
  };
}

export function purchaseItemFromDocument(
  document: PurchaseItemDocument,
): PurchaseItem {
  return {
    id: document.id,
    purchaseId: document.purchaseId,
    name: document.name,
    quantity: document.quantity,
    unit: document.unit,
    unitPrice: moneyFromDocument(document.unitPrice),
    totalPrice: moneyFromDocument(document.totalPrice),
  };
}

export function allocationConsumptionFromDocument(
  document: AllocationConsumptionDocument,
): AllocationConsumption {
  return {
    id: document.id,
    allocationId: document.allocationId,
    purchaseId: document.purchaseId,
    amount: moneyFromDocument(document.amount),
    consumedAt: document.consumedAt,
  };
}
