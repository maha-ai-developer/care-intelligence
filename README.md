# Care Intelligence

> An AI-native personal caregiving intelligence system for managing care finances, purchases, documents, and operational data through natural language.

🚧 **Status: Building**

## Why this project exists

Caregiving creates a continuous stream of small but important decisions.

Money comes from different sources. Advances are paid to vendors. Food and supplies are purchased repeatedly. Bills and receipts accumulate. Over time, it becomes difficult to understand where money went, what was purchased, and what remains.

**Care Intelligence** is being built from that real-world problem.

The goal is not to build another traditional CRUD expense tracker.

The goal is to build a **data-centric intelligent system** where structured caregiving data becomes the source of truth and AI becomes the natural interface for querying, analyzing, and operating on that data.

---

## Vision

```text
Human
  │
  ▼
Natural Language / Web Interface
  │
  ▼
AI Reasoning Layer
  │
  ▼
MCP Tools + Domain Services
  │
  ▼
Validated Structured Data
  │
  ├── Firestore
  │
  └── Firebase Storage
```

The long-term vision is a personal caregiving intelligence layer that can:

* understand caregiving data
* track money and expenses
* understand purchases
* process bills and receipts
* answer questions
* generate dashboards
* identify useful patterns
* generate reports
* support agentic workflows

---

# First Use Case

The first version focuses on recurring caregiving finance and food-purchase tracking.

Example:

```text
Food advance
₹1,000
   │
   ▼
Daily purchases
   │
   ▼
Items + quantities + prices
   │
   ▼
Automatic balance
   │
   ▼
Historical data
   │
   ▼
AI analysis
```

Instead of manually maintaining a spreadsheet, the system should understand the underlying transactions.

For example:

> "Today I bought two meals and one curd for ₹180."

The system should convert this into structured information:

```text
Date
Category
Vendor
Items
Quantity
Unit
Price
Payment
Source
```

---

# AI-Native Interaction

The user should be able to interact with the system naturally.

### Example

> How much did I spend on food this month?

The system:

```text
Understand intent
       ↓
Query data
       ↓
Aggregate transactions
       ↓
Analyze
       ↓
Generate response
```

Another question:

> Compare food expenses this month with last month.

The system should produce the appropriate analysis.

Another:

> Create a dashboard showing my caregiving expenses.

The AI should determine the useful:

* metrics
* tables
* charts
* comparisons
* trends

and construct the response dynamically.

---

# Core Architectural Principle

> **The database is the source of truth. AI is an intelligent interface over the data.**

AI should not become the database.

Financial and other sensitive mutations should pass through:

```text
AI
 ↓
Typed Tool
 ↓
Validation
 ↓
Authorization
 ↓
Domain Logic
 ↓
Database
 ↓
Audit Trail
```

This creates a safer and more predictable architecture.

---

# System Architecture

```text
                         USER
                           │
             ┌─────────────┴─────────────┐
             │                           │
       Natural Language              Web UI
             │                           │
             └─────────────┬─────────────┘
                           ▼
                  AI Application Layer
                           │
                           ▼
                     Gemini Model
                           │
              ┌────────────┴────────────┐
              │                         │
           Reasoning                  Tools
              │                         │
              └────────────┬────────────┘
                           ▼
                       MCP Server
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
          Domain Services        Retrieval
                 │                   │
                 └─────────┬─────────┘
                           ▼
                       Data Layer
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
             Firestore          Firebase Storage
          structured data       bills / receipts
```

---

# Initial Domain

```text
Care
│
├── Income Sources
│
├── Advances
│
├── Expenses
│
├── Purchases
│
├── Items
│
├── Vendors
│
├── Documents
│
└── Reports
```

The domain model will evolve based on actual usage.

---

# Planned AI Capabilities

## Natural Language Data Entry

```text
"Bought 2 meals for ₹180 today."
```

→ structured transaction.

## Document Understanding

Upload:

```text
Receipt
Bill
Image
Document
```

→ extract structured information.

## Classification

Automatically identify:

```text
Food
Medicine
Diaper
Transport
Household
Other
```

## Querying

Ask questions directly against the data.

## Analytics

Generate:

```text
Daily
Weekly
Monthly
Category
Vendor
Item
Trend
```

analysis.

## Dynamic Dashboards

The dashboard should eventually be **question-driven rather than page-driven**.

---

# MCP Architecture

The MCP server will expose controlled application capabilities to the AI system.

Example tools:

```text
get_expenses()
get_income_sources()
get_food_purchases()
get_remaining_advance()
get_items()
get_monthly_summary()
search_transactions()

create_transaction()
update_transaction()

generate_report()
```

The exact tool contracts will evolve as the domain model becomes clearer.

---

# Technology Direction

### Application

* TypeScript
* Next.js

### Backend / Cloud

* Firebase
* Cloud Firestore
* Firebase Storage
* Firebase Authentication
* Firebase Hosting
* Cloud Functions / Cloud Run where appropriate

### AI

* Gemini API
* Structured outputs
* Tool calling
* Document understanding
* Agentic workflows

### AI Integration

* MCP
* Domain tools
* Retrieval
* Evaluation

---

# Repository Structure

```text
care-intelligence/
│
├── README.md
│
├── docs/
│   ├── vision.md
│   ├── architecture.md
│   ├── domain-model.md
│   ├── data-model.md
│   ├── ai-architecture.md
│   ├── mcp-architecture.md
│   └── decisions/
│
├── apps/
│   └── web/
│
├── services/
│   ├── ai/
│   ├── mcp/
│   └── data/
│
├── packages/
│   ├── domain/
│   ├── schemas/
│   └── ui/
│
├── firestore/
│   └── schema/
│
├── evaluation/
│   ├── datasets/
│   ├── scenarios/
│   └── results/
│
└── experiments/
    ├── receipt-extraction/
    ├── natural-language-entry/
    ├── expense-classification/
    └── dashboard-generation/
```

---

# Proof of Work

This repository is also part of my AI engineering portfolio.

The goal is to demonstrate the progression:

```text
Software Engineering
        ↓
Data Modeling
        ↓
Cloud Systems
        ↓
Machine Learning
        ↓
LLM Engineering
        ↓
RAG
        ↓
Tool Calling
        ↓
Agents
        ↓
MCP
        ↓
Intelligent Systems
        ↓
Production AI
```

Each major implementation should answer:

* What problem am I solving?
* Why this design?
* What alternatives did I consider?
* What assumptions am I making?
* How does the system fail?
* How do I evaluate it?
* What did I learn?

The repository therefore documents not only the final application, but the **engineering reasoning behind it**.

---

# Development Roadmap

## Phase 0 — Foundations

* [x] Create repository
* [x] Define project vision
* [ ] Define domain model
* [ ] Define data contracts
* [ ] Document architecture

## Phase 1 — Data System

* [ ] Firestore schema
* [ ] Transaction model
* [ ] Expense model
* [ ] Advance model
* [ ] Item model
* [ ] Vendor model
* [ ] Document model
* [ ] Validation

## Phase 2 — Web Application

* [ ] Next.js application
* [ ] Authentication
* [ ] Transaction entry
* [ ] Advance tracking
* [ ] Expense history
* [ ] Basic dashboard

## Phase 3 — AI Ingestion

* [ ] Natural-language transaction extraction
* [ ] Receipt understanding
* [ ] Bill extraction
* [ ] Structured output validation
* [ ] Human review

## Phase 4 — MCP

* [ ] MCP server
* [ ] Read tools
* [ ] Search tools
* [ ] Safe write tools
* [ ] Tool schemas
* [ ] Authorization

## Phase 5 — AI Interface

* [ ] Gemini integration
* [ ] Natural-language queries
* [ ] Conversational analytics
* [ ] Dynamic tables
* [ ] Dynamic charts
* [ ] Report generation

## Phase 6 — Evaluation

* [ ] Evaluation datasets
* [ ] Agent scenarios
* [ ] Tool-call evaluation
* [ ] Extraction accuracy
* [ ] Regression tests

## Phase 7 — Production

* [ ] Security hardening
* [ ] Audit trail
* [ ] Observability
* [ ] Cost controls
* [ ] Backup / recovery
* [ ] Production deployment

---

# Privacy

Caregiving and financial data can be highly sensitive.

The system should therefore follow:

```text
Least privilege
Authentication
Authorization
Validated writes
Audit history
Secret management
Private storage
Data minimization
```

Secrets and credentials must never be committed to Git.

This project is a personal software system and is **not a medical diagnosis system**.

---

# Development Environment

Primary development environment:

```text
Linux / Debian
Git
Node.js
TypeScript
Firebase
Gemini API
```

Clone:

```bash
git clone https://github.com/maha-ai-developer/care-intelligence.git
cd care-intelligence
```

---

# Project Status

🚧 **Actively building**

This project starts from a real caregiving problem and evolves toward a production-oriented intelligent system.

---

## Author

**Maha**

AI Engineering • Intelligent Systems • Data • First-Principles Thinking
