# Domain Model

## Purpose

Define the real-world concepts that Care Intelligence needs to represent.

The domain model comes before the database schema.

## Core Entities

```text
Person
Care Case
Money Source
Advance
Vendor
Transaction
Purchase
Item
Document
```

## Relationships

```text
Money Source
     │
     ▼
   Advance
     │
     ▼
   Vendor
     │
     ▼
 Purchase
     │
     ├── Item
     ├── Quantity
     ├── Unit
     └── Price
```

## Money Source

Represents where money comes from.

Examples:

```text
Salary
Family contribution
Savings
Other source
```

Attributes:

```text
id
name
description
createdAt
```

## Advance

Represents money given in advance to a vendor or service provider.

Attributes:

```text
id
vendorId
amount
currency
date
purpose
status
```

An advance is not necessarily an expense at the moment it is created.

It represents allocated money.

## Purchase

Represents something actually purchased.

Attributes:

```text
id
vendorId
date
category
totalAmount
currency
source
```

## Purchase Item

Represents an individual item within a purchase.

Attributes:

```text
id
purchaseId
itemId
quantity
unit
unitPrice
totalPrice
```

## Item

Represents a reusable concept such as:

```text
Rice meal
Idli
Curd
Adult diaper
Medicine
```

Attributes:

```text
id
name
category
defaultUnit
```

## Vendor

Represents a hotel, shop, pharmacy, or other provider.

Attributes:

```text
id
name
type
contact
```

## Document

Represents an uploaded source document.

Examples:

```text
Receipt
Bill
Invoice
Image
PDF
```

Attributes:

```text
id
storagePath
documentType
uploadedAt
source
extractionStatus
```

## Transaction

Represents a financial movement.

```text
Transaction
├── income
├── advance
├── purchase
├── refund
└── adjustment
```

This provides a common financial event model while allowing domain-specific entities to retain their meaning.

## Important Distinction

The system should distinguish:

```text
Money movement
        ≠
Purchase
        ≠
Consumption
```

For example:

```text
₹1,000 advance
       ↓
Money allocated

₹300 purchases
       ↓
Money consumed through purchases

₹700
       ↓
Remaining allocation
```

This distinction is important for accurate accounting and future intelligence.
