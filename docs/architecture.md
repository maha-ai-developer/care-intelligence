# Architecture

## Design Goal

Build a data-centric intelligent system where AI interacts with well-defined application capabilities rather than directly manipulating the database.

## System

```text
User
 ↓
Interface
 ↓
AI Application
 ↓
Gemini
 ↓
MCP / Tools
 ↓
Domain Services
 ↓
Firestore
```

## Data Flow

```text
Input
 ↓
Ingestion
 ↓
Extraction
 ↓
Validation
 ↓
Normalization
 ↓
Persistence
 ↓
Retrieval
 ↓
Reasoning
 ↓
Presentation
```

## Important Boundary

The LLM should not have unrestricted database access.

Instead:

```text
LLM
 ↓
Tool
 ↓
Schema validation
 ↓
Authorization
 ↓
Business rules
 ↓
Database
```

This makes the system observable, testable, and safer.

## Architectural Evolution

The system will evolve incrementally.

```text
V0
Manual data

V1
Structured data

V2
AI-assisted ingestion

V3
AI querying

V4
MCP tools

V5
Agent workflows

V6
Dynamic intelligence
```

Architecture decisions should be documented in:

```text
docs/decisions/
```

using Architecture Decision Records (ADRs).
