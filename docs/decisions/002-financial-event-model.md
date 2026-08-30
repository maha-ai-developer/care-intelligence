# ADR 002 — Separate Financial Events from Purchases

## Status

Accepted

## Context

The application needs to represent advances, purchases, refunds, and other financial activity.

Treating all of these as a single generic expense record creates ambiguity.

For example:

```text
₹1,000 advance to hotel
```

does not necessarily mean:

```text
₹1,000 food consumed
```

The system therefore needs a model that distinguishes allocation from actual purchase.

## Decision

Represent these concepts separately:

```text
Money Movement
Allocation
Purchase
Purchase Item
Allocation Consumption
Adjustment
```

## Example

```text
Money Source
     │
     ▼
Money Movement
₹1,000
     │
     ▼
Allocation
Food / Hotel A
₹1,000
     │
     ├──────────────┐
     ▼              ▼
Purchase          Purchase
₹180              ₹220
     │
     ▼
Allocation Consumption
₹400 total
```

Remaining allocation:

```text
₹1,000 - ₹400 = ₹600
```

## Why

This model provides:

* accurate balances
* clear financial semantics
* support for multiple funding sources
* auditability
* deterministic calculations
* better AI reasoning

## Rejected Alternative

### One Expense Record

```text
expense:
  amount: 1000
  category: food
```

Rejected because it cannot accurately distinguish:

```text
advance
purchase
consumption
refund
```

## Consequence

The domain model becomes slightly more complex, but the additional structure provides a much stronger foundation for analytics, AI, and future agentic workflows.

## Principle

> **Model real-world financial events explicitly rather than collapsing them into a single expense abstraction.**
