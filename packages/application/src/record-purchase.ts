import type { AllocationConsumption } from '../../domain/src/allocation-consumption.js';
import { calculatePurchaseTotal } from '../../domain/src/purchase-total.js';
import type { AllocationRepository } from '../../persistence/src/repositories/allocation-repository.js';
import type { AllocationConsumptionRepository } from '../../persistence/src/repositories/allocation-consumption-repository.js';
import type { PurchaseRepository } from '../../persistence/src/repositories/purchase-repository.js';
import type { Purchase } from '../../domain/src/purchase.js';
import type { PurchaseItem } from '../../domain/src/purchase-item.js';

export interface RecordPurchaseInput {
  readonly purchase: Purchase;
  readonly items: readonly PurchaseItem[];
}

export class RecordPurchase {
  constructor(
    private readonly allocationRepository: AllocationRepository,
    private readonly purchaseRepository: PurchaseRepository,
    private readonly allocationConsumptionRepository: AllocationConsumptionRepository,
  ) {}

  async execute(input: RecordPurchaseInput): Promise<void> {
    const allocation = await this.allocationRepository.getById(
      input.purchase.allocationId,
    );

    if (allocation === null) {
      throw new Error('Allocation not found');
    }

    if (allocation.status !== 'active') {
      throw new Error('Allocation is not active');
    }

    const calculatedTotal = calculatePurchaseTotal(input.items);

    if (
      calculatedTotal.currency !== input.purchase.total.currency ||
      calculatedTotal.amountMinor !== input.purchase.total.amountMinor
    ) {
      throw new Error('Purchase total does not match purchase items');
    }

    const consumption: AllocationConsumption = {
      id: `consumption-for-${input.purchase.id}`,
      allocationId: allocation.id,
      purchaseId: input.purchase.id,
      amount: input.purchase.total,
      consumedAt: input.purchase.purchasedAt,
    };

    await this.purchaseRepository.save(input.purchase);
    await this.allocationConsumptionRepository.save(consumption);
  }
}
