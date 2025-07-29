import '@testing-library/jest-dom';

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Search: () => 'Search',
  Plus: () => 'Plus',
  ArrowUpDown: () => 'ArrowUpDown',
  FileText: () => 'FileText',
  CircleCheckBig: () => 'CircleCheckBig',
  CircleX: () => 'CircleX',
  Clock4: () => 'Clock4',
  ChevronDown: () => 'ChevronDown',
  Menu: () => 'Menu',
  RefreshCcw: () => 'RefreshCcw',
  PlusCircle: () => 'PlusCircle',
  Shield: () => 'Shield',
  X: () => 'X',
}));
