import type { Allocation } from './allocation.js';
import type { AllocationConsumption } from './allocation-consumption.js';
import { money, subtractMoney } from './money.js';

export function calculateRemainingAllocation(
  allocation: Allocation,
  consumptions: readonly AllocationConsumption[],
) {
  let remaining = money(
    allocation.amount.amountMinor,
    allocation.amount.currency,
  );

  for (const consumption of consumptions) {
    remaining = subtractMoney(remaining, consumption.amount);
  }

  return remaining;
}
