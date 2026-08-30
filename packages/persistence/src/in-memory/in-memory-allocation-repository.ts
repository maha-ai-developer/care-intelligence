import type { Allocation } from '../../../domain/src/allocation.js';
import type { AllocationRepository } from '../repositories/allocation-repository.js';

export class InMemoryAllocationRepository implements AllocationRepository {
  private readonly allocations = new Map<string, Allocation>();

  async getById(id: string): Promise<Allocation | null> {
    return this.allocations.get(id) ?? null;
  }

  async save(allocation: Allocation): Promise<void> {
    this.allocations.set(allocation.id, allocation);
  }
}
