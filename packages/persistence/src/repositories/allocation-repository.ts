import type { Allocation } from '../../../domain/src/allocation.js';

export interface AllocationRepository {
  getById(id: string): Promise<Allocation | null>;
  save(allocation: Allocation): Promise<void>;
}
