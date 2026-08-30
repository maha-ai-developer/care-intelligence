import type { MoneySource } from '../../../domain/src/money-source.js';
import type { MoneySourceRepository } from '../repositories/money-source-repository.js';

export class InMemoryMoneySourceRepository implements MoneySourceRepository {
  private readonly sources = new Map<string, MoneySource>();

  async getById(id: string): Promise<MoneySource | null> {
    return this.sources.get(id) ?? null;
  }

  async save(source: MoneySource): Promise<void> {
    this.sources.set(source.id, source);
  }
}
