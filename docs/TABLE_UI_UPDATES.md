# Table UI Updates
**Date:** 2025-12-07

## Summary
Implemented a new **Candidate Table** view in the Dashboard to allow detailed inspection of candidate data, similar to a spreadsheet view.

## Changes Implemented

### 1. New Table Component
- **File:** `src/components/dashboard/CandidateTable.jsx`
- **Features:**
  - **Dynamic Columns:** S.No, Name, Email, Phone, Experience, Skills, Match Score, Status.
  - **Resizable Columns:** Users can drag column headers to adjust width.
  - **Data Formatting:** Skills are truncated/formatted, and Match Score is color-coded.
  - **Backend Alignment:** Fields mapped specifically to match the backend `CandidateResponse` model (`experience_years`, `phone`).

### 2. Dashboard Integration
- **File:** `src/pages/DashboardPage.jsx`
- **Tabs System:** Added "Cards" and "Table" tabs to the main content area.
- **State Management:** Preserves `selectedJob` context when switching views.

## Verification
- Validated column resizing functionality.
- Confirmed correct data mapping for `experience_years` and `phone` against the provided backend code.
- Verified loading and empty states.
