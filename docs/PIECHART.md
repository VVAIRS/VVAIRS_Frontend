# Pie Chart Implementation Logic

## Overview
The **StatusPieChart** component provides a visual summary of candidate statuses for a specific job. It is designed to be highly responsive, interactive, and aesthetically consistent with the rest of the dashboard (e.g., using the same color scheme as the Candidate Table and Cards).

## Implementation Strategy

### 1. Independent Data Fetching
Instead of relying on the parent `DashboardPage` to pass down a list of candidates, the Pie Chart component is **self-contained**. It accepts a `jobId` as a property and initiates its own API request to fetch candidate data.
- **Benefit:** This ensures the chart always displays the most up-to-date information without requiring complex state management changes in the main dashboard.
- **Loading State:** It handles its own loading state (showing a spinner) and error state (logging to console) independently.

### 2. Status Aggregation Logic
The raw list of candidates is processed on the client side to categorize them into three primary buckets for the chart. This aggregation logic is robust to slight variations in status naming:
- **Shortlisted (Green):** Includes candidates with status `shortlisted`, `qualified`, or similar variations.
- **Rejected (Red):** Includes candidates with status `rejected`, `not_qualified`, or similar variations.
- **Screening/Review (Yellow):** Acts as a catch-all for `screening`, `under_review`, `new`, `pending`, and any other status that doesn't strictly fall into the positive or negative categories.

### 3. Color Coding
To ensure visual consistency across the application, the chart uses the exact same color palette as the status pills in the layout:
- **Green:** Success/Positive outcome.
- **Red:** Failure/Negative outcome.
- **Yellow:** In-progress/Neutral state.

### 4. Layout & Design Logic
To maximize the limited visual space while providing detailed information, several specific design decisions were made:
- **Maximized Radius:** The chart radius is set to **95%** of the container size to make the data wedges as large and readable as possible.
- **Floating Legend:** Instead of a traditional list below the chart (which reduces chart size), the legend is implemented as a **compact floating box** in the top-right corner. It uses a semi-transparent background to ensure readability without completely obscuring the chart.
- **Internal Labels:** Percentage values are calculated and rendered **inside** the pie slices using white text with a drop shadow. This eliminates the need for external label lines, keeping the visual footprint clean and focused.
- **Fixed Container:** The chart container in the dashboard is locked to a specific height (matching the width of the column) to ensure it renders as a perfect square, preventing any browser layout shifts.

## Frameworks Used
- **Logic:** Custom Javascript aggregation functions.
- **Visualization:** `recharts` library for the underlying SVG generation, chosen for its React compatibility and smooth animations.
