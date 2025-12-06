# UI Updates - December 6, 2025

## 1. Dashboard Layout Overhaul (Hybrid Approach)
To balance visibility and usability, we implemented a **Hybrid Layout**:
- **Page Scrolling Enabled**: The main dashboard page now scrolls vertically (`overflow-y-auto`). This ensures that top widgets (Job Description, Resume Uploader) are always accessible, even on smaller screens.
- **Fixed-Height Table**: The candidate list container ("Table" area) has a fixed height of **1200px**. This provides a large viewing area for candidates without causing the page to grow infinitely.
- **Internal Table Scroll**: The candidate list itself has an internal scrollbar, allowing users to navigate through thousands of cards within the fixed 1200px window.
- **Tab Visibility**: Added `shrink-0` to the tab headers to ensure they never collapse or disappear, regardless of the table size.

## 2. Mobile Responsiveness
The dashboard is now fully responsive for mobile devices:
- **Stacked Layout**: On mobile screens, the main layout switches from side-by-side (`flex-row`) to vertical stacking (`flex-col`).
- **Full-Width Columns**: The "Stats & Charts" column, which is fixed-width (`w-80`) on desktop, now takes up the full width (`w-full`) on mobile.
- **Adaptive Widgets**: The top widget row switches from a 3-column grid to a single column (`grid-cols-1`) on mobile, making each widget large and easy to interact with.

## 3. Widget Refinements (JD & Resume Uploader)
- **Increased Height**: Top widgets were increased from `h-40` to **`h-64` (256px)** to display more content without scrolling.
- **Larger Text**:
  - **Job Description**: Main text increased to `text-base`, title to `text-lg`.
  - **Resume Uploader**: Header increased to `text-lg`, file list items and prompts increased to `text-sm`.

## 4. Candidate Card Design
- **Text Readability**: Significantly increased text sizes for better readability:
  - **Name**: `text-lg` (was small).
  - **Details (Email/Reasoning)**: `text-sm` (was xs).
- **Score Display**:
  - **Badge Style**: Converted the score from a circle to a **colored badge** (`rounded-lg`) with background color and padding.
  - **Visibility**: Removed the circular progress ring in favor of a clear, bold percentage text with a colored background (Green/Yellow/Red).
- **Cleanup**: Removed the phone number section from the card footer to reduce clutter.
