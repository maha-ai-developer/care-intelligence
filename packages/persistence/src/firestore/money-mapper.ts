import type { Money } from '../../../domain/src/money.js';
import type { MoneyDocument } from './documents.js';

export function moneyToDocument(
  value: Money,
): MoneyDocument {
  return {
    amountMinor: value.amountMinor.toString(),
    currency: value.currency,
  };
}

export function moneyFromDocument(
  document: MoneyDocument,
): Money {
  return {
    amountMinor: BigInt(document.amountMinor),
    currency: document.currency,
  };
}
