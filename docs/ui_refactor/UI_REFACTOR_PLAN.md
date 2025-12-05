# UI Refactoring Plan - Phase 2

## Goal Description
Enhance the Dashboard UI with a collapsible sidebar for the Jobs list (similar to ChatGPT/Gemini) and resize the top widgets to be square, maximizing vertical space for the data table.

## User Review Required
- **Sidebar Behavior**: The sidebar will toggle open/closed. When closed, the main content expands.
- **Widget Shape**: `JobDescription` and `ResumeUploader` will be square. This might reduce the amount of visible text/content inside them without scrolling or hovering.

## Proposed Changes

### Dashboard Layout
#### [MODIFY] [DashboardPage.jsx](file:///c:/Users/Surendra.Mandala/Documents/major_project/AIRS-frontend/src/pages/DashboardPage.jsx)
- Add state `isSidebarOpen`.
- Add a toggle button (icon) to show/hide the sidebar.
- Dynamically adjust the width of the sidebar container (e.g., `w-80` vs `w-0` or hidden).
- Adjust the top row grid to make widgets square (e.g., fixed height matching width, or aspect-ratio).

### Components
#### [MODIFY] [JobDescription.jsx](file:///c:/Users/Surendra.Mandala/Documents/major_project/AIRS-frontend/src/components/dashboard/JobDescription.jsx)
- Ensure content centers well in a square container.

#### [MODIFY] [ResumeUploader.jsx](file:///c:/Users/Surendra.Mandala/Documents/major_project/AIRS-frontend/src/components/dashboard/ResumeUploader.jsx)
- Ensure content centers well in a square container.

## Verification Plan

### Manual Verification
1.  **Sidebar Toggle**: Click the toggle button. Verify sidebar slides in/out.
2.  **Responsive Layout**: Verify main content expands when sidebar is closed.
3.  **Widget Shape**: Verify widgets look square-ish and don't take up too much vertical space.
4.  **Table Space**: Verify the placeholder for the user table has more vertical space.

# UI Refactoring Plan - Phase 3 (Chart Resizing)

## Goal Description
Resize the charts in the right column to match the visual style of the square widgets (`JobDescription` and `ResumeUploader`). This ensures a consistent, compact look across the dashboard.

## Proposed Changes

### Dashboard Layout
#### [MODIFY] [DashboardPage.jsx](file:///c:/Users/Surendra.Mandala/Documents/major_project/AIRS-frontend/src/pages/DashboardPage.jsx)
- Change the height classes of the chart placeholders (Pie, Bar, Line) to `aspect-square` or a consistent height that matches the square widgets.
- Ensure they fit well within the fixed-width (`w-96`) stats column.

## Verification Plan
### Manual Verification
1.  **Chart Shape**: Verify charts are square or consistent in height.
2.  **Column Fit**: Ensure they don't overflow the fixed column width.

# UI Refactoring Plan - Phase 4 (Final Polish)

## Goal Description
Remove the Line Chart as requested and reduce the width of the right column. This makes the remaining charts (Pie, Bar) smaller (matching the sidebar width) and gives more horizontal space to the middle table. It also ensures the right column height doesn't exceed the middle content.

## Proposed Changes

### Dashboard Layout
#### [MODIFY] [DashboardPage.jsx](file:///c:/Users/Surendra.Mandala/Documents/major_project/AIRS-frontend/src/pages/DashboardPage.jsx)
- Remove the "Line Chart Placeholder".
- Change the right column width from `w-96` to `w-80` (or `w-72` if needed) to make charts smaller.
- Ensure Pie and Bar charts remain `aspect-square`.

## Verification Plan
### Manual Verification
1.  **Layout Check**: Verify Line Chart is gone.
2.  **Size Check**: Verify charts are smaller and the middle table is wider.
3.  **Height Check**: Verify the right column doesn't look taller than the middle content.
