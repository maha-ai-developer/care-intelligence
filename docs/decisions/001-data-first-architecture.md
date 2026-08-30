# ADR 001 — Data-First Intelligent Architecture

## Status

Accepted

## Context

Care Intelligence will use AI to interact with personal caregiving and financial information.

A traditional application could implement:

```text
UI → CRUD API → Database
```

However, the goal is to support natural-language interaction, AI-assisted ingestion, analytics, and future agentic workflows.

## Decision

Use a data-first architecture:

```text
User
 ↓
AI / Web Interface
 ↓
AI Application Layer
 ↓
MCP / Domain Tools
 ↓
Domain Services
 ↓
Firestore
```

The database remains the source of truth.

AI accesses application capabilities through controlled tools.

## Reasons

### 1. Reliability

Financial facts should not depend on model memory.

### 2. Testability

Tools and domain operations can be tested independently from the LLM.

### 3. Security

Sensitive operations can enforce authorization and validation.

### 4. Evolvability

The web interface and AI interface can evolve independently.

### 5. Observability

Tool calls and domain operations can be logged and evaluated.

## Consequence

The architecture requires additional boundaries:

```text
LLM
 ↓
Tool contract
 ↓
Validation
 ↓
Authorization
 ↓
Domain logic
 ↓
Persistence
```

This is more work than direct database access but provides a stronger foundation for an intelligent system.

## Rejected Alternative

### LLM → Direct Firestore

Rejected because it creates excessive coupling between the model and persistence layer and makes authorization, validation, testing, and auditing harder.

## Principle

> AI should operate the system through capabilities, not through unrestricted access to storage.
