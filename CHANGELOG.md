# Changelog

## [Unreleased]

### Added

- Add `flowing` field to `LineColor` interface for configuring flowing line colors
  - Added `flowing: string` field to `LineColor` interface
  - Added `LineColors.FLOWING` enum value with default color
  - Updated `WorkflowLinesManager.getLineColor()` to support flowing state
  - Updated demo configurations to include flowing color examples
  - Added comprehensive test coverage for flowing line functionality

### Features

- Lines can now be colored differently when in flowing state (e.g., during workflow execution)
- Priority order: hidden > error > highlight > drawing > hovered > selected > flowing > default
- Backward compatible with existing line color configurations

### Demo Updates

- Updated `apps/demo-free-layout` to include flowing color configuration
- Added CSS variable support: `var(--g-workflow-line-color-flowing,#4d53e8)`

### Tests

- Added test cases for flowing line color functionality
- Verified priority ordering with other line states
- Ensured backward compatibility
