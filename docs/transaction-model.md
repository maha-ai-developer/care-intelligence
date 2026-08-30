# Transaction Model

## Purpose

Define how Care Intelligence represents movement and use of money.

The system must distinguish between:

```text
Money movement
Allocation
Purchase
Consumption
```

These concepts may be related, but they are not identical.

---

## 1. Money Movement

A money movement represents money entering or leaving the financial system.

Examples:

```text
₹10,000 received from family
₹1,000 transferred to hotel
₹500 refunded by vendor
```

A movement answers:

> What happened to the money?

---

## 2. Allocation

An allocation represents money reserved for a particular purpose.

Example:

```text
₹1,000
Purpose: Food
Vendor: Hotel A
```

The ₹1,000 has been allocated, but it does not necessarily mean ₹1,000 of food has already been consumed.

---

## 3. Purchase

A purchase represents something actually bought.

Example:

```text
Vendor: Hotel A
Category: Food
Total: ₹180
```

A purchase answers:

> What did we actually buy?

---

## 4. Purchase Items

A purchase can contain multiple items.

Example:

```text
Purchase
₹180

├── Meals
│   quantity: 2
│   unit price: ₹80
│   total: ₹160
│
└── Curd
    quantity: 1
    unit price: ₹20
    total: ₹20
```

---

## 5. Allocation Consumption

When a purchase is paid from an allocation, the purchase consumes part of that allocation.

Example:

```text
Allocation
₹1,000
   │
   ├── Purchase ₹180
   ├── Purchase ₹220
   └── Purchase ₹150
```

Remaining:

```text
₹1,000 - ₹550 = ₹450
```

---

## 6. Important Invariant

The system should never calculate remaining allocation from manually entered balance values.

Instead:

```text
remaining
=
allocated
-
consumed
+
refunds
+
adjustments
```

This makes the balance reproducible.

---

## 7. Example

Initial allocation:

```text
₹1,000
```

Purchase 1:

```text
₹180
```

Purchase 2:

```text
₹220
```

Purchase 3:

```text
₹150
```

Then:

```text
Allocated       ₹1,000
Consumed          ₹550
----------------------
Remaining         ₹450
```

The system should derive ₹450.

---

## 8. Partial Allocation

A purchase may potentially be funded by more than one source.

Example:

```text
Purchase = ₹500

Food allocation = ₹300
General funds   = ₹200
```

Therefore, allocation and purchase should not be permanently coupled one-to-one.

A future allocation-consumption record can represent:

```text
Purchase
   │
   ├── Allocation A → ₹300
   └── Allocation B → ₹200
```

---

## 9. Refunds

A refund should reverse the appropriate financial effect.

Example:

```text
Allocation: ₹1,000
Purchase: ₹200
Refund: ₹50
```

Net consumption:

```text
₹200 - ₹50 = ₹150
```

Remaining:

```text
₹1,000 - ₹150 = ₹850
```

---

## 10. Corrections

Historical financial records should preferably be corrected through explicit adjustments rather than silently overwritten.

Example:

```text
Original purchase: ₹200

Correction:
Adjustment: -₹20

Effective amount: ₹180
```

This creates an audit-friendly history.

---

## 11. Design Principle

The model should preserve the distinction:

```text
WHERE DID THE MONEY COME FROM?
        ↓
Money Source

WHERE DID THE MONEY GO?
        ↓
Money Movement

WHAT WAS RESERVED?
        ↓
Allocation

WHAT WAS ACTUALLY BOUGHT?
        ↓
Purchase

WHAT ITEMS WERE INCLUDED?
        ↓
Purchase Items

WHICH ALLOCATION PAID FOR IT?
        ↓
Allocation Consumption
```

This separation provides the foundation for reliable financial reasoning and future AI queries.
