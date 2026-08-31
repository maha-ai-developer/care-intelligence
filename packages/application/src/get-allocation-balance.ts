import { calculateRemainingAllocation } from '../../domain/src/allocation-balance.js';
import type { AllocationRepository } from '../../persistence/src/repositories/allocation-repository.js';
import type { AllocationConsumptionRepository } from '../../persistence/src/repositories/allocation-consumption-repository.js';

export class GetAllocationBalance {
  constructor(
    private readonly allocationRepository: AllocationRepository,
    private readonly allocationConsumptionRepository: AllocationConsumptionRepository,
  ) {}

  async execute(allocationId: string) {
    const allocation =
      await this.allocationRepository.getById(allocationId);

    if (allocation === null) {
      throw new Error('Allocation not found');
    }

    const consumptions =
      await this.allocationConsumptionRepository.getByAllocationId(
        allocationId,
      );

    return calculateRemainingAllocation(
      allocation,
      consumptions,
    );
  }
}
