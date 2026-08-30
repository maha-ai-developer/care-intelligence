import assert from 'node:assert/strict';
import test from 'node:test';

import {
  addMoney,
  money,
  subtractMoney,
} from '../src/money.js';

test('creates INR money using minor units', () => {
  const value = money(100_000n);

  assert.equal(value.amountMinor, 100_000n);
  assert.equal(value.currency, 'INR');
});

test('adds money', () => {
  const result = addMoney(
    money(100_000n),
    money(18_000n),
  );

  assert.equal(result.amountMinor, 118_000n);
});

test('subtracts money', () => {
  const result = subtractMoney(
    money(100_000n),
    money(18_000n),
  );

  assert.equal(result.amountMinor, 82_000n);
});

test('rejects negative money', () => {
  assert.throws(
    () => money(-1n),
    /Money amount cannot be negative/,
  );
});

test('rejects subtracting more than available', () => {
  assert.throws(
    () => subtractMoney(money(100n), money(200n)),
    /Money result cannot be negative/,
  );
});

