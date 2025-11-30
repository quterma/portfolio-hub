"dependencies": {
"@types/leaflet": "^1.9.21",
"leaflet": "^1.9.4",
"react": "^19.1.1",
"react-dom": "^19.1.1"
},
"devDependencies": {
"@eslint/js": "^9.36.0",
"@testing-library/jest-dom": "^6.9.1",
"@testing-library/react": "^16.3.0",
"@testing-library/user-event": "^14.6.1",
"@types/node": "^24.6.0",
"@types/react": "^19.1.16",
"@types/react-dom": "^19.1.9",
"@vitejs/plugin-react": "^5.0.4",
"eslint": "^9.36.0",
"eslint-config-prettier": "^10.1.8",
"eslint-plugin-react-hooks": "^5.2.0",
"eslint-plugin-react-refresh": "^0.4.22",
"gh-pages": "^6.3.0",
"globals": "^16.4.0",
"happy-dom": "^20.0.10",
"jsdom": "^27.1.0",
"prettier": "^3.6.2",
"typescript": "~5.9.3",
"typescript-eslint": "^8.45.0",
"vite": "^7.1.7",
"vitest": "^4.0.6"
}

# Progis Map App

A lightweight **React + TypeScript** demo application for displaying and querying geospatial data (WMS/OGC).  
Built with **Vite** and **Leaflet**, following a minimal clean-architecture approach.

## Deployed on gh-pages

https://quterma.github.io/progis-map-app/

## Features

- Leaflet map with OSM base tiles
- Clean map interface with configurable layer system
- Identify (WMS GetFeatureInfo) → popup with feature attributes
- Smart hybrid identify:
  - reverse geocode (street/building) on high zoom via OpenStreetMap Nominatim
  - country info via WMS on low zoom
- Optional auto-center to user geolocation (fallback → USA)
- Modular folder structure: `infrastructure / ui`

## Architecture Updates

**2025-11-04:** Configs centralized under `src/infrastructure/config` as single source of truth. Removed dead UI/config layers and legacy shared/ structure for cleaner, production-ready architecture.

**2025-11-04:** Added comprehensive Russian JSDoc documentation to leafletAdapter.ts with detailed explanations of WMS GetFeatureInfo functionality and map interaction methods.

## Cleanup History

**2025-11-04:** Removed unused architecture layers (`domain/`, `app/`, `mocks/`) and demo OSM-WMS layer to focus on core map functionality. The codebase now follows a simpler, production-ready structure.

## Run locally

```bash
npm install
npm run dev
```

## Architecture

Domain – core types and use-cases (UI-agnostic)
Infrastructure – Leaflet & OGC adapters
UI – MapWidget + LayersPanel
Shared – configs & utils

For MVP the UI directly uses adapter calls; domain interfaces are prepared for future separation.
