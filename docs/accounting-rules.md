# Accounting Rules

## Purpose

Define deterministic rules for financial calculations in Care Intelligence.

The AI may explain financial information, but core financial calculations must be deterministic.

---

## Rule 1 — Money Is Represented Explicitly

Every monetary value must have:

```text
amount
currency
```

Initial currency:

```text
INR
```

---

## Rule 2 — Allocation Is Not Expense

Giving ₹1,000 as an advance does not automatically mean ₹1,000 was consumed.

```text
₹1,000 allocated
≠
₹1,000 expense
```

The system records the allocation separately.

---

## Rule 3 — Purchase Represents Actual Spending

A purchase becomes spending when the purchase is recorded as completed/valid.

---

## Rule 4 — Remaining Allocation Is Derived

```text
remaining =
total allocated
- total consumed
+ refunds
+ adjustments
```

No manually maintained `remainingBalance` should be treated as the authoritative value.

---

## Rule 5 — Item Totals Must Reconcile

For every purchase:

```text
purchase.total
=
Σ purchase_item.total
```

If the values do not reconcile, the record should be rejected or sent for review.

---

## Rule 6 — Quantity Must Be Explicit

An item should record:

```text
quantity
unit
unitPrice
totalPrice
```

Example:

```text
2 plates × ₹80 = ₹160
```

---

## Rule 7 — Historical Records Should Be Auditable

Important records should preserve:

```text
createdAt
updatedAt
createdBy
source
```

Future versions may add:

```text
verified
verifiedAt
verifiedBy
```

---

## Rule 8 — AI Extraction Is a Proposal

When AI extracts data from a receipt:

```text
Receipt
 ↓
AI extraction
 ↓
Candidate record
 ↓
Validation
 ↓
Confirmation / trusted rule
 ↓
Financial record
```

AI output should not automatically become trusted financial truth without the appropriate validation path.

---

## Rule 9 — Corrections Should Preserve History

Prefer:

```text
Original record
      ↓
Adjustment / correction
```

over silently modifying historical financial facts.

---

## Rule 10 — Financial Calculations Are Deterministic

The LLM should not be responsible for arithmetic.

For example:

```text
₹1,000 - ₹180 - ₹220
```

should be calculated by application logic.

The AI can explain the result:

> Your remaining food allocation is ₹600.

But the number should come from deterministic application logic.

---

## Principle

> **AI interprets financial data; application logic calculates financial truth.**
