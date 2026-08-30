import type { AllocationConsumption } from '../../../domain/src/allocation-consumption.js';
import type { AllocationConsumptionRepository } from '../repositories/allocation-consumption-repository.js';

export class InMemoryAllocationConsumptionRepository
  implements AllocationConsumptionRepository
{
  private readonly consumptions = new Map<string, AllocationConsumption>();

  async getById(id: string): Promise<AllocationConsumption | null> {
    return this.consumptions.get(id) ?? null;
  }

  async save(consumption: AllocationConsumption): Promise<void> {
    this.consumptions.set(consumption.id, consumption);
  }
}
