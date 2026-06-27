# Plan: Fuel Quality Assurance Mobile App (FuelGuard AI)

The goal is to build a comprehensive, mobile-responsive web application that serves as a tool for detecting pure vs. adulterated petroleum products (Gasoline, CNG, LNG, Diesel). Since actual chemical detection requires hardware sensors, this app will focus on:
1.  **AI-Driven Visual/Manual Analysis:** Guiding users through simple field tests (color, density, residue).
2.  **Crowdsourced Station Database:** Reporting and viewing fuel quality ratings at specific filling stations worldwide.
3.  **Sensor Integration Simulation:** Providing an interface that *could* connect to IoT sensors (via Bluetooth/USB) in a real-world scenario.
4.  **Educational Hub:** Teaching users how to identify fake products.

## Scope & Non-Goals
- **Scope:** Frontend implementation of a fuel quality detection app, location-based station search, reporting system, and educational guides.
- **Non-Goals:** Real-time chemical analysis without external hardware (not possible via standard smartphone cameras/sensors alone), server-side database (using localStorage for this session).

## Assumptions & Open Questions
- **Assumption:** The app will use the browser's Geolocation API to find nearby stations.
- **Assumption:** "Detection" in this software context is a combination of user-inputted test results and community-reported data.

## Affected Areas
- **Frontend:** React application with Tailwind CSS and Shadcn UI.
- **Data Layer:** LocalStorage for user reports and station ratings.
- **Integrations:** Lucide-React for icons, Framer Motion for mobile-app-like transitions.

## Phases

### Phase 1: Core Layout & Navigation
- Set up a mobile-first shell with a bottom navigation bar (Home, Scan/Detect, Map, Education).
- Implement a clean, professional "Industrial/Energy" theme (dark mode support).
- **Owner:** frontend_engineer

### Phase 2: Detection Workflow (The "Scanner")
- Create a multi-step "Fuel Test" wizard.
- Steps: Select Fuel Type (Petrol, Diesel, CNG, LNG) -> Visual Inspection (Color/Clarity) -> Simple Physics Test (Density/Evaporation) -> AI Result Summary.
- **Owner:** frontend_engineer

### Phase 3: Station Map & Reporting
- Mock map interface showing "Verified" vs "Suspicious" stations nearby.
- Report form for users to log "Bad Fuel" experiences (Station Name, Location, Fuel Type, Symptoms like engine knocking).
- **Owner:** frontend_engineer

### Phase 4: Educational Hub & Branding
- Content pages explaining the characteristics of pure vs. adulterated fuels.
- Emergency steps for when a vehicle has been filled with bad fuel.
- Final polish of UI/UX.
- **Owner:** quick_fix_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the core application structure, navigation, and the detection/reporting workflows.
2. quick_fix_engineer — Populate educational content and apply final stylistic polish.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3
- **Scope:** Create a mobile-first React app. Use a bottom-tab navigation layout. Build the "Scan" wizard which is a series of forms and UI animations. Implement the "Nearby Stations" view using a list/mock-map pattern. Use `localStorage` to persist any reports the user makes.
- **Files:** `src/App.tsx`, `src/components/Navigation.tsx`, `src/components/DetectionWizard.tsx`, `src/components/StationList.tsx`
- **Depends on:** none
- **Acceptance criteria:** App is fully responsive on mobile, navigation works between tabs, the multi-step test wizard completes and shows a result, and reports are saved to localStorage.

### 2. quick_fix_engineer
- **Phases:** 4
- **Scope:** Add detailed text content to the "Education" tab about fuel adulteration. Refine CSS/Tailwind classes for a premium "safety-first" feel. Ensure all icons (Lucide) are consistent.
- **Files:** `src/components/Education.tsx`, `src/index.css`
- **Depends on:** frontend_engineer
- **Acceptance criteria:** The education section contains high-quality info on Petrol, Diesel, CNG, and LNG. The UI looks polished and professional.
