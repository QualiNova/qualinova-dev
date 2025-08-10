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
  ChevronRight: () => 'ChevronRight',
  Menu: () => 'Menu',
  RefreshCcw: () => 'RefreshCcw',
  PlusCircle: () => 'PlusCircle',
  Shield: () => 'Shield',
  X: () => 'X',
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: {
      errors: {}
    },
  })),
  useFormContext: jest.fn(),
}));

// Global jest mock for Next Image
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }) => {
        return <img src={src} alt={alt} {...props} />;
    },
}));
