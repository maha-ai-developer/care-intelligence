# Data Model

## Design Principle

The data model should represent facts clearly and avoid storing AI interpretations as if they were facts.

```text
Source data
    ↓
Validated data
    ↓
Derived information
    ↓
AI interpretation
```

These layers should remain distinguishable.

## Initial Collections

```text
users
care_cases
money_sources
vendors
advances
transactions
purchases
items
purchase_items
documents
```

## Example Purchase

```json
{
  "id": "purchase_001",
  "vendorId": "vendor_hotel_01",
  "date": "2026-08-30",
  "category": "food",
  "totalAmount": 180,
  "currency": "INR"
}
```

## Example Purchase Item

```json
{
  "purchaseId": "purchase_001",
  "itemId": "item_meal",
  "quantity": 2,
  "unit": "plate",
  "unitPrice": 80,
  "totalPrice": 160
}
```

## Example Advance

```json
{
  "id": "advance_001",
  "vendorId": "vendor_hotel_01",
  "amount": 1000,
  "currency": "INR",
  "purpose": "food",
  "status": "active"
}
```

## Derived Balance

The remaining advance should be derived rather than manually maintained wherever practical.

```text
remaining balance

= total advances
- purchases allocated to advances
+ refunds
- adjustments
```

The exact accounting rules will be defined before implementation.

## AI Data Boundary

AI-generated information should not silently become trusted financial data.

For example:

```text
Receipt
   ↓
AI extraction
   ↓
Candidate transaction
   ↓
Validation
   ↓
User confirmation / trusted rule
   ↓
Stored transaction
```

This allows the system to preserve provenance.

## Provenance

Important records should eventually carry information such as:

```text
createdBy
createdAt
updatedAt
sourceType
sourceDocumentId
confidence
verified
```

This enables later auditing and evaluation.

## Future Evolution

The initial model should remain intentionally small.

New entities should be introduced when a real use case requires them rather than designing the entire future system upfront.
