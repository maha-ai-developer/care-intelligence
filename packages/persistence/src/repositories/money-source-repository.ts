import type { MoneySource } from '../../../domain/src/money-source.js';

export interface MoneySourceRepository {
  getById(id: string): Promise<MoneySource | null>;
  save(source: MoneySource): Promise<void>;
}
