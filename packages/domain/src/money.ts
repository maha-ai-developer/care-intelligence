export type Currency = 'INR';

export interface Money {
  readonly amountMinor: bigint;
  readonly currency: Currency;
}

export function money(
  amountMinor: bigint,
  currency: Currency = 'INR',
): Money {
  if (amountMinor < 0n) {
    throw new Error('Money amount cannot be negative');
  }

  return {
    amountMinor,
    currency,
  };
}

export function addMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);

  return {
    amountMinor: left.amountMinor + right.amountMinor,
    currency: left.currency,
  };
}

export function subtractMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);

  const result = left.amountMinor - right.amountMinor;

  if (result < 0n) {
    throw new Error('Money result cannot be negative');
  }

  return {
    amountMinor: result,
    currency: left.currency,
  };
}

export function assertSameCurrency(
  left: Money,
  right: Money,
): void {
  if (left.currency !== right.currency) {
    throw new Error(
      `Currency mismatch: ${left.currency} vs ${right.currency}`,
    );
  }
}
