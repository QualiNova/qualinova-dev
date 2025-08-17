// ThirdStepForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';

import ThirdStepForm from './thirdStepForm';

const mockSetStep = jest.fn();

const mockData = {
    name: 'React Basics Certificate',
    type: 'Course Completion',
    recipientName: 'Jane Doe',
    issueDate: '2025-07-20',
    expiryDate: '2026-07-20',
};

// Full module mock with overridden hook
jest.mock('../../../contexts/createCertificateContext.tsx', () => {
    return {
        useCreateCertificate: () => ({
            data: mockData,
            setStep: mockSetStep,
            updateData: jest.fn(),
            step: 3,
        }),
    };
});

// Mock assets
jest.mock('@/components/atoms/icons/warning.svg', () => '/warning.svg');
jest.mock('@/components/atoms/icons/file-preview.svg', () => '/file-preview.svg');
jest.mock('@/components/atoms/icons/upload.svg', () => '/upload.svg');

// Mock Button component
jest.mock('../../atoms/Button/button.tsx', () => ({
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

// Mock StepIndicator
jest.mock('../../molecules/StepIndicator/stepIndicator.tsx', () => ({
    __esModule: true,
    default: ({ currentStep, totalSteps }: any) => (
        <div data-testid="step-indicator">
            Step {currentStep} of {totalSteps}
        </div>
    ),
}));

describe('ThirdStepForm', () => {
    beforeEach(() => {
        mockSetStep.mockClear();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('renders certificate details correctly', () => {
        render(<ThirdStepForm />);

        // Headings
        expect(screen.getByText('Certificate Details')).toBeInTheDocument();
        expect(screen.getByText('Please Review Carefully')).toBeInTheDocument();

        // Certificate fields
        expect(screen.getByText(mockData.name)).toBeInTheDocument();
        expect(screen.getByText(mockData.type)).toBeInTheDocument();
        expect(screen.getByText(mockData.recipientName)).toBeInTheDocument();
        expect(screen.getByText(mockData.issueDate)).toBeInTheDocument();
        expect(screen.getByText(mockData.expiryDate)).toBeInTheDocument();

        // Auto-generated ID
        expect(screen.getByText(/CERT-2005-0042/)).toBeInTheDocument();
    });

    it('renders certificate preview section', () => {
        render(<ThirdStepForm />);
        expect(screen.getByText('Certificate Preview')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Preview Certificate/i })).toBeInTheDocument();
    });

    it('calls setStep when Previous Step button is clicked', () => {
        render(<ThirdStepForm />);
        const previousButton = screen.getByRole('button', { name: /Previous Step/i });
        fireEvent.click(previousButton);
        expect(mockSetStep).toHaveBeenCalledWith(expect.any(Function));
    });

    it('renders Create Certificate button', () => {
        render(<ThirdStepForm />);
        expect(screen.getByRole('button', { name: /Create Certificate/i })).toBeInTheDocument();
    });
});
