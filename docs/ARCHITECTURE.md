# ⚡ SitePulse AI — System Architecture & Technical Design

## 1. High-Level Architecture Overview

SitePulse AI uses a modular architecture combining a web presentation tier, an API gateway with strict schema validation, and an AI intelligence tier powered by Google Gemini 3.5 Flash with a deterministic fallback engine.

```mermaid
flowchart TD
    subgraph Client ["Client Presentation Tier"]
        UI1["Streamlit Live Console (app.py)"]
        UI2["React 18 + Vite Web Application"]
    end

    subgraph Gateway ["API Gateway (FastAPI)"]
        Router["FastAPI Router (/api/v1)"]
        Validation["Pydantic v2 Schema Validation"]
    end

    subgraph Core ["Application Core Services"]
        SafetySvc["Safety Analysis Service (OSHA 1926)"]
        CrackSvc["Crack Diagnostics Service (ACI 318)"]
        PlanSvc["Project Planning Service (CPM / WBS)"]
        ValuationSvc["Real Estate Valuation Engine"]
        SiteLogSvc["Daily Site Assistant & Weather Service"]
        ChatSvc["Construction Knowledge Bot"]
    end

    subgraph Intelligence ["Multimodal AI & Heuristics"]
        GeminiAdapter["Google Gemini 3.5 Flash Pipeline"]
        RuleFallback["Deterministic Engineering Rules"]
    end

    UI1 --> Core
    UI2 --> Router
    Router --> Validation
    Validation --> Core
    Core -->|"API Key Configured"| GeminiAdapter
    Core -->|"Offline or Quota Cooldown"| RuleFallback
    GeminiAdapter --> Validation
    RuleFallback --> Validation
```

---

## 2. Component Breakdown

### A. Presentation Tier
- **Streamlit Console (`app.py`)**: Instant interactive dashboard featuring live camera capture, clipboard image paste (`Ctrl+V`), and 1-click Markdown dossier export.
- **React Frontend (`frontend/`)**: React 18, Vite 5, Tailwind CSS, and Lucide icons providing a modern dark-mode interface with modular tab views.

### B. API Gateway & Validation Layer (`backend/app/api/` & `schemas/`)
- **FastAPI**: Asynchronous routing with CORS middleware and OpenAPI/Swagger documentation (`/docs`).
- **Pydantic v2**: Enforces strict typing and data validation on all incoming inputs and outgoing AI responses, ensuring structured JSON output.

### C. Multimodal AI & Fallback Engine (`backend/app/services/`)
- **Google Gemini 3.5 Flash**: Processes site photos and structural imagery to detect workers, verify PPE, and classify concrete defects.
- **Deterministic Heuristic Engine**: Calibrated rules grounded in OSHA 1926 and ACI 318 standards. Ensures 100% demo availability and zero crashes even when running offline.

---

## 3. Data Flow Sequence (Safety Inspection Example)

```mermaid
sequenceDiagram
    autonumber
    actor User as Field Inspector / Evaluator
    participant WebUI as Web Frontend
    participant API as FastAPI Gateway
    participant Pydantic as Pydantic Schema Validator
    participant AI as Gemini 3.5 Flash Vision
    participant Fallback as Heuristics Engine

    User->>WebUI: Uploads or pastes site photograph
    WebUI->>API: POST /api/v1/safety/analyze (Multipart/form-data)
    API->>Pydantic: Validate image format and file size
    alt Gemini API Key Available
        API->>AI: Send image bytes with OSHA 1926 vision prompt
        AI-->>API: Return structured JSON detection output
    else Offline or Cooldown
        API->>Fallback: Run deterministic safety heuristics
        Fallback-->>API: Return calibrated safety assessment
    end
    API->>Pydantic: Serialize against SafetyAnalysisResponse schema
    API-->>WebUI: 200 OK with verified JSON payload
    WebUI-->>User: Render bounding boxes, hazard scores, and corrective steps
```
