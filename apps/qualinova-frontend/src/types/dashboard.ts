export type TabType = 'overview' | 'analytics' | 'reports';

export interface TabItem {
    id: TabType;
    label: string;
}

export const DEFAULT_TABS: TabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
];
