import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateCertificationSecondStep from './createCertificationSecondStep';
import userEvent from '@testing-library/user-event';

// Polyfill for JSDOM's lack of requestSubmit
if (!HTMLFormElement.prototype.requestSubmit) {
    HTMLFormElement.prototype.requestSubmit = function () {
        this.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    };
}

// Mock Input component
jest.mock('../../atoms/Input/input.tsx', () => {
    const MockInput = React.forwardRef(({ label, error, ...props }: any, ref: any) => (
        <div data-testid={`input-${label}`}>
            <label>{label}</label>
            <input ref={ref} {...props} />
            {error && <span data-testid="error">{error}</span>}
        </div>
    ));
    MockInput.displayName = 'MockInput';
    return MockInput;
});

// Mock Button component
jest.mock('../../atoms/Button/button.tsx', () => ({
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

// Mock StepIndicator
jest.mock('../../molecules/StepIndicator/stepIndicator.tsx', () => {
    const MockStepIndicator = (props: any) => (
        <div data-testid="step-indicator">
            Step {props.currentStep} of {props.totalSteps}
        </div>
    );
    MockStepIndicator.displayName = 'MockStepIndicator';
    return MockStepIndicator;
});

// Mock zod schema
jest.mock('../../../schemas/CreateCertificate/createCertificateSchemas.ts', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const z = require('zod');
    return {
        step2Schema: z.object({
            recipientName: z.string().min(1, 'Recipient name is required'),
            recipientEmail: z.string().email('Invalid email'),
            issueDate: z.string().min(1, 'Issue date is required'),
            expiryDate: z.string().min(1, 'Expiry date is required'),
            certificateId: z.string().optional(),
        }),
    };
});

// Mock context
const mockData = {
    recipientName: 'Acme Corp',
    recipientEmail: 'test@acme.com',
    issueDate: '2024-01-01',
    expiryDate: '2024-12-31',
    certificateId: 'ABC123',
};

const updateDataMock = jest.fn(() => mockData);
const setStepMock = jest.fn();

jest.mock('../../../contexts/createCertificateContext.tsx', () => ({
    useCreateCertificate: () => ({
        data: mockData,
        setStep: setStepMock,
        updateData: updateDataMock,
        step: 3,
    }),
}));

describe('CreateCertificationSecondStep', () => {
    beforeEach(() => {
        updateDataMock.mockClear();
        setStepMock.mockClear();
    });

    it('renders major page texts', () => {
        render(<CreateCertificationSecondStep />);
        expect(screen.getByTestId('step-title')).toHaveTextContent('Certificate Details');
        expect(screen.getByTestId('form-title')).toHaveTextContent(
            'Add recipient and validity details',
        );
        expect(screen.getByTestId('identifier-text')).toHaveTextContent(
            'A unique identifier will be automatically generated if left blank',
        );
    });

    it('renders all fields and the step indicator', () => {
        render(<CreateCertificationSecondStep />);
        expect(screen.getByTestId('input-Recipient Name')).toBeInTheDocument();
        expect(screen.getByTestId('input-Recipient Email')).toBeInTheDocument();
        expect(screen.getByTestId('input-Issue Date')).toBeInTheDocument();
        expect(screen.getByTestId('input-Expiry Date')).toBeInTheDocument();
        expect(screen.getByTestId('input-Certificate ID (Optional)')).toBeInTheDocument();
        expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 2 of 3');
    });

    it('input field should be updated with the right values', async () => {
        render(<CreateCertificationSecondStep />);

        const user = userEvent.setup();

        const recipientNameInput = screen.getByPlaceholderText('e.g Acme Corporation');
        await user.type(recipientNameInput, 'Acme Corp');
        expect(recipientNameInput).toHaveValue('Acme Corp');

        const emailInput = screen.getByPlaceholderText('e.g contact@acmecorp.com');
        await user.type(emailInput, 'test@acme.com');
        expect(emailInput).toHaveValue('test@acme.com');

        const issueDateInput = screen.getByPlaceholderText('2025-07-30');
        await user.type(issueDateInput, '2024-01-01');
        expect(issueDateInput).toHaveValue('2024-01-01');

        const expiryDateInput = screen.getByPlaceholderText('2026-07-30');
        await user.type(expiryDateInput, '2024-12-31');
        expect(expiryDateInput).toHaveValue('2024-12-31');

        const certificateIdInput = screen.getByPlaceholderText('Leave blank to auto-generate');
        await user.type(certificateIdInput, 'ABC123');
        expect(certificateIdInput).toHaveValue('ABC123');
    });

    it('clicking Previous Step calls setStep with function', () => {
        render(<CreateCertificationSecondStep />);
        fireEvent.click(screen.getByText('Previous Step'));
        expect(setStepMock).toHaveBeenCalledWith(expect.any(Function));
    });
});
