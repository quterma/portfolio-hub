# Yokai Monitor

Real-time dashboard for monitoring spirit anomalies across Tokyo districts. Displays spirits with threat levels, capture status, and live threat updates via Server-Sent Events.

## Tech Stack

**Core**: Next.js 16 (App Router), React 19, TypeScript

**State & Data**: TanStack Query 5, Zod validation

**Styling**: SCSS Modules, CSS custom properties

**Real-time**: Server-Sent Events (SSE)

**DevOps**: Docker, Docker Compose

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Run with Docker

```bash
docker-compose up --build
```

**→ Open [http://localhost:3000](http://localhost:3000)** in your browser

### Environment Configuration

You can customize behavior via environment variables in `docker-compose.yml`:

```yaml
environment:
  - SSE_EVENT_INTERVAL_MS=3000
  - MOCK_ERROR_RATE=0.5
```

Key variables: `SSE_EVENT_INTERVAL_MS` (default 5000), `SSE_RECONNECT_DELAY_MS` (default 2000), `CAPTURE_DELAY_MS` (default 2500), `MOCK_ERROR_RATE` (default 0.3). All optional with sensible defaults.

## Demo Flow

1. **View dashboard** → See spirit cards with threat levels and summary statistics
2. **Click "Capture"** → Optimistic update, 30% chance of error with rollback
3. **Wait ~5s** → Threat levels change automatically via SSE with smooth transitions

## Architecture

Strict Feature Sliced Design structure: `shared → entities → features → widgets → app`. Next.js Route Handlers provide mock REST API (`/api/spirits`) and SSE endpoint (`/api/spirits/stream`) for real-time threat updates. TanStack Query handles caching and optimistic updates. All data validated with Zod at API boundaries.

---

**Notes**: Mock data, demo-only API

github - https://github.com/quterma/yokai-monitor
deploy - https://yokai-monitor.vercel.app/monitoring

Архитектура:

# Yokai Monitor Architecture (Final Implementation)

This document reflects the **current implementation** of the Yokai Monitor application.

## Technology Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **Runtime**: React 19.2.0
- **State Management**: TanStack Query 5.90.12
- **Styling**: SCSS Modules (sass 1.94.2)
- **Validation**: Zod 4.1.13
- **Build Optimizations**: React Compiler (enabled)
- **Deployment**: Docker + Docker Compose
- **Code Quality**: ESLint + Prettier

## Architecture Principles

### Feature Sliced Design (FSD)

Strict adherence to FSD layer hierarchy:

```
shared → entities → features → widgets → app
```

**Rules enforced**:

- Lower layers cannot import from upper layers
- Each module has index files with named exports (where applicable)
- Co-location: component + styles + logic in same directory
- No cross-feature imports

## Project Structure

```
src/
├── app/                              # Application layer (Next.js App Router)
│   ├── layout.tsx                    # Global shell with ErrorBoundary + QueryClientProvider
│   ├── page.tsx                      # Root redirect to /monitoring
│   ├── monitoring/
│   │   └── page.tsx                  # Main monitoring page
│   └── api/
│       └── spirits/
│           ├── _mocks.ts             # Mock data (8 spirits)
│           ├── route.ts              # GET /api/spirits, POST /api/spirits
│           └── stream/
│               └── route.ts          # SSE endpoint
│
├── widgets/                          # Page-level compositions
│   └── monitoring-dashboard/
│       ├── index.ts                  # Named exports
│       ├── ui/
│       │   ├── MonitoringDashboard.tsx
│       │   ├── MonitoringDashboard.module.scss
│       │   └── SpiritsSummary/
│       │       ├── SpiritsSummary.tsx
│       │       └── SpiritsSummary.module.scss
│       └── lib/
│           └── useSpiritsSummary.ts  # Summary statistics computation
│
├── features/                         # User interactions
│   ├── capture-spirit/
│   │   ├── index.ts
│   │   ├── model/
│   │   │   └── useCaptureSpirit.ts   # Mutation with optimistic updates
│   │   └── ui/
│   │       ├── CaptureButton/
│   │       │   ├── CaptureButton.tsx
│   │       │   └── CaptureButton.module.scss
│   │
│   └── realtime-updates/
│       ├── index.ts
│       └── model/
│           └── useSpiritsRealtime.ts # SSE subscription + cache updates
│
├── entities/                         # Business entities
│   └── spirit/
│       ├── index.ts
│       ├── model/
│       │   └── index.ts              # Type facades
│       ├── api/
│       │   ├── index.ts
│       │   ├── spiritsApi.ts         # useSpiritsList, useSpiritById
│       │   └── queryKeys.ts          # Centralized query keys
│       └── ui/
│           ├── SpiritCard/
│           │   ├── SpiritCard.tsx
│           │   └── SpiritCard.module.scss
│
└── shared/                           # Shared infrastructure
    ├── api/
    │   ├── index.ts
    │   └── queryClient.ts            # TanStack Query config
    ├── config/
    │   ├── index.ts
    │   └── env.ts                    # Environment constants
    ├── lib/
    │   ├── delay.ts                  # Promise-based delay utility
    │   └── realtime/
    │       ├── index.ts
    │       └── createSseClient.ts    # EventSource wrapper with Zod validation
    ├── models/
    │   ├── index.ts
    │   ├── spirits.ts                # Zod schemas for Spirit, CaptureRequest, etc.
    │   └── sse-events.ts             # SSE event schemas
    ├── styles/
    │   └── theme.css                 # CSS custom properties
    └── ui/
        ├── Button/
        ├── Card/
        ├── ErrorBoundary/
        ├── ErrorBox/
        └── LoadingSpinner/
```

## Layer Responsibilities

### App Layer (app/)

**Purpose**: Next.js routing, global providers, API routes.

#### `app/layout.tsx`

Global shell wrapping all pages:

- Sets up `<html>` and `<body>` tags
- Imports `shared/styles/theme.css`
- Wraps children in `ErrorBoundary` and `QueryClientProvider`

#### `app/page.tsx`

Server-side redirect:

```tsx
redirect("/monitoring")
```

#### `app/monitoring/page.tsx`

Main monitoring page:

- Renders `MonitoringDashboard` widget
- No data fetching (handled inside widget)

#### `app/api/spirits/route.ts`

REST API endpoint:

**GET /api/spirits**

- Returns list of spirits from `_mocks.ts`
- Validates response with Zod schema `SpiritsList`

**POST /api/spirits**

- Accepts `CaptureRequest` (validated with Zod)
- Simulates 30% error rate (`MOCK_ERROR_RATE = 0.3`)
- Applies 2.5s delay (`captureDelayMs = 2500`)
- Returns `CaptureResponse` or error

#### `app/api/spirits/stream/route.ts`

SSE endpoint:

- Sets headers: `text/event-stream`, `no-cache`, `Connection: keep-alive`
- Every 5 seconds:
  - Picks random spirit
  - Changes threat level randomly
  - Sends SSE event validated by `SpiritThreatChangedEvent` schema
- Handles client disconnection cleanup

#### `app/api/spirits/_mocks.ts`

Static mock data:

- 8 spirits with varied threat levels and statuses
- Used only within API routes (not exported to client)

---

### Widgets Layer (widgets/)

**Purpose**: Page-level compositions orchestrating features and entities.

#### `widgets/monitoring-dashboard/ui/MonitoringDashboard.tsx`

**Integrations**:

- `useSpiritsList()` from `entities/spirit/api`
- `useSpiritsRealtime()` from `features/realtime-updates`

**States**:

- **Loading**: renders `LoadingSpinner`
- **Error**: renders `ErrorBox` with error message
- **Success**: renders:
  - `SpiritsSummary` panel (threat counts, active/captured counts)
  - Grid of `SpiritCard` components

**No business logic** - pure composition.

#### `widgets/monitoring-dashboard/ui/SpiritsSummary/SpiritsSummary.tsx`

Displays summary statistics:

- Count per threat level (Low, Medium, High, Critical)
- Active vs Captured counts

Uses `useSpiritsSummary()` hook for computed values.

#### `widgets/monitoring-dashboard/ui/MonitoringDashboard.module.scss`

**Layout**:

- CSS Grid: `auto-fill, minmax(300px, 1fr)`
- Responsive: mobile breakpoint at 768px
- Spacing via CSS custom properties

---

### Features Layer (features/)

**Purpose**: User interactions and cross-entity logic.

#### `features/capture-spirit/model/useCaptureSpirit.ts`

TanStack Query mutation hook:

**Optimistic Update Flow**:

1. `onMutate`: snapshot current list, update spirit status to "Captured"
2. API call: POST to `/api/spirits`
3. **On Success**: update confirmed, cache updated
4. **On Error**: rollback to snapshot, return error to UI
5. `retry: false` - errors shown to user, manual retry via button

**Integration**: returns `mutate` function and `isPending` state.

#### `features/capture-spirit/ui/CaptureButton/CaptureButton.tsx`

**States**:

- **Default**: "Capture" (enabled if spirit is Active)
- **Loading**: "Capturing..." (disabled)
- **Captured**: "Captured" (disabled)

**Props**:

- `spiritId: string`
- `onClick?: () => void` - called when button clicked (used to hide ErrorBox)
- `onError?: (error: Error) => void` - called on mutation failure

**Behavior**:

- On click: hides ErrorBox (via `onClick`), then triggers mutation
- On error: calls `onError` with error object

#### `features/realtime-updates/model/useSpiritsRealtime.ts`

SSE subscription hook:

**Lifecycle**:

- **On mount**: connects to `/api/spirits/stream` via `createSseClient`
- **On message**:
  - Validates event with Zod
  - Updates TanStack Query cache via `setQueryData`
  - No throttling - immediate updates
- **On error/close**:
  - Logs to console
  - Schedules reconnect after `sseReconnectDelayMs` (2000ms)
- **On unmount**: closes connection

**Cache Update**:

```ts
queryClient.setQueryData(spiritsQueryKeys.list(), old => {
  return old.map(spirit =>
    spirit.id === event.id
      ? { ...spirit, threatLevel: event.threatLevel }
      : spirit
  )
})
```

---

### Entities Layer (entities/)

**Purpose**: Business entities with CRUD operations.

#### `entities/spirit/model/index.ts`

Type facade - re-exports from `shared/models`:

- `Spirit`
- `SpiritsList`
- `ThreatLevel`
- `SpiritStatus`

#### `entities/spirit/api/spiritsApi.ts`

TanStack Query hooks:

**`useSpiritsList()`**

- Fetches from `/api/spirits`
- Validates response with Zod
- Returns `{ data, isLoading, error }` from `useQuery`

**`useSpiritById(id: string)`**

- Derives single spirit from list query
- No separate API call

#### `entities/spirit/api/queryKeys.ts`

Centralized query key factory:

```ts
export const spiritsQueryKeys = {
  all: ["spirits"] as const,
  list: () => [...spiritsQueryKeys.all, "list"] as const,
  detail: (id: string) => [...spiritsQueryKeys.all, "detail", id] as const,
}
```

#### `entities/spirit/ui/SpiritCard/SpiritCard.tsx`

**Props**:

- `spirit: Spirit` - entity data
- `onCapture?: (id: string) => void` - capture callback
- `error?: Error | null` - inline error to display
- `onErrorClose?: () => void` - error dismissal

**Display**:

- Name, location, threat level, status
- Colored threat indicator (left border)
- Inline `ErrorBox` slot above card (when error present)
- `CaptureButton` integration

**Layout**: reserves space for ErrorBox to prevent grid jumping.

#### `entities/spirit/ui/SpiritCard/SpiritCard.module.scss`

**Styling**:

- CSS custom properties for threat colors: `--threat-{low|medium|high|critical}`
- Smooth transitions: `background-color`, `border-color`, `box-shadow` (0.3s ease)
- Hover effects with elevation
- Threat level changes trigger animated transitions

---

### Shared Layer (shared/)

**Purpose**: Reusable infrastructure independent of business logic.

#### `shared/api/queryClient.ts`

TanStack Query configuration:

```ts
new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: retryDelayMs, // 500ms
    },
  },
})
```

#### `shared/config/env.ts`

Constants:

```ts
export const API_SPIRITS_URL = "/api/spirits"
export const API_SPIRITS_STREAM_URL = "/api/spirits/stream"
export const retryDelayMs = 500
export const sseReconnectDelayMs = 2000
export const captureDelayMs = 2500
export const MOCK_ERROR_RATE = 0.3
```

#### `shared/lib/realtime/createSseClient.ts`

EventSource wrapper:

**API**:

```ts
createSseClient<T>(
  url: string,
  schema: z.ZodSchema<T>,
  handlers: {
    onMessage: (data: T) => void,
    onError?: (error: Error) => void,
  }
)
```

**Behavior**:

- Wraps native `EventSource`
- Parses JSON from `event.data`
- Validates with Zod schema
- On validation error: logs to console, ignores event
- On connection error: calls `onError`, closes connection
- Returns cleanup function

#### `shared/lib/delay.ts`

Promise-based delay:

```ts
export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
```

#### `shared/models/spirits.ts`

Zod schemas:

```ts
ThreatLevel = z.enum(["Low", "Medium", "High", "Critical"])
SpiritStatus = z.enum(["Active", "Captured"])

Spirit = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  threatLevel: ThreatLevel,
  status: SpiritStatus,
})

SpiritsList = z.array(Spirit)

CaptureRequest = z.object({ id: z.string() })

CaptureResponse = z.object({
  success: z.boolean(),
  message: z.string(),
})
```

#### `shared/models/sse-events.ts`

SSE event schema:

```ts
SpiritThreatChangedEvent = z.object({
  id: z.string(),
  threatLevel: ThreatLevel,
})
```

#### `shared/ui/` Components

All UI components are generic and reusable:

**Button** (`Button.tsx` + `Button.module.scss`)

- Props: `variant`, `disabled`, `children`, `onClick`
- Variants: `primary`, `secondary`, `danger`

**Card** (`Card.tsx` + `Card.module.scss`)

- Generic wrapper with elevation and padding
- Props: `children`, `className`

**LoadingSpinner** (`LoadingSpinner.tsx` + `LoadingSpinner.module.scss`)

- CSS-based spinner animation
- No props

**ErrorBox** (`ErrorBox.tsx` + `ErrorBox.module.scss`)

- Compact inline error display
- Props: `message`, `onClose`
- Single line text + close button (×)
- No retry button (retry via parent action)

**ErrorBoundary** (`ErrorBoundary.tsx`)

- React Error Boundary with fallback UI
- Displays error message + page reload button

#### `shared/styles/theme.css`

CSS custom properties:

**Colors**:

```css
--threat-low: #22c55e;
--threat-medium: #eab308;
--threat-high: #f97316;
--threat-critical: #ef4444;
```

**Spacing**:

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

**Typography, shadows, etc.**

---

## Data Flow

### Initial Load (GET Spirits)

```
MonitoringDashboard
  ↓ calls
useSpiritsList() [entities/spirit/api]
  ↓ fetches
GET /api/spirits
  ↓ returns
Mock data from _mocks.ts
  ↓ validates with Zod
SpiritsList schema
  ↓ stored in
TanStack Query cache
  ↓ renders
Grid of SpiritCard components
```

### Capture Flow (POST Mutation)

```
User clicks CaptureButton
  ↓ triggers
useCaptureSpirit() mutation
  ↓ onMutate
Optimistic update: Spirit.status = "Captured"
  ↓ POST
/api/spirits with CaptureRequest
  ↓ API delay (2.5s) + 30% error chance
Success or Error
  ↓ onSuccess
Update confirmed
  ↓ onError
Rollback to snapshot, return error
  ↓ UI
CaptureButton calls onError → SpiritCard shows ErrorBox
  ↓ retry
User clicks "Capture" again (onClick hides ErrorBox first)
```

### Realtime Update Flow (SSE)

```
useSpiritsRealtime() hook mounts
  ↓ connects to
/api/spirits/stream (EventSource)
  ↓ server sends
Event every 5s: { id, threatLevel } (random change)
  ↓ validates
SpiritThreatChangedEvent schema
  ↓ updates
TanStack Query cache via setQueryData
  ↓ triggers
SpiritCard re-render
  ↓ CSS transition
Smooth threat level color change (0.3s ease)
```

**Reconnect Logic**:

- On error/close: wait `sseReconnectDelayMs` (2000ms)
- Create new `createSseClient` instance
- Repeat indefinitely until unmount

---

## Error Handling Strategy

### API Errors

**Capture Mutation (30% error rate)**:

- Simulated in `/api/spirits` route
- Returns 500 status with error message
- TanStack Query catches error
- Optimistic update rolled back
- Error passed to `onError` callback

**SSE Validation Errors**:

- Invalid JSON or schema mismatch
- Logged to console (`console.error`)
- Event ignored, connection stays open

### UI Error Display

**Inline ErrorBox Model**:

- Error displayed **above** the affected SpiritCard
- Single line text + close button (×)
- **No retry button** inside ErrorBox
- Retry via re-clicking "Capture" button
- ErrorBox auto-hides on button click

**Layout Stability**:

- SpiritCard reserves vertical space for ErrorBox
- Prevents grid layout shift when errors appear/disappear

**Global ErrorBoundary**:

- Catches unhandled React errors
- Shows fallback UI with reload button

---

## Styling System

### Approach: SCSS Modules + CSS Custom Properties

**Rules**:

- All component styles use `*.module.scss`
- No inline styles
- No hardcoded color values
- All colors from `theme.css` CSS variables

### Threat Level Styling

Threat colors applied to:

- SpiritCard left border (4px solid)
- Background tint on hover
- Summary panel indicators

**Transitions**:

```scss
.spiritCard {
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
```

### Responsive Design

- Grid auto-fills with `minmax(300px, 1fr)`
- Mobile breakpoint: 768px
- Stack layout on small screens

---

## Performance Optimizations

### React Compiler

Enabled in `next.config.ts`:

```ts
experimental: {
  reactCompiler: true,
}
```

Auto-optimizes component re-renders.

### Optimistic Updates

Instant UI feedback on capture action - no waiting for server response.

### TanStack Query Caching

- Automatic cache deduplication
- Stale-while-revalidate pattern
- Retry logic (3 attempts, 500ms delay)

### No Unnecessary Re-renders

- Proper hook dependencies
- Memoization via React Compiler
- Direct cache updates (no full refetch on SSE)

---

## Docker Setup

### Dockerfile

Multi-stage build:

1. **deps**: Install dependencies
2. **builder**: Run `next build`
3. **runner**: Production image with standalone output

### docker-compose.yml

Single service:

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
```

**Command**: `docker-compose up` - starts application on `http://localhost:3000`

---

## Build Configuration

### next.config.ts

```ts
{
  reactStrictMode: true,
  output: 'standalone', // for Docker
  experimental: {
    reactCompiler: true,
  },
}
```

### TypeScript (tsconfig.json)

Strict mode enabled:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

---

## Requirements Compliance

### Functional Requirements ✅

1. **Spirit List** ✅
   - Displayed as grid of cards
   - Mock data via Next.js Route Handlers
   - Fields: Name, Threat Level (color-coded), Location, Status

2. **Interaction** ✅
   - "Capture" button in each card
   - Mutation with optimistic update
   - 30% error simulation
   - Proper rollback and inline error display

3. **Real-time Updates** ✅
   - SSE implementation
   - 5-second interval for random threat changes
   - UI updates without page reload
   - Smooth CSS transitions

### Technical Requirements ✅

- **Stack**: React 19+, Next.js 16 App Router ✅
- **Architecture**: Strict FSD ✅
- **State**: TanStack Query ✅
- **Styling**: SCSS Modules (no Tailwind/Styled Components) ✅
- **Validation**: Zod on all incoming data ✅
- **DevOps**: Docker Compose single-command deployment ✅

---

## Implementation Status

**Stage 5.8/5.8 Complete**

All features from the development plan are fully implemented:

- ✅ Project setup (Stage 0)
- ✅ FSD structure + shared infrastructure (Stage 1)
- ✅ API layer + Entity layer (Stage 2)
- ✅ Capture feature (Stage 3)
- ✅ Realtime updates (Stage 4)
- ✅ Dashboard integration (Stage 5)

---

## Key Technical Decisions

### Why TanStack Query?

- Server state management with caching
- Built-in retry/refetch logic
- Optimistic updates support
- SSE integration via cache updates

### Why SCSS Modules?

- Scoped styles (no global conflicts)
- Full CSS power (variables, nesting, mixins)
- Type-safe className imports
- Better tooling than CSS-in-JS

### Why Zod?

- Runtime validation at API boundaries
- Type inference (single source of truth)
- Composable schemas
- Clear error messages

### Why SSE over WebSocket?

- Simpler for unidirectional updates
- Built-in browser support (EventSource)
- Auto-reconnect handling
- No need for bidirectional communication

### Why Optimistic Updates?

- Instant UI feedback (perceived performance)
- Aligns with modern UX patterns
- Proper rollback mechanism ensures data integrity

ТехЗадание:
Легенда (Контекст)
Вы разрабатываете дашборд для организации по отлову ёкаев (духов). Операторам нужно в реальном времени видеть всплески духовной энергии в разных районах Токио и иметь возможность отправлять туда отряды зачистки.

Задача
Разработать SPA на базе Next.js (App Router) для мониторинга аномалий (духов) в реальном времени.

🛠 Стек и ограничения
Core: React 18+, Next.js (App Router).
Architecture: Строгий Feature Sliced Design (FSD).
State & Async: TanStack Query.
Styling: SCSS Modules. Запрещено: Tailwind, Styled Components.
Validation: Zod (валидация всех входящих данных).
DevOps: Docker Compose для запуска.

📋 Функциональные требования
Приложение состоит из одной страницы /monitoring, которая содержит:

1. Список аномалий
   • Вывести список духов (набор карточек).
   • Данные мокать через Next.js Route Handlers.
   • Поля: Имя (напр. Kitsune), Уровень угрозы (цветовой код), Локация, Статус (Активен/Пойман).

2. Взаимодействие
   • В карточке духа должна быть кнопка «Capture» (Поймать).
   • При клике:
   — Отправляется мутация на API.
   — Применяется Optimistic Update (интерфейс обновляется мгновенно).
   — С вероятностью 30% API должно возвращать ошибку — интерфейс должен корректно откатиться назад и показать уведомление.

3. Real-time обновление
   Реализовать Server-Sent Events (SSE) или имитацию WebSocket.
   Раз в 5 секунд случайный дух должен менять уровень угрозы (например, с "Low" на "Critical").
   UI должен реагировать на это событие без перезагрузки страницы.

📦 Результат
Ссылка на репозиторий GitHub. В корне должен быть docker-compose.yml, позволяющий запустить проект одной командой: docker-compose up.
