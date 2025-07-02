refactor(dashboard): implement atomic design architecture for improved maintainability

BREAKING CHANGE: None

## Summary

Refactored Dashboard components using Atomic Design principles to create a more maintainable, scalable, and reusable component architecture.

## Changes

- **New Atoms**: IconBadge, MetricCard, TabButton, ContentHeader
- **New Molecules**: MetricsGrid, ChartContainer, CertificateList, QuickActionsGrid
- **Refactored Organisms**: DashboardTab, OverviewContent, AnalyticsContent, ReportsContent

## Benefits

- Improved component reusability and maintainability
- Consistent UI patterns across dashboard sections
- Better separation of concerns and single responsibility
- Enhanced TypeScript support with proper interfaces
- Cleaner import structure with index files

## Files Added

- src/components/atoms/IconBadge/
- src/components/atoms/MetricCard/
- src/components/atoms/TabButton/
- src/components/atoms/ContentHeader/
- src/components/molecules/MetricsGrid/
- src/components/molecules/ChartContainer/
- src/components/molecules/CertificateList/
- src/components/molecules/QuickActionsGrid/

## Files Modified

- src/components/organisms/Dashboard/DashboardTab.tsx
- src/components/organisms/Dashboard/OverviewContent.tsx
- src/components/organisms/Dashboard/AnalyticsContent.tsx
- src/components/organisms/Dashboard/ReportsContent.tsx

## Testing

- All existing functionality preserved
- Responsive design maintained
- TypeScript compilation successful
- Component interfaces properly typed

Closes: #[issue-number]
