import type { AllocationConsumption } from '../../../domain/src/allocation-consumption.js';

export interface AllocationConsumptionRepository {
  getById(id: string): Promise<AllocationConsumption | null>;
  save(consumption: AllocationConsumption): Promise<void>;
}
