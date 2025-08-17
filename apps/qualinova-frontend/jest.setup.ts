import '@testing-library/jest-dom';
import React from 'react';

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
    Search: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'Search' }, 'Search'),
    Plus: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Plus' }, 'Plus'),
    ArrowUpDown: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'ArrowUpDown' }, 'ArrowUpDown'),
    FileText: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'FileText' }, 'FileText'),
    CircleCheckBig: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'CircleCheckBig' }, 'CircleCheckBig'),
    CircleX: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'CircleX' }, 'CircleX'),
    Clock4: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'Clock4' }, 'Clock4'),
    ChevronUp: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'ChevronUp' }, 'ChevronUp'),
    ChevronDown: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'ChevronDown' }, 'ChevronDown'),
    ChevronRight: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'ChevronRight' }, 'ChevronRight'),
    Menu: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Menu' }, 'Menu'),
    RefreshCcw: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'RefreshCcw' }, 'RefreshCcw'),
    PlusCircle: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'PlusCircle' }, 'PlusCircle'),
    Shield: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'Shield' }, 'Shield'),
    X: (props: any) => React.createElement('div', { ...props, 'data-icon': 'X' }, 'X'),
    FileCheck: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'FileCheck' }, 'FileCheck'),
    Clock: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Clock' }, 'Clock'),
    FileX: (props: any) => React.createElement('div', { ...props, 'data-icon': 'FileX' }, 'FileX'),
    FilePlus: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'FilePlus' }, 'FilePlus'),
    MessageCircle: (props: any) =>
        React.createElement('div', { ...props, 'data-icon': 'MessageCircle' }, 'MessageCircle'),
    Mail: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Mail' }, 'Mail'),
    Phone: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Phone' }, 'Phone'),
    Award: (props: any) => React.createElement('div', { ...props, 'data-icon': 'Award' }, 'Award'),
}));

// Global mock for react-hook-form
jest.mock('react-hook-form', () => {
    // Global state to manage form data and errors for testing
    let globalFormData: { [key: string]: any } = {};
    let globalFormErrors: { [key: string]: any } = {};
    let globalIsValid = true;

    return {
        useForm: jest.fn(() => ({
            register: jest.fn((name?: string) => ({
                onChange: (e: { target: { value: string; checked?: boolean; type?: string } }) => {
                    if (!name) return;
                    if (e.target.type === 'checkbox') {
                        globalFormData[name] = e.target.checked ?? false;
                    } else {
                        globalFormData[name] = e.target.value;
                    }
                },
                onBlur: jest.fn(),
                name,
                ref: jest.fn(),
            })),
            handleSubmit: jest.fn((callback: any) => (e?: any) => {
                e?.preventDefault?.();
                callback(globalFormData);
            }),
            formState: {
                get errors() {
                    return globalFormErrors;
                },
                get isValid() {
                    return globalIsValid;
                },
            },
            // Helper functions for testing
            __setFormData: (data: any) => {
                globalFormData = { ...data };
            },
            __setErrors: (errors: any) => {
                globalFormErrors = { ...errors };
            },
            __setIsValid: (isValid: boolean) => {
                globalIsValid = isValid;
            },
            __getFormData: () => globalFormData,
            __reset: () => {
                globalFormData = {};
                globalFormErrors = {};
                globalIsValid = true;
            },
        })),
        useFormContext: jest.fn(),
    };
});

// Global jest mock for Next Image
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, fill, ...props }: any) => {
        // The fill prop is intentionally excluded from imgProps to prevent DOM warnings
        return React.createElement('img', { src, alt, fill, ...props });
    },
}));

// Mock Recharts
jest.mock('recharts', () => ({
    ResponsiveContainer: ({ children }: any) =>
        React.createElement('div', { 'data-testid': 'responsive-container' }, children),
    LineChart: ({ children }: any) =>
        React.createElement('div', { 'data-testid': 'line-chart' }, children),
    Line: () => React.createElement('div', { 'data-testid': 'line' }),
    XAxis: () => React.createElement('div', { 'data-testid': 'x-axis' }),
    YAxis: () => React.createElement('div', { 'data-testid': 'y-axis' }),
    CartesianGrid: () => React.createElement('div', { 'data-testid': 'cartesian-grid' }),
    Tooltip: () => React.createElement('div', { 'data-testid': 'tooltip' }),
    Legend: () => React.createElement('div', { 'data-testid': 'legend' }),
    ReferenceLine: () => React.createElement('div', { 'data-testid': 'reference-line' }),
    Area: () => React.createElement('div', { 'data-testid': 'area' }),
    AreaChart: ({ children }: any) =>
        React.createElement('div', { 'data-testid': 'area-chart' }, children),
    Bar: () => React.createElement('div', { 'data-testid': 'bar' }),
    BarChart: ({ children }: any) =>
        React.createElement('div', { 'data-testid': 'bar-chart' }, children),
    PieChart: ({ children }: any) =>
        React.createElement('div', { 'data-testid': 'pie-chart' }, children),
    Pie: () => React.createElement('div', { 'data-testid': 'pie' }),
    Cell: () => React.createElement('div', { 'data-testid': 'cell' }),
}));
