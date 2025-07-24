import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateCertificationSecondStep from './createCertificationSecondStep';

// Mock Input component
jest.mock('../../atoms/Input/input.tsx', () => (props: any) => (
  <div data-testid={`input-${props.label}`}>
    <label>{props.label}</label>
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange?.({ target: { value: e.target.value } })}
      value={props.value}
    />
    {props.error && <span data-testid="error">{props.error}</span>}
  </div>
));

// Mock Button component
jest.mock('../../atoms/Button/button.tsx', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock StepIndicator
jest.mock('../../molecules/StepIndicator/stepIndicator.tsx', () => (props: any) => (
  <div data-testid="step-indicator">Step {props.currentStep} of {props.totalSteps}</div>
));

// Mock zod schema
jest.mock('../../../schemas/CreateCertificate/createCertificateSchemas.ts', () => {
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
const updateDataMock = jest.fn();
const setStepMock = jest.fn();

jest.mock('../../../contexts/createCertificateContext.tsx', () => ({
  useCreateCertificate: () => ({
    data: {
      recipientName: '',
      recipientEmail: '',
      issueDate: '',
      expiryDate: '',
      certificateId: '',
    },
    updateData: updateDataMock,
    setStep: setStepMock,
  }),
}));

jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
    useFormContext: jest.fn(),
}));

jest.mock('lucide-react', () => ({
  ChevronRight: () => <span data-testid="chevron-right" />,
}));

describe('CreateCertificationSecondStep', () => { //TODO: This also fails cos of the useContext mock, need to fix (open to suggestions)
  beforeEach(() => {
    updateDataMock.mockClear();
    setStepMock.mockClear();
  });

  it('renders major page texts', () => {
    render(<CreateCertificationSecondStep />);
    expect(screen.getByTestId('step-title')).toHaveTextContent('Certificate Details');
    expect(screen.getByTestId('form-title')).toHaveTextContent('Certificate Details');
    expect(screen.getByTestId('identifier-text')).toHaveTextContent('Certificate Details');
  })

  it('renders all fields and the step indicator', () => {
    render(<CreateCertificationSecondStep />);
    expect(screen.getByTestId('input-Recipient Name')).toBeInTheDocument();
    expect(screen.getByTestId('input-Recipient Email')).toBeInTheDocument();
    expect(screen.getByTestId('input-Issue Date')).toBeInTheDocument();
    expect(screen.getByTestId('input-Expiry Date')).toBeInTheDocument();
    expect(screen.getByTestId('input-Certificate ID (Optional)')).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 2 of 3');
  });

  it('submits valid form and calls context functions', async () => {
    render(<CreateCertificationSecondStep />);
    
    fireEvent.change(screen.getByPlaceholderText('e.g Acme Corporation'), {
      target: { value: 'Acme Corp' },
    });
    fireEvent.change(screen.getByPlaceholderText('e.g contact@acmecorp.com'), {
      target: { value: 'test@acme.com' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('e.g contact@acmecorp.com')[1], {
      target: { value: '2024-01-01' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('e.g contact@acmecorp.com')[2], {
      target: { value: '2024-12-31' },
    });
    fireEvent.change(screen.getByPlaceholderText('Leave blank to auto-generate'), {
      target: { value: 'ABC123' },
    });

    fireEvent.click(screen.getByText('Next Step'));

    await waitFor(() => {
      expect(updateDataMock).toHaveBeenCalledWith({
        recipientName: 'Acme Corp',
        recipientEmail: 'test@acme.com',
        issueDate: '2024-01-01',
        expiryDate: '2024-12-31',
        certificateId: 'ABC123',
      });
      expect(setStepMock).toHaveBeenCalledWith(3);
    });
  });

  it('clicking Previous Step calls setStep with function', () => {
    render(<CreateCertificationSecondStep />);
    fireEvent.click(screen.getByText('Previous Step'));
    expect(setStepMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
